/* Result — Soft Ink design system
   Five result types with description, first tiny action, restart script, and kit CTA */
import { useParams, Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type ResultType = "screen-fried" | "routine-rebuilder" | "overcommitted" | "rest-resistant" | "emotionally-stuck";

interface ResultData {
  type: ResultType;
  label: string;
  tagline: string;
  description: string;
  friction: string;
  firstAction: string;
  restartScript: string;
  kitTrack: string;
  nextStep: string;
}

const results: Record<ResultType, ResultData> = {
  "screen-fried": {
    type: "screen-fried",
    label: "Screen-Fried Dragonfly",
    tagline: "You are not addicted to your phone. You are just overstimulated and under-resourced.",
    description:
      "Your phone has become your default decompression tool — not because you are weak, but because it is always available and always ready to provide a hit of novelty when everything else feels flat or overwhelming. The problem is not the phone. The problem is that your nervous system has not had a reliable offline alternative.",
    friction: "Your reset keeps failing because the offline option requires more setup than the online one.",
    firstAction:
      "Choose one 15-minute window today and pair it with one analog activity. Put the phone in a different room for that window. That is the whole first step.",
    restartScript:
      "\"I can stop now without making this a drama. The next 15 minutes belong to me.\"",
    kitTrack: "Offline Evening Track",
    nextStep: "The 7-Day Kit's Offline Evening Track will help you build one reliable offline pocket that is easier to choose than the scroll.",
  },
  "routine-rebuilder": {
    type: "routine-rebuilder",
    label: "Routine-Rebuilder Dragonfly",
    tagline: "You are not inconsistent. Your routines have been too heavy for the life you actually have.",
    description:
      "You have started and restarted more routines than you can count. You know what would help. You have tried it. Then Wednesday happens, or a hard week, or a season change, and the routine collapses. The problem is not your follow-through. The problem is that the routine was designed for a version of you with unlimited energy and zero friction.",
    friction: "Your reset keeps failing because it was built for a perfect day, not a real one.",
    firstAction:
      "Create the two-minute version of the routine you keep abandoning. Not a shorter version — the version so small your brain cannot argue with it.",
    restartScript:
      "\"A missed day is not a verdict. Today is a return point, not a reckoning.\"",
    kitTrack: "No-Shame Restart Track",
    nextStep: "The 7-Day Kit's No-Shame Restart Track will help you build a return path that works on tired days, not just good ones.",
  },
  "overcommitted": {
    type: "overcommitted",
    label: "Overcommitted Dragonfly",
    tagline: "You are not bad at self-care. You are running a system with no margin built in.",
    description:
      "You keep adding things. Routines, goals, commitments, responsibilities. The list grows. The time does not. Your reset keeps getting crowded out not because you do not want it, but because you have not yet treated it as a non-negotiable. You are not lazy. You are over-allocated.",
    friction: "Your reset keeps failing because it is always the first thing removed when something else needs the time.",
    firstAction:
      "Choose one thing you will not do this week. Not a new habit — a removal. One thing off the list that does not actually need to be there.",
    restartScript:
      "\"I am allowed to protect small things. Removing is not quitting.\"",
    kitTrack: "Sunday Reset Track",
    nextStep: "The 7-Day Kit's Sunday Reset Track will help you create a weekly planning ritual that removes before it adds.",
  },
  "rest-resistant": {
    type: "rest-resistant",
    label: "Rest-Resistant Dragonfly",
    tagline: "You have not earned rest. You have earned the right to need it.",
    description:
      "Rest makes you feel vaguely guilty, restless, or like you are falling behind. You know intellectually that rest is important. But somewhere along the way, rest became something you earn after finishing everything — and everything never finishes. So you never fully rest. And the depletion compounds.",
    friction: "Your reset keeps failing because rest feels like a reward, not a maintenance requirement.",
    firstAction:
      "Take 10 minutes of rest today before you finish everything. Not after. Before. That is the experiment.",
    restartScript:
      "\"Rest is maintenance for the person doing the everything. I do not have to earn it first.\"",
    kitTrack: "Rest as Maintenance Track",
    nextStep: "The 7-Day Kit's Rest as Maintenance Track will help you practice rest as a repeatable ritual, not a reward.",
  },
  "emotionally-stuck": {
    type: "emotionally-stuck",
    label: "Emotionally Stuck Dragonfly",
    tagline: "You are not unmotivated. You are carrying something that makes starting feel heavier than it should.",
    description:
      "Some days, the weight of starting feels disproportionate to the task. You know what would help. You can see it clearly. But the gap between knowing and doing feels enormous. This is not a discipline problem. This is what it feels like when your emotional bandwidth is already fully allocated before the day begins.",
    friction: "Your reset keeps failing because it requires emotional readiness you do not always have available.",
    firstAction:
      "Choose one action so small it requires almost no emotional energy. Clear one surface. Sit near a window. Make tea. That is a proof of motion.",
    restartScript:
      "\"This is a return, not a reckoning. The tired version counts.\"",
    kitTrack: "Gentle Motion Track",
    nextStep: "The 7-Day Kit's Gentle Motion Track will help you build a reset that works on hard days, not just easy ones.",
  },
};

export default function Result() {
  const params = useParams<{ type: string }>();
  const resultType = (params.type as ResultType) || "routine-rebuilder";
  const data = results[resultType] || results["routine-rebuilder"];

  const allTypes: ResultType[] = ["screen-fried", "routine-rebuilder", "overcommitted", "rest-resistant", "emotionally-stuck"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <Nav />

      <div className="max-w-2xl mx-auto w-full px-6 md:px-10 py-14 flex-1">
        {/* Result header */}
        <div
          className="mb-10 fade-in-up"
          style={{
            padding: "2rem",
            background: "oklch(0.96 0.015 85)",
            borderLeft: "3px solid oklch(0.64 0.09 25)",
          }}
        >
          <span className="annotation uppercase tracking-widest mb-3 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Your Reset Style
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "oklch(0.33 0.05 185)",
              marginBottom: "0.5rem",
            }}
          >
            {data.label}
          </h1>
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "1.05rem",
              color: "oklch(0.42 0.04 185)",
              fontStyle: "italic",
            }}
          >
            {data.tagline}
          </p>
        </div>

        {/* Description */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: "100ms" }}>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.38 0.05 185)", lineHeight: 1.8, fontSize: "1rem" }}>
            {data.description}
          </p>
        </div>

        <div className="ink-divider mb-8" />

        {/* Friction */}
        <div className="mb-8 fade-in-up" style={{ animationDelay: "150ms" }}>
          <span className="annotation uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Why your resets keep failing
          </span>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.38 0.05 185)", lineHeight: 1.7, fontWeight: 600 }}>
            {data.friction}
          </p>
        </div>

        {/* First action */}
        <div
          className="mb-8 fade-in-up"
          style={{
            animationDelay: "200ms",
            padding: "1.5rem",
            background: "oklch(0.95 0.02 185)",
            borderLeft: "2px solid oklch(0.33 0.05 185 / 0.4)",
          }}
        >
          <span className="annotation uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.33 0.05 185)" }}>
            Your first tiny action
          </span>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.33 0.05 185)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            {data.firstAction}
          </p>
        </div>

        {/* Restart script */}
        <div className="mb-10 fade-in-up" style={{ animationDelay: "250ms" }}>
          <span className="annotation uppercase tracking-widest mb-2 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Your restart script
          </span>
          <div className="restart-script">
            {data.restartScript}
          </div>
        </div>

        <div className="ink-divider mb-8" />

        {/* Kit CTA */}
        <div className="mb-10 fade-in-up" style={{ animationDelay: "300ms" }}>
          <span className="annotation uppercase tracking-widest mb-3 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Your recommended track
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "oklch(0.33 0.05 185)",
              marginBottom: "0.75rem",
            }}
          >
            {data.kitTrack} in the 7-Day Stubborn Reset Kit
          </h2>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.42 0.04 185)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            {data.nextStep}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/kit">
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
                Get the 7-Day Kit — $17
              </button>
            </Link>
            <Link href="/waitlist">
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
                Join the Reset Club Waitlist
              </button>
            </Link>
          </div>
        </div>

        <div className="ink-divider mb-8" />

        {/* Other types */}
        <div className="fade-in-up" style={{ animationDelay: "350ms" }}>
          <span className="annotation uppercase tracking-widest mb-4 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Other reset styles
          </span>
          <div className="flex flex-wrap gap-2">
            {allTypes.filter((t) => t !== resultType).map((t) => (
              <Link key={t} href={`/result/${t}`}>
                <span
                  className="px-3 py-1.5 text-xs cursor-pointer transition-colors duration-200"
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    border: "1px solid oklch(0.88 0.02 85)",
                    color: "oklch(0.52 0.04 185)",
                    background: "oklch(0.99 0.01 90)",
                  }}
                >
                  {results[t].label}
                </span>
              </Link>
            ))}
          </div>
          <p className="annotation mt-3" style={{ color: "oklch(0.65 0.025 185)" }}>
            Feel like another style fits better? Browse them above.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
