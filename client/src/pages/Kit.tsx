/* Kit — Soft Ink design system
   Sales page for the 7-Day Stubborn Reset Kit at $17
   Buy button opens an email capture modal → subscribeKitBuyer → Systeme.io */
import { useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const KIT_COVER = "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_kit_cover-d5z2zxjX5mYvqH36JwwVRT.webp";

const includes = [
  { title: "7-Day Reset Guide", desc: "One tiny action per day — no long lists, no overwhelm. Each day builds on the last." },
  { title: "Five Reset Style Tracks", desc: "Personalized paths for Screen-Fried, Routine-Rebuilder, Overcommitted, Rest-Resistant, and Emotionally Stuck." },
  { title: "Offline Ritual Menu", desc: "A curated list of realistic offline alternatives to replace default scrolling moments." },
  { title: "No-Shame Restart Scripts", desc: "Exact language to use when you miss a day. Removes the guilt loop that kills most resets." },
  { title: "Tiny Boundary Planner", desc: "A one-page template to protect your reset without overcomplicating your schedule." },
  { title: "Email Companion Sequence", desc: "Seven gentle nudges delivered to your inbox — one per day — to keep you moving." },
];

const faqs = [
  { q: "Is this a detox or a challenge?", a: "Neither. It is a seven-day experiment in building one small offline ritual. No streaks to maintain. No rules to break." },
  { q: "What if I miss a day?", a: "The kit includes a no-shame restart script specifically for that. Missing a day is expected. The kit is designed around it." },
  { q: "Is this for people with serious screen addiction?", a: "No. This is wellness education for people who feel overstimulated, stuck in routines, or unable to rest — not clinical treatment. If you need clinical support, please seek a qualified professional." },
  { q: "What format is it in?", a: "Digital PDF download, delivered immediately after purchase. Printable and screen-friendly." },
  { q: "What if it does not work for me?", a: "If you complete the seven days and feel it was not worth $17, email us and we will refund you. No questions." },
];

const testimonials = [
  { quote: "I have tried every planner. This is the first thing that did not make me feel worse about myself for not finishing it.", name: "Early tester, Overcommitted Dragonfly" },
  { quote: "The restart script alone was worth it. I have used it four times already.", name: "Early tester, Routine-Rebuilder Dragonfly" },
  { quote: "I did not expect to cry reading the description of my reset style. It was just really accurate.", name: "Early tester, Emotionally Stuck Dragonfly" },
];

type ResetStyleKey = "screen-fried" | "routine-rebuilder" | "overcommitted" | "rest-resistant" | "emotionally-stuck" | "";

export default function Kit() {
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalResetStyle, setModalResetStyle] = useState<ResetStyleKey>("");
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const subscribeKitBuyer = trpc.systeme.subscribeKitBuyer.useMutation();

  function handleBuy() {
    setModalOpen(true);
  }

  function handleModalSubmit(e: React.FormEvent) {
    e.preventDefault();
    subscribeKitBuyer.mutate(
      {
        email: modalEmail,
        firstName: modalName.trim() || "Friend",
        resetStyle: modalResetStyle || undefined,
      },
      {
        onSuccess: () => {
          setModalSubmitted(true);
        },
        onError: () => {
          // Still show success — don't block the purchase experience
          setModalSubmitted(true);
          toast.error("Could not save your email, but your purchase is still being processed.");
        },
      }
    );
  }

  function closeModal() {
    setModalOpen(false);
    setModalSubmitted(false);
    setModalName("");
    setModalEmail("");
    setModalResetStyle("");
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "7-Day Stubborn Reset Kit",
    description: "A digital wellness kit for people who keep starting routines and abandoning them. Includes a 7-day reset guide, five personalized reset tracks, an offline ritual menu, no-shame restart scripts, a tiny boundary planner, and a 7-day email companion sequence.",
    url: "https://stubborndragonflies.com/kit",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_kit_cover-d5z2zxjX5mYvqH36JwwVRT.webp",
    brand: { "@type": "Brand", name: "Stubborn Dragonflies" },
    offers: {
      "@type": "Offer",
      price: "17.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://stubborndragonflies.com/kit",
      seller: { "@type": "Organization", name: "Stubborn Dragonflies" },
    },
    audience: {
      "@type": "Audience",
      audienceType: "Adults seeking digital wellness, offline rituals, and routine-building support",
    },
  };

  const kitFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <SEO
        title="7-Day Stubborn Reset Kit — $17 Digital Wellness Kit"
        description="A tiny digital kit for people who are done turning wellness into another assignment. Build one offline ritual, one restart rule, and one reliable return point in seven days. $17 instant download."
        path="/kit"
        type="product"
        schema={[productSchema, kitFaqSchema]}
      />
      <Nav />

      {/* ── EMAIL CAPTURE MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "oklch(0.1 0.02 185 / 0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="w-full max-w-md relative"
            style={{
              background: "oklch(0.98 0.005 90)",
              border: "1px solid oklch(0.88 0.02 85)",
              padding: "2.5rem",
              boxShadow: "0 20px 60px oklch(0.1 0.02 185 / 0.2)",
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-sm"
              style={{ color: "oklch(0.65 0.025 185)", fontFamily: "'Nunito Sans', sans-serif", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Close"
            >
              ✕
            </button>

            {!modalSubmitted ? (
              <>
                <span className="annotation uppercase tracking-widest mb-3 block" style={{ color: "oklch(0.64 0.09 25)" }}>
                  Almost there
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "oklch(0.33 0.05 185)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Where should we send your kit?
                </h2>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.88rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  Enter your email and we will send you the download link plus your 7-day companion email sequence.
                </p>

                <form onSubmit={handleModalSubmit} className="space-y-3">
                  <div>
                    <label className="annotation uppercase tracking-widest mb-1 block" style={{ color: "oklch(0.52 0.04 185)", fontSize: "0.68rem" }}>
                      First name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your first name"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm"
                      style={{
                        border: "1px solid oklch(0.88 0.02 85)",
                        background: "oklch(0.99 0.01 90)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "oklch(0.33 0.05 185)",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label className="annotation uppercase tracking-widest mb-1 block" style={{ color: "oklch(0.52 0.04 185)", fontSize: "0.68rem" }}>
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm"
                      style={{
                        border: "1px solid oklch(0.88 0.02 85)",
                        background: "oklch(0.99 0.01 90)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: "oklch(0.33 0.05 185)",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <label className="annotation uppercase tracking-widest mb-1 block" style={{ color: "oklch(0.52 0.04 185)", fontSize: "0.68rem" }}>
                      Your reset style (optional)
                    </label>
                    <select
                      value={modalResetStyle}
                      onChange={(e) => setModalResetStyle(e.target.value as ResetStyleKey)}
                      className="w-full px-4 py-2.5 text-sm"
                      style={{
                        border: "1px solid oklch(0.88 0.02 85)",
                        background: "oklch(0.99 0.01 90)",
                        fontFamily: "'Nunito Sans', sans-serif",
                        color: modalResetStyle ? "oklch(0.33 0.05 185)" : "oklch(0.65 0.025 185)",
                        outline: "none",
                      }}
                    >
                      <option value="">I have not taken the quiz yet</option>
                      <option value="screen-fried">Screen-Fried Dragonfly</option>
                      <option value="routine-rebuilder">Routine-Rebuilder Dragonfly</option>
                      <option value="overcommitted">Overcommitted Dragonfly</option>
                      <option value="rest-resistant">Rest-Resistant Dragonfly</option>
                      <option value="emotionally-stuck">Emotionally Stuck Dragonfly</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={subscribeKitBuyer.isPending}
                    className="w-full px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "oklch(0.64 0.09 25)",
                      color: "oklch(0.98 0.005 90)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "0.02em",
                      border: "none",
                    }}
                  >
                    {subscribeKitBuyer.isPending ? "Processing..." : "Send My Kit — $17"}
                  </button>
                  <p className="annotation text-center" style={{ color: "oklch(0.65 0.025 185)", fontSize: "0.72rem" }}>
                    Payment integration coming soon. We will notify you the moment the kit is live.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "oklch(0.64 0.09 25)", marginBottom: "1rem" }}>
                  ✦
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.7rem",
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: "oklch(0.33 0.05 185)",
                    marginBottom: "0.75rem",
                  }}
                >
                  You are on the early access list.
                </h2>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                  We will email you the moment the kit is available for purchase. You will be among the first to get it.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: "transparent",
                    color: "oklch(0.33 0.05 185)",
                    fontFamily: "'Nunito Sans', sans-serif",
                    border: "1px solid oklch(0.33 0.05 185 / 0.4)",
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              Digital kit · $17
            </span>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "oklch(0.33 0.05 185)",
                lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              The 7-Day<br />Stubborn Reset Kit
            </h1>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1.05rem",
                color: "oklch(0.42 0.04 185)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              A tiny digital kit for people who are done turning wellness into another assignment.
              In seven days, you will build one reset ritual, one offline pocket, and one no-shame restart rule.
            </p>
            <div className="restart-script mb-6">
              "Not a challenge. Not a detox. Just seven small proofs that you can return."
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={handleBuy}
                className="px-8 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: "oklch(0.64 0.09 25)",
                  color: "oklch(0.98 0.005 90)",
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "0.02em",
                  border: "none",
                }}
              >
                Get the Kit — $17
              </button>
              <Link href="/quiz">
                <span
                  className="text-sm cursor-pointer"
                  style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", textDecoration: "underline" }}
                >
                  Not sure? Take the free quiz first.
                </span>
              </Link>
            </div>
            <p className="annotation mt-3" style={{ color: "oklch(0.65 0.025 185)" }}>
              Instant digital download · 7-day money-back guarantee
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src={KIT_COVER}
              alt="7-Day Stubborn Reset Kit"
              className="w-full max-w-xs"
              style={{ opacity: 0.93 }}
            />
          </div>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* What's inside */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            What is inside
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 600,
              color: "oklch(0.33 0.05 185)",
              marginBottom: "2rem",
            }}
          >
            Everything you need. Nothing you do not.
          </h2>
          <div className="space-y-0">
            {includes.map((item, i) => (
              <div
                key={i}
                className="py-5"
                style={{ borderBottom: "1px solid oklch(0.88 0.02 85)" }}
              >
                <div className="flex gap-4">
                  <span
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      color: "oklch(0.64 0.09 25)",
                      fontSize: "0.8rem",
                      marginTop: "3px",
                      minWidth: "1.5rem",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "oklch(0.33 0.05 185)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* Testimonials */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.96 0.015 85)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="annotation uppercase tracking-widest mb-8 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Early testers
          </span>
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} style={{ borderLeft: "2px solid oklch(0.64 0.09 25 / 0.35)", paddingLeft: "1.5rem" }}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    fontStyle: "italic",
                    color: "oklch(0.38 0.05 185)",
                    lineHeight: 1.6,
                    marginBottom: "0.5rem",
                  }}
                >
                  "{t.quote}"
                </p>
                <p className="annotation" style={{ color: "oklch(0.60 0.03 185)" }}>
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Questions
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 600,
              color: "oklch(0.33 0.05 185)",
              marginBottom: "2rem",
            }}
          >
            Honest answers.
          </h2>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5" style={{ borderBottom: "1px solid oklch(0.88 0.02 85)" }}>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "oklch(0.33 0.05 185)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                  {faq.q}
                </p>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-xl mx-auto px-6 md:px-10 text-center">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              fontWeight: 600,
              fontStyle: "italic",
              color: "oklch(0.33 0.05 185)",
              marginBottom: "1rem",
            }}
          >
            Seven days. One tiny ritual. One reliable return.
          </h2>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            That is the whole promise.
          </p>
          <button
            onClick={handleBuy}
            className="px-8 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-95"
            style={{
              background: "oklch(0.33 0.05 185)",
              color: "oklch(0.98 0.005 90)",
              fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "0.02em",
              border: "none",
            }}
          >
            Get the 7-Day Stubborn Reset Kit — $17
          </button>
          <p className="annotation mt-3" style={{ color: "oklch(0.65 0.025 185)" }}>
            Instant download · 7-day money-back guarantee · Wellness education only
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
