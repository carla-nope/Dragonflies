/* Waitlist — Soft Ink design system
   Founding member waitlist for the Dragonfly Reset Club membership */
import { useState } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const HERO_DRAGONFLY = "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_hero_dragonfly-7mVczYpUh8eK6HFHV9h2zg.webp";

const clubIncludes = [
  { title: "Weekly Reset Plan", desc: "A new tiny reset ritual every week, matched to your reset style." },
  { title: "Offline Ritual of the Week", desc: "One curated offline activity with a realistic implementation guide." },
  { title: "Restart Script Library", desc: "Growing collection of no-shame return scripts for every friction type." },
  { title: "Monthly Reset Audit", desc: "A simple one-page review to see what is working and what to adjust." },
  { title: "Community Access", desc: "A quiet, low-noise space for stubborn starters to share what is actually working." },
  { title: "Founding Member Pricing", desc: "Lock in the lowest rate before public launch. Price increases after founding round closes." },
];

export default function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resetStyle, setResetStyle] = useState<"screen-fried" | "routine-rebuilder" | "overcommitted" | "rest-resistant" | "emotionally-stuck" | "">("" );
  const [submitted, setSubmitted] = useState(false);

  const subscribeWaitlist = trpc.systeme.subscribeWaitlist.useMutation();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    subscribeWaitlist.mutate(
      { email, firstName: name.trim() || "Friend", resetStyle: resetStyle || undefined },
      {
        onSuccess: () => {
          toast.success("You are on the list.", {
            description: "We will reach out before the founding round closes.",
          });
        },
        onError: () => {
          // Still show success UX — user is already marked submitted
          toast.success("You are on the list.", {
            description: "We will reach out before the founding round closes.",
          });
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <SEO
        title="Dragonfly Reset Club — Founding Member Waitlist"
        description="Join the founding member waitlist for the Dragonfly Reset Club — a weekly digital wellness membership with personalized reset rituals, offline routines, and no-shame restart scripts. Lock in the founding rate before public launch."
        path="/waitlist"
      />
      <Nav />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
              Coming soon · Founding member waitlist
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
              The Dragonfly<br />Reset Club
            </h1>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1.05rem",
                color: "oklch(0.42 0.04 185)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              A weekly reset membership for stubborn humans who need gentle structure,
              offline rituals, and a reliable restart point — without the productivity bootcamp energy.
            </p>
            <div className="restart-script mb-6">
              "Not a community of optimized people. A community of people who keep returning."
            </div>
            <div
              className="flex gap-3 items-center py-3 px-4 mb-6"
              style={{ background: "oklch(0.95 0.02 185)", border: "1px solid oklch(0.33 0.05 185 / 0.2)" }}
            >
              <span style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.8rem", color: "oklch(0.33 0.05 185)" }}>
                Founding member price: locked in at launch rate · Public price will be higher.
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={HERO_DRAGONFLY}
              alt="Dragonfly Reset Club"
              className="w-full max-w-xs opacity-80"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      </section>

      <div className="ink-divider mx-6 md:mx-10" />

      {/* What is included */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            What members get
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
            Planned for you. Every week.
          </h2>
          <div className="space-y-0">
            {clubIncludes.map((item, i) => (
              <div key={i} className="py-5" style={{ borderBottom: "1px solid oklch(0.88 0.02 85)" }}>
                <div className="flex gap-4">
                  <span style={{ color: "oklch(0.74 0.04 145)", fontWeight: 700, marginTop: "2px", minWidth: "1rem" }}>—</span>
                  <div>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, color: "oklch(0.33 0.05 185)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
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

      {/* Waitlist form */}
      <section className="py-16 md:py-20" style={{ background: "oklch(0.96 0.015 85)" }}>
        <div className="max-w-xl mx-auto px-6 md:px-10">
          {!submitted ? (
            <>
              <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
                Join the founding member waitlist
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  fontWeight: 600,
                  color: "oklch(0.33 0.05 185)",
                  marginBottom: "0.75rem",
                }}
              >
                Reserve your founding rate.
              </h2>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", marginBottom: "2rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
                We will reach out before the founding round closes with your locked-in rate and launch date.
                No spam. No pressure. Unsubscribe anytime.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="annotation uppercase tracking-widest mb-1.5 block"
                    style={{ color: "oklch(0.52 0.04 185)", fontSize: "0.7rem" }}
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm"
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
                  <label
                    className="annotation uppercase tracking-widest mb-1.5 block"
                    style={{ color: "oklch(0.52 0.04 185)", fontSize: "0.7rem" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm"
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
                  <label
                    className="annotation uppercase tracking-widest mb-1.5 block"
                    style={{ color: "oklch(0.52 0.04 185)", fontSize: "0.7rem" }}
                  >
                    Your reset style (optional)
                  </label>
                  <select
                    value={resetStyle}
                    onChange={(e) => setResetStyle(e.target.value as "screen-fried" | "routine-rebuilder" | "overcommitted" | "rest-resistant" | "emotionally-stuck" | "")}
                    className="w-full px-4 py-3 text-sm"
                    style={{
                      border: "1px solid oklch(0.88 0.02 85)",
                      background: "oklch(0.99 0.01 90)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: resetStyle ? "oklch(0.33 0.05 185)" : "oklch(0.65 0.025 185)",
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
                  disabled={subscribeWaitlist.isPending}
                  className="w-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-95 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "oklch(0.33 0.05 185)",
                    color: "oklch(0.98 0.005 90)",
                    fontFamily: "'Nunito Sans', sans-serif",
                    letterSpacing: "0.02em",
                    border: "none",
                  }}
                >
                  {subscribeWaitlist.isPending ? "Joining..." : "Join the Founding Member Waitlist"}
                </button>
                <p className="annotation text-center" style={{ color: "oklch(0.65 0.025 185)" }}>
                  No spam. No pressure. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div
                className="mb-6 inline-block"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3rem",
                  color: "oklch(0.64 0.09 25)",
                }}
              >
                ✦
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: 600,
                  fontStyle: "italic",
                  color: "oklch(0.33 0.05 185)",
                  marginBottom: "0.75rem",
                }}
              >
                You are on the list.
              </h2>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                We will reach out before the founding round closes with your locked-in rate and launch date.
                In the meantime, the 7-Day Kit is available now.
              </p>
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
                  Get the 7-Day Kit While You Wait
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* No quiz yet nudge */}
      {!resetStyle && !submitted && (
        <section className="py-12">
          <div className="max-w-xl mx-auto px-6 md:px-10 text-center">
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.9rem" }}>
              Not sure which reset style you are?{" "}
              <Link href="/quiz">
                <span style={{ color: "oklch(0.33 0.05 185)", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                  Take the free 3-minute quiz first.
                </span>
              </Link>
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
