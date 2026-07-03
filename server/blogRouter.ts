import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { readdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  quizCTA: boolean;
}

export interface Post extends PostMeta {
  html: string;
}

async function getAllPostMeta(): Promise<PostMeta[]> {
  try {
    const files = await readdir(POSTS_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const raw = await readFile(join(POSTS_DIR, file), "utf-8");
        const { data } = matter(raw);
        return {
          slug: data.slug || file.replace(".md", ""),
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          category: data.category || "General",
          tags: Array.isArray(data.tags) ? data.tags : [],
          readingTime: data.readingTime || 5,
          quizCTA: data.quizCTA ?? false,
        } as PostMeta;
      })
    );

    // Sort by date descending
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const files = await readdir(POSTS_DIR);
    const mdFile = files.find((f) => {
      const raw = f.replace(".md", "");
      return raw === slug;
    });

    if (!mdFile) return null;

    const raw = await readFile(join(POSTS_DIR, mdFile), "utf-8");
    const { data, content } = matter(raw);
    const html = await marked(content);

    return {
      slug: data.slug || mdFile.replace(".md", ""),
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "General",
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: data.readingTime || 5,
      quizCTA: data.quizCTA ?? false,
      html,
    };
  } catch {
    return null;
  }
}

export const blogRouter = router({
  list: publicProcedure.query(async () => {
    return getAllPostMeta();
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getPostBySlug(input.slug);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    }),
});
