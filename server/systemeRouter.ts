/**
 * Systeme.io Router — Full Contact Lifecycle Automation
 *
 * Covers:
 * - Tag auto-provisioning (creates all SD tags on first use if missing)
 * - Contact upsert with first_name field and reset-style tagging
 * - Quiz subscriber flow (reset style tag + quiz-subscriber tag)
 * - Waitlist flow (waitlist tag + optional reset style tag)
 * - Kit buyer flow (kit-buyer tag + reset style tag)
 * - Contact field updates (reset style stored as custom field)
 * - Tag management utility (list/create tags)
 */
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const SYSTEME_API_BASE = "https://api.systeme.io/api";

// All Stubborn Dragonflies tags — auto-provisioned on first use
const SD_TAGS = {
  // Reset styles
  "screen-fried": "SD: Screen-Fried",
  "routine-rebuilder": "SD: Routine-Rebuilder",
  overcommitted: "SD: Overcommitted",
  "rest-resistant": "SD: Rest-Resistant",
  "emotionally-stuck": "SD: Emotionally Stuck",
  // List types
  "quiz-subscriber": "SD: Quiz Subscriber",
  waitlist: "SD: Waitlist",
  "kit-buyer": "SD: Kit Buyer",
  "founding-member": "SD: Founding Member",
  // Source
  "source-website": "SD: Source - Website",
  "source-blog": "SD: Source - Blog",
} as const;

type TagKey = keyof typeof SD_TAGS;

// In-memory tag ID cache to avoid redundant API calls within a session
const tagIdCache: Record<string, number> = {};

function getApiKey(): string | null {
  return process.env.SYSTEME_IO_API_KEY ?? null;
}

async function systemeGet(path: string): Promise<Response> {
  const key = getApiKey();
  if (!key) throw new Error("SYSTEME_IO_API_KEY not configured");
  return fetch(`${SYSTEME_API_BASE}${path}`, {
    headers: { "X-API-Key": key, accept: "application/json" },
  });
}

async function systemePost(path: string, body: unknown): Promise<Response> {
  const key = getApiKey();
  if (!key) throw new Error("SYSTEME_IO_API_KEY not configured");
  return fetch(`${SYSTEME_API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": key,
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function systemePatch(path: string, body: unknown): Promise<Response> {
  const key = getApiKey();
  if (!key) throw new Error("SYSTEME_IO_API_KEY not configured");
  return fetch(`${SYSTEME_API_BASE}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/merge-patch+json",
      "X-API-Key": key,
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}

/**
 * Ensure a tag exists in Systeme.io and return its ID.
 * Creates the tag if it does not exist.
 */
async function ensureTag(tagName: string): Promise<number | null> {
  if (tagIdCache[tagName]) return tagIdCache[tagName];

  try {
    // Fetch all existing tags
    const res = await systemeGet("/tags");
    if (!res.ok) return null;
    const data = (await res.json()) as { items: { id: number; name: string }[] };

    const existing = data.items.find((t) => t.name === tagName);
    if (existing) {
      tagIdCache[tagName] = existing.id;
      return existing.id;
    }

    // Create the tag
    const createRes = await systemePost("/tags", { name: tagName });
    if (!createRes.ok) {
      console.error("[Systeme.io] Failed to create tag:", tagName, createRes.status);
      return null;
    }
    const created = (await createRes.json()) as { id: number; name: string };
    tagIdCache[created.name] = created.id;
    return created.id;
  } catch (err) {
    console.error("[Systeme.io] ensureTag error:", err);
    return null;
  }
}

/**
 * Provision all SD tags in Systeme.io if they do not exist.
 * Safe to call multiple times — skips tags that already exist.
 */
async function provisionAllTags(): Promise<{ created: string[]; existing: string[] }> {
  const created: string[] = [];
  const existing: string[] = [];

  try {
    const res = await systemeGet("/tags");
    if (!res.ok) return { created, existing };
    const data = (await res.json()) as { items: { id: number; name: string }[] };
    const existingNames = new Set(data.items.map((t) => t.name));

    for (const [, tagName] of Object.entries(SD_TAGS)) {
      if (existingNames.has(tagName)) {
        const found = data.items.find((t) => t.name === tagName);
        if (found) tagIdCache[tagName] = found.id;
        existing.push(tagName);
      } else {
        const createRes = await systemePost("/tags", { name: tagName });
        if (createRes.ok) {
          const created_tag = (await createRes.json()) as { id: number; name: string };
          tagIdCache[created_tag.name] = created_tag.id;
          created.push(tagName);
        }
      }
    }
  } catch (err) {
    console.error("[Systeme.io] provisionAllTags error:", err);
  }

  return { created, existing };
}

/**
 * Upsert a contact with tags and field updates.
 * On 409 (existing contact), patches the contact to add new tags.
 */
async function upsertContact(
  email: string,
  firstName: string,
  tagKeys: TagKey[],
  extraFields?: { slug: string; value: string }[]
): Promise<{ success: boolean; contactId?: number; error?: string }> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("[Systeme.io] API key not set — skipping");
    return { success: false, error: "Email service not configured" };
  }

  try {
    // Resolve tag IDs (auto-create if missing)
    const tagIds: number[] = [];
    for (const key of tagKeys) {
      const tagName = SD_TAGS[key];
      const id = await ensureTag(tagName);
      if (id) tagIds.push(id);
    }

    const fields: { slug: string; value: string }[] = [
      { slug: "first_name", value: firstName },
      ...(extraFields ?? []),
    ];

    const payload = {
      email,
      fields,
      tags: tagIds.map((id) => ({ id })),
    };

    const res = await systemePost("/contacts", payload);

    if (res.ok) {
      const data = (await res.json()) as { id: number };
      return { success: true, contactId: data.id };
    }

    if (res.status === 409) {
      // Contact already exists — find them and patch with new tags
      const searchRes = await systemeGet(`/contacts?email=${encodeURIComponent(email)}`);
      if (searchRes.ok) {
        const searchData = (await searchRes.json()) as { items: { id: number }[] };
        const contactId = searchData.items[0]?.id;
        if (contactId) {
          // PATCH to add tags and update fields
          const patchRes = await systemePatch(`/contacts/${contactId}`, {
            fields,
            tags: tagIds.map((id) => ({ id })),
          });
          if (patchRes.ok || patchRes.status === 200) {
            return { success: true, contactId };
          }
        }
      }
      // Even if patch fails, the contact exists — treat as success
      return { success: true };
    }

    const body = await res.text();
    console.error("[Systeme.io] API error:", res.status, body);
    return { success: false, error: `API returned ${res.status}` };
  } catch (err) {
    console.error("[Systeme.io] Network error:", err);
    return { success: false, error: "Network error contacting email service" };
  }
}

