/* Blog index — Soft Ink design system */
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

const CATEGORIES = ["All", "Screen-Fried", "Routine-Rebuilder", "Overcommitted", "Rest-Resistant", "Emotionally Stuck"];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts?.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  ) ?? [];

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Stubborn Dragonflies Blog",
    description: "Tiny resets for stubborn humans. Practical guides on screen fatigue, routine building, digital boundaries, and offline rituals.",
    url: "https://stubborndragonflies.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Stubborn Dragonflies",
      url: "https://stubborndragonflies.com",
    },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <SEO
        title="Blog — Stubborn Dragonflies"
        description="Practical guides on screen fatigue, routine building, digital boundaries, and offline rituals for stubborn humans who keep starting and stopping."
        path="/blog"
        schema={[blogListSchema]}
      />
      <Nav />

      {/* Header */}
      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <span
            className="annotation uppercase tracking-widest mb-3 block"
            style={{ color: "oklch(0.64 0.09 25)" }}
          >
            The Reset Library
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "oklch(0.33 0.05 185)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Guides for stubborn starters.
          </h1>
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              color: "oklch(0.42 0.04 185)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: "36rem",
            }}
          >
            Practical writing on screen fatigue, routine building, offline rituals, and the art of returning after you have stopped.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 text-xs font-semibold transition-all duration-150"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "0.04em",
                background: activeCategory === cat ? "oklch(0.33 0.05 185)" : "transparent",
                color: activeCategory === cat ? "oklch(0.98 0.005 90)" : "oklch(0.42 0.04 185)",
                border: `1px solid ${activeCategory === cat ? "oklch(0.33 0.05 185)" : "oklch(0.80 0.02 185)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post grid */}
      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-10 pb-20 w-full">
        {isLoading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-sm animate-pulse"
                style={{ background: "oklch(0.93 0.01 85)" }}
              />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)" }}>
            No posts in this category yet. Check back soon.
          </p>
        )}

        <div className="space-y-0">
          {filtered.map((post, i) => (
            <article
              key={post.slug}
              style={{
                borderBottom: "1px solid oklch(0.88 0.02 85)",
                paddingTop: i === 0 ? 0 : "2rem",
                paddingBottom: "2rem",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="annotation uppercase tracking-widest"
                  style={{ color: "oklch(0.64 0.09 25)", fontSize: "0.7rem" }}
                >
                  {post.category}
                </span>
                <span
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.75rem",
                    color: "oklch(0.60 0.03 185)",
                  }}
                >
                  {formatDate(post.date)} · {post.readingTime} min read
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2
                  className="cursor-pointer hover:opacity-75 transition-opacity duration-150"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
                    fontWeight: 600,
                    color: "oklch(0.33 0.05 185)",
                    marginBottom: "0.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  {post.title}
                </h2>
              </Link>

              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  color: "oklch(0.42 0.04 185)",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  marginBottom: "1rem",
                  maxWidth: "42rem",
                }}
              >
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: "0.72rem",
                      color: "oklch(0.52 0.04 185)",
                      background: "oklch(0.93 0.01 85)",
                      padding: "2px 8px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
