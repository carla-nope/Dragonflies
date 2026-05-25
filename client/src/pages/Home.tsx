/* Home — Soft Ink design system
   Sections: Hero (asymmetric, dragonfly right), Problem, Belief Shift,
   Quiz CTA, Kit Teaser, Waitlist, Founder Note */
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const HERO_DRAGONFLY = "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_hero_dragonfly-7mVczYpUh8eK6HFHV9h2zg.webp";
const KIT_COVER = "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_kit_cover-d5z2zxjX5mYvqH36JwwVRT.webp";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const beliefs = [
  { old: "Build the perfect routine.", fresh: "Shrink the reset until your nervous system stops arguing." },
  { old: "Never break the streak.", fresh: "Build a return path for when you inevitably miss a day." },
  { old: "Do a full digital detox.", fresh: "Create one small offline pocket that is easier to choose." },
  { old: "Earn your rest.", fresh: "Treat rest as maintenance, not a reward." },
  { old: "Fix your whole life.", fresh: "Practice one tiny proof of return." },
];

const kitIncludes = [
  { item: "7-day reset guide", why: "One tiny action per day — no long lists." },
  { item: "Five reset style tracks", why: "Personalizes the plan to your friction." },
  { item: "Offline ritual menu", why: "Replaces default scrolling with realistic alternatives." },
  { item: "No-shame restart scripts", why: "Helps you return after missing a day." },
  { item: "Tiny boundary planner", why: "Protects the reset without overcomplicating it." },
  { item: "Email companion sequence", why: "Nudges you through the week." },
];

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stubborn Dragonflies",
    url: "https://stubborndragonflies.com",
    description: "Tiny resets for stubborn humans. Build smaller offline rituals, no-shame restart rules, and realistic digital boundaries you can actually return to.",
    sameAs: [],
    offers: {
      "@type": "Offer",
      name: "7-Day Stubborn Reset Kit",
      price: "17.00",
      priceCurrency: "USD",
      url: "https://stubborndragonflies.com/kit",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Stubborn Reset?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Stubborn Reset is a tiny, repeatable offline ritual designed for people who keep starting wellness routines and abandoning them. It is not a detox or a challenge — it is one small proof that you can return.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Stubborn Reset Finder quiz?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Stubborn Reset Finder is a free 10-question quiz that identifies which of five reset styles fits you best: Screen-Fried, Routine-Rebuilder, Overcommitted, Rest-Resistant, or Emotionally Stuck. Each result includes a personalized restart script and first tiny action.",
        },
      },
      {
        "@type": "Question",
        name: "What is the 7-Day Stubborn Reset Kit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 7-Day Stubborn Reset Kit is a $17 digital download that guides you through building one small offline ritual over seven days. It includes five personalized reset tracks, an offline ritual menu, no-shame restart scripts, and a seven-day email companion sequence.",
        },
      },
      {
        "@type": "Question",
        name: "Is Stubborn Dragonflies a medical or therapy service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Stubborn Dragonflies provides wellness education only. It is not medical advice, therapy, or crisis support. If you need clinical care, please contact a qualified mental health professional.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <SEO
        title="Stubborn Dragonflies — Tiny Resets for Stubborn Humans"
        description="If you keep starting routines and abandoning them, Stubborn Dragonflies helps you build smaller offline rituals, no-shame restart rules, and realistic digital boundaries you can actually return to. Free quiz included."
        path="/"
        schema={[orgSchema, faqSchema]}
      />
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          {/* Left: copy */}
          <div className="relative z-10">
            <span
              className="annotation uppercase tracking-widest mb-4 block"
              style={{ color: "oklch(0.64 0.09 25)" }}
            >
              A home for stubborn starters
            </span>
            <h1
              className="display-heading mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                color: "oklch(0.33 0.05 185)",
                lineHeight: 1.05,
              }}
            >
              Tiny resets<br />
              <em>for stubborn humans.</em>
            </h1>
            <p
              className="mb-8 max-w-md"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1.05rem",
                color: "oklch(0.42 0.04 185)",
                lineHeight: 1.75,
              }}
            >
              If you keep starting routines, abandoning them, and quietly blaming yourself —
              Stubborn Dragonflies helps you build smaller offline rituals, no-shame restart rules,
              and realistic digital boundaries you can actually return to.
            </p>
            <div className="flex flex-wrap gap-3">
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
                  Find Your Reset Style
                </button>
              </Link>
              <Link href="/kit">
                <button
                  className="px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
                  style={{
                    background: "transparent",
                    color: "oklch(0.33 0.05 185)",
                    fontFamily: "'Nunito Sans', sans-serif",
                    letterSpacing: "0.02em",
                    border: "1px solid oklch(0.33 0.05 185 / 0.4)",
                  }}
                >
                  Get the 7-Day Kit
                </button>
              </Link>
            </div>
            <p
              className="mt-4 annotation"
              style={{ color: "oklch(0.60 0.03 185)" }}
            >
              Free quiz · 3 minutes · No productivity bootcamp energy required.
            </p>
          </div>

          {/* Right: dragonfly */}
          <div className="relative flex justify-center md:justify-end">
            <img
              src={HERO_DRAGONFLY}
              alt="Ink-wash dragonfly illustration"
              className="w-full max-w-sm md:max-w-md opacity-90"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
        <div className="ink-divider" />
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeSection>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              Sound familiar?
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                color: "oklch(0.33 0.05 185)",
                marginBottom: "1.5rem",
              }}
            >
              You have probably tried the planner.
            </h2>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1.05rem", color: "oklch(0.42 0.04 185)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              The morning routine. The screen-time limit. The habit tracker. The Sunday reset.
              The dramatic promise to finally become a person who has it together.
              Then life happened. Your phone got loud. Your energy dipped.
              The routine became another thing to maintain. And the tiny internal courtroom reopened.
            </p>
            <div
              className="restart-script"
              style={{ marginTop: "1.5rem" }}
            >
              Stubborn Dragonflies starts from a different premise: your resistance is not a character flaw. It is design feedback.
            </div>
          </FadeSection>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* ── BELIEF SHIFT ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeSection>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              A different approach
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                color: "oklch(0.33 0.05 185)",
                marginBottom: "2rem",
              }}
            >
              What changes when you start smaller.
            </h2>
          </FadeSection>

          <div className="space-y-0">
            {beliefs.map((b, i) => (
              <FadeSection key={i} delay={i * 60}>
                <div
                  className="grid md:grid-cols-2 gap-0 py-5"
                  style={{ borderBottom: "1px solid oklch(0.88 0.02 85)" }}
                >
                  <div className="flex items-start gap-3 pr-6 md:border-r" style={{ borderColor: "oklch(0.88 0.02 85)" }}>
                    <span style={{ color: "oklch(0.74 0.04 145)", marginTop: "2px", fontSize: "0.9rem" }}>✕</span>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.60 0.03 185)", fontSize: "0.95rem", textDecoration: "line-through" }}>
                      {b.old}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 md:pl-6 mt-2 md:mt-0">
                    <span style={{ color: "oklch(0.64 0.09 25)", marginTop: "2px", fontSize: "0.9rem" }}>→</span>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.33 0.05 185)", fontSize: "0.95rem", fontWeight: 600 }}>
                      {b.fresh}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* ── QUIZ CTA ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <FadeSection>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_quiz_illustration-fTLhkCxz9JuhP26WSxzNYT.webp"
              alt="Five dragonfly styles illustration"
              className="w-full max-w-sm opacity-85"
              style={{ mixBlendMode: "multiply" }}
            />
          </FadeSection>
          <FadeSection delay={100}>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              Free diagnostic
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                color: "oklch(0.33 0.05 185)",
                marginBottom: "1rem",
              }}
            >
              Find Your Stubborn Reset Style
            </h2>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.42 0.04 185)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Take the free Stubborn Reset Finder and discover whether you are Screen-Fried,
              Routine-Rebuilding, Overcommitted, Rest-Resistant, or Emotionally Stuck.
              You will get your reset style, your first tiny action, and the best 7-day path for your current friction.
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
          </FadeSection>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* ── KIT TEASER ── */}
      <section className="py-16 md:py-24" style={{ background: "oklch(0.96 0.015 85)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <FadeSection>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              Low-ticket offer · $17
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                color: "oklch(0.33 0.05 185)",
                marginBottom: "1rem",
              }}
            >
              The 7-Day Stubborn Reset Kit
            </h2>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.42 0.04 185)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              A tiny digital kit for people who are done turning wellness into another assignment.
              In seven days, you will build one reset ritual, one offline pocket, and one no-shame restart rule.
            </p>
            <div className="space-y-3 mb-6">
              {kitIncludes.map((k, i) => (
                <div key={i} className="flex gap-3">
                  <span style={{ color: "oklch(0.74 0.04 145)", fontWeight: 700, marginTop: "1px" }}>—</span>
                  <div>
                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600, color: "oklch(0.33 0.05 185)", fontSize: "0.9rem" }}>{k.item}</span>
                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.9rem" }}> · {k.why}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/kit">
              <button
                className="px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: "oklch(0.64 0.09 25)",
                  color: "oklch(0.98 0.005 90)",
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "0.02em",
                  border: "none",
                }}
              >
                Start the 7-Day Reset — $17
              </button>
            </Link>
          </FadeSection>
          <FadeSection delay={100}>
            <img
              src={KIT_COVER}
              alt="7-Day Stubborn Reset Kit cover"
              className="w-full max-w-xs mx-auto md:mx-0"
              style={{ opacity: 0.92 }}
            />
          </FadeSection>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <FadeSection>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              Coming soon
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                color: "oklch(0.33 0.05 185)",
                marginBottom: "1rem",
              }}
            >
              Want this planned for you every week?
            </h2>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.42 0.04 185)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: "32rem", margin: "0 auto 1.5rem" }}>
              The Dragonfly Reset Club is the upcoming weekly reset membership for stubborn humans
              who need gentle structure, offline rituals, and a reliable restart point.
              Founding members lock in early pricing.
            </p>
            <Link href="/waitlist">
              <button
                className="px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: "transparent",
                  color: "oklch(0.33 0.05 185)",
                  fontFamily: "'Nunito Sans', sans-serif",
                  letterSpacing: "0.02em",
                  border: "1px solid oklch(0.33 0.05 185 / 0.5)",
                }}
              >
                Join the Founding Member Waitlist
              </button>
            </Link>
          </FadeSection>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* ── FOUNDER NOTE ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          <FadeSection>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              A note from the founder
            </span>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                fontStyle: "italic",
                color: "oklch(0.38 0.05 185)",
                lineHeight: 1.6,
                borderLeft: "2px solid oklch(0.64 0.09 25 / 0.4)",
                paddingLeft: "1.5rem",
                margin: 0,
              }}
            >
              Stubborn Dragonflies exists because many people do not need louder advice.
              They need smaller doorways. This is a home for the overthinkers, the screen-fried,
              the tired starters, the rest-resistant, and the people who keep disappearing from
              routines and still want a way back.
            </blockquote>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
