import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const SYSTEME_API_BASE = "https://api.systeme.io/api";

// Tag slugs that map to Stubborn Dragonflies reset styles
const RESET_STYLE_TAGS: Record<string, string> = {
  "screen-fried": "sd-screen-fried",
  "routine-rebuilder": "sd-routine-rebuilder",
  overcommitted: "sd-overcommitted",
  "rest-resistant": "sd-rest-resistant",
  "emotionally-stuck": "sd-emotionally-stuck",
  waitlist: "sd-waitlist",
  "kit-buyer": "sd-kit-buyer",
};

async function addContactToSysteme(
  email: string,
  firstName: string,
  tagSlugs: string[]
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SYSTEME_IO_API_KEY;

  if (!apiKey) {
    console.warn("[Systeme.io] SYSTEME_IO_API_KEY not set — skipping contact creation");
    return { success: false, error: "Email service not configured" };
  }

  try {
    // Build tags array — Systeme.io accepts tag names directly
    const tags = tagSlugs
      .map((slug) => RESET_STYLE_TAGS[slug] || slug)
      .filter(Boolean)
      .map((name) => ({ name }));

    const payload: Record<string, unknown> = {
      email,
      fields: [{ slug: "first_name", value: firstName }],
    };

    if (tags.length > 0) {
      payload.tags = tags;
    }

    const res = await fetch(`${SYSTEME_API_BASE}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 409) {
      // 409 = contact already exists — treat as success
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
  // Called from Quiz result page after user enters email
  subscribeQuiz: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1).max(100),
        resetStyle: z.string(), // e.g. "screen-fried"
      })
    )
    .mutation(async ({ input }) => {
      return addContactToSysteme(input.email, input.firstName, [
        input.resetStyle,
        "quiz-subscriber",
      ]);
    }),

  // Called from Waitlist page
  subscribeWaitlist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        firstName: z.string().min(1).max(100),
        resetStyle: z.string().optional(), // e.g. "screen-fried" if they took the quiz first
      })
    )
    .mutation(async ({ input }) => {
      const tags = ["waitlist"];
      if (input.resetStyle) tags.push(input.resetStyle);
      return addContactToSysteme(input.email, input.firstName, tags);
    }),
});