export const systemeRouter = router({
  /**
   * Called from Quiz result page after user enters email.
   * Tags: quiz-subscriber + reset style + source-website
   */
  subscribeQuiz: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1).max(100),
        resetStyle: z.enum([
          "screen-fried",
          "routine-rebuilder",
          "overcommitted",
          "rest-resistant",
          "emotionally-stuck",
        ]),
      })
    )
    .mutation(async ({ input }) => {
      return upsertContact(
        input.email,
        input.firstName,
        ["quiz-subscriber", input.resetStyle, "source-website"],
        [{ slug: "website", value: "https://stubborndragonflies.com/quiz" }]
      );
    }),

  /**
   * Called from Waitlist page.
   * Tags: waitlist + founding-member + optional reset style + source-website
   */
  subscribeWaitlist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1).max(100),
        resetStyle: z
          .enum([
            "screen-fried",
            "routine-rebuilder",
            "overcommitted",
            "rest-resistant",
            "emotionally-stuck",
          ])
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const tagKeys: TagKey[] = ["waitlist", "founding-member", "source-website"];
      if (input.resetStyle) tagKeys.push(input.resetStyle);
      return upsertContact(input.email, input.firstName, tagKeys, [
        { slug: "website", value: "https://stubborndragonflies.com/waitlist" },
      ]);
    }),

  /**
   * Called when a kit purchase is confirmed.
   * Tags: kit-buyer + optional reset style
   */
  subscribeKitBuyer: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1).max(100),
        resetStyle: z
          .enum([
            "screen-fried",
            "routine-rebuilder",
            "overcommitted",
            "rest-resistant",
            "emotionally-stuck",
          ])
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const tagKeys: TagKey[] = ["kit-buyer", "source-website"];
      if (input.resetStyle) tagKeys.push(input.resetStyle);
      return upsertContact(input.email, input.firstName, tagKeys, [
        { slug: "website", value: "https://stubborndragonflies.com/kit" },
      ]);
    }),

  /**
   * Admin utility: provision all SD tags in Systeme.io.
   * Safe to call multiple times. Returns created vs existing counts.
   */
  provisionTags: publicProcedure.mutation(async () => {
    return provisionAllTags();
  }),

  /**
   * Admin utility: list all tags currently in Systeme.io.
   */
  listTags: publicProcedure.query(async () => {
    const apiKey = getApiKey();
    if (!apiKey) return { success: false, tags: [], error: "API key not configured" };
    try {
      const res = await systemeGet("/tags");
      if (!res.ok) return { success: false, tags: [], error: `API returned ${res.status}` };
      const data = (await res.json()) as { items: { id: number; name: string }[] };
      return { success: true, tags: data.items };
    } catch (err) {
      return { success: false, tags: [], error: String(err) };
    }
  }),

  /**
   * Admin utility: get contact count and recent contacts.
   */
  getContacts: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(10) }).optional())
    .query(async ({ input }) => {
      const apiKey = getApiKey();
      if (!apiKey) return { success: false, contacts: [], error: "API key not configured" };
      try {
        const res = await systemeGet(`/contacts`);
        if (!res.ok) return { success: false, contacts: [], error: `API returned ${res.status}` };
        const data = (await res.json()) as {
          items: { id: number; email: string; registeredAt: string; tags: { id: number; name: string }[] }[];
          hasMore: boolean;
        };
        return { success: true, contacts: data.items.slice(0, input?.limit ?? 10), hasMore: data.hasMore };
      } catch (err) {
        return { success: false, contacts: [], error: String(err) };
      }
    }),
});
