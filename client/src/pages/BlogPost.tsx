/* BlogPost — Soft Ink design system */
import { useParams, Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";

  const { data: post, isLoading, error } = trpc.blog.bySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full animate-spin"
            style={{ border: "2px solid oklch(0.88 0.02 85)", borderTopColor: "oklch(0.33 0.05 185)" }}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
        <Nav />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
          <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            404
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "oklch(0.33 0.05 185)", marginBottom: "1rem" }}>
            This post wandered off.
          </h1>
          <Link href="/blog">
            <button
              className="px-6 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95"
              style={{ background: "oklch(0.33 0.05 185)", color: "oklch(0.98 0.005 90)", fontFamily: "'Nunito Sans', sans-serif", border: "none" }}
            >
              ← Back to Blog
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Stubborn Dragonflies" },
    publisher: { "@type": "Organization", name: "Stubborn Dragonflies", url: "https://stubborndragonflies.com" },
    url: `https://stubborndragonflies.com/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };

  const faqMatches = post.html.match(/<h2[^>]*>FAQ<\/h2>([\s\S]*?)(?=<h2|$)/i);
  const faqSchema = faqMatches
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: Array.from(post.html.matchAll(/<strong>([^<]+)\?<\/strong>\s*<br[^>]*>\s*([^<]+)/g)).map(
          ([, q, a]) => ({
            "@type": "Question",
            name: q + "?",
            acceptedAnswer: { "@type": "Answer", text: a.trim() },
          })
        ),
      }
    : null;

  const schemas = faqSchema ? [articleSchema, faqSchema] : [articleSchema];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <SEO
        title={`${post.title} — Stubborn Dragonflies`}
        description={post.description}
        path={`/blog/${post.slug}`}
        schema={schemas}
      />
      <Nav />

      <main className="flex-1">
        {/* Post header */}
        <header className="max-w-3xl mx-auto px-6 md:px-10 pt-14 pb-8">
          <Link href="/blog">
            <span
              className="annotation uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
              style={{ color: "oklch(0.64 0.09 25)", fontSize: "0.7rem" }}
            >
              ← Blog
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
            <span
              className="annotation uppercase tracking-widest"
              style={{ color: "oklch(0.64 0.09 25)", fontSize: "0.7rem" }}
            >
              {post.category}
            </span>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.75rem", color: "oklch(0.60 0.03 185)" }}>
              {formatDate(post.date)} · {post.readingTime} min read
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 600,
              color: "oklch(0.33 0.05 185)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "1.1rem",
              color: "oklch(0.42 0.04 185)",
              lineHeight: 1.75,
              fontStyle: "italic",
            }}
          >
            {post.description}
          </p>

          <div className="ink-divider mt-8" />
        </header>

        {/* Post body */}
        <article
          className="max-w-3xl mx-auto px-6 md:px-10 pb-14 prose-blog"
          dangerouslySetInnerHTML={{ __html: post.html }}
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            color: "oklch(0.33 0.05 185)",
            lineHeight: 1.85,
          }}
        />

        {/* Quiz CTA banner */}
        {post.quizCTA && (
          <div
            className="max-w-3xl mx-auto px-6 md:px-10 pb-14"
          >
            <div
              className="p-8 text-center"
              style={{ background: "oklch(0.96 0.015 85)", border: "1px solid oklch(0.88 0.02 85)" }}
            >
              <span className="annotation uppercase tracking-widest mb-3 block" style={{ color: "oklch(0.64 0.09 25)" }}>
                Free diagnostic
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.6rem",
                  fontWeight: 600,
                  color: "oklch(0.33 0.05 185)",
                  marginBottom: "0.75rem",
                }}
              >
                Find Your Stubborn Reset Style
              </h3>
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  color: "oklch(0.42 0.04 185)",
                  fontSize: "0.95rem",
                  marginBottom: "1.5rem",
                  maxWidth: "28rem",
                  margin: "0 auto 1.5rem",
                }}
              >
                Take the free 3-minute quiz and get a personalized restart script for your reset style.
              </p>
              <Link href="/quiz">
                <button
                  className="px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: "oklch(0.33 0.05 185)",
                    color: "oklch(0.98 0.005 90)",
                    fontFamily: "'Nunito Sans', sans-serif",
                    letterSpacing: "0.02em",
                    border: "none",
                  }}
                >
                  Take the Free Quiz →
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="max-w-3xl mx-auto px-6 md:px-10 pb-16">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "oklch(0.52 0.04 185)",
                  background: "oklch(0.93 0.01 85)",
                  padding: "3px 10px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
