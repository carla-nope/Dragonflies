/* Quiz — Soft Ink design system
   Conversational scroll-based quiz. Questions appear as previous is answered.
   Scoring maps to 5 result types. Progress shown as thin ink line. */
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const QUIZ_ILLUSTRATION = "https://d2xsxph8kpxj0f.cloudfront.net/96284060/XVea7avjAdttZbDwRxCurb/sd_quiz_illustration-fTLhkCxz9JuhP26WSxzNYT.webp";

type ResultType = "screen-fried" | "routine-rebuilder" | "overcommitted" | "rest-resistant" | "emotionally-stuck";

interface Question {
  id: number;
  text: string;
  answers: { label: string; score: Record<ResultType, number> }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "When you think about building a new routine, your first feeling is usually:",
    answers: [
      { label: "Excitement, then dread when I think about actually doing it.", score: { "routine-rebuilder": 3, "screen-fried": 1, "overcommitted": 1, "rest-resistant": 0, "emotionally-stuck": 1 } },
      { label: "Exhaustion — I do not have the bandwidth right now.", score: { "overcommitted": 3, "rest-resistant": 2, "routine-rebuilder": 1, "screen-fried": 0, "emotionally-stuck": 1 } },
      { label: "Guilt — I have tried before and disappeared.", score: { "emotionally-stuck": 3, "routine-rebuilder": 2, "rest-resistant": 1, "screen-fried": 0, "overcommitted": 0 } },
      { label: "Skepticism — nothing ever sticks for me.", score: { "routine-rebuilder": 2, "emotionally-stuck": 2, "screen-fried": 1, "overcommitted": 1, "rest-resistant": 0 } },
    ],
  },
  {
    id: 2,
    text: "Your phone is most likely to pull you in when:",
    answers: [
      { label: "I sit down to relax — it is my default decompression.", score: { "screen-fried": 3, "rest-resistant": 1, "routine-rebuilder": 0, "overcommitted": 1, "emotionally-stuck": 1 } },
      { label: "I am bored, waiting, or in a transition moment.", score: { "screen-fried": 3, "routine-rebuilder": 1, "overcommitted": 0, "rest-resistant": 0, "emotionally-stuck": 1 } },
      { label: "I feel overwhelmed and need to escape.", score: { "emotionally-stuck": 2, "overcommitted": 2, "screen-fried": 2, "rest-resistant": 0, "routine-rebuilder": 0 } },
      { label: "I am avoiding something I do not want to start.", score: { "emotionally-stuck": 3, "routine-rebuilder": 1, "screen-fried": 1, "overcommitted": 1, "rest-resistant": 0 } },
    ],
  },
  {
    id: 3,
    text: "When you miss a day of a routine you were building, you usually:",
    answers: [
      { label: "Tell myself I will restart Monday — then Monday comes and goes.", score: { "routine-rebuilder": 3, "emotionally-stuck": 1, "screen-fried": 0, "overcommitted": 1, "rest-resistant": 0 } },
      { label: "Quietly decide the routine was not right for me.", score: { "routine-rebuilder": 2, "emotionally-stuck": 2, "rest-resistant": 1, "screen-fried": 0, "overcommitted": 0 } },
      { label: "Feel guilty for a while, then forget about it.", score: { "emotionally-stuck": 3, "rest-resistant": 1, "routine-rebuilder": 1, "screen-fried": 0, "overcommitted": 1 } },
      { label: "Move on quickly — I have too much else going on.", score: { "overcommitted": 3, "screen-fried": 1, "routine-rebuilder": 0, "rest-resistant": 1, "emotionally-stuck": 0 } },
    ],
  },
  {
    id: 4,
    text: "Rest makes you feel:",
    answers: [
      { label: "Guilty — like I should be doing something productive.", score: { "rest-resistant": 3, "overcommitted": 2, "emotionally-stuck": 1, "screen-fried": 0, "routine-rebuilder": 0 } },
      { label: "Restless — I cannot actually relax without my phone.", score: { "screen-fried": 3, "rest-resistant": 1, "routine-rebuilder": 0, "overcommitted": 1, "emotionally-stuck": 1 } },
      { label: "Nice in theory, hard to access in practice.", score: { "overcommitted": 2, "rest-resistant": 2, "emotionally-stuck": 1, "screen-fried": 1, "routine-rebuilder": 0 } },
      { label: "Like something I have to earn first.", score: { "rest-resistant": 3, "overcommitted": 1, "emotionally-stuck": 1, "screen-fried": 0, "routine-rebuilder": 1 } },
    ],
  },
  {
    id: 5,
    text: "Your Sunday usually looks like:",
    answers: [
      { label: "Planning everything, then feeling behind before Monday starts.", score: { "overcommitted": 3, "rest-resistant": 2, "routine-rebuilder": 1, "screen-fried": 0, "emotionally-stuck": 0 } },
      { label: "Scrolling more than I intended to.", score: { "screen-fried": 3, "routine-rebuilder": 1, "overcommitted": 0, "rest-resistant": 1, "emotionally-stuck": 1 } },
      { label: "Trying to reset but not quite getting there.", score: { "routine-rebuilder": 2, "emotionally-stuck": 2, "rest-resistant": 1, "screen-fried": 1, "overcommitted": 0 } },
      { label: "Avoiding thinking about the week ahead.", score: { "emotionally-stuck": 3, "screen-fried": 1, "rest-resistant": 1, "routine-rebuilder": 1, "overcommitted": 0 } },
    ],
  },
  {
    id: 6,
    text: "The wellness advice that annoys you most is:",
    answers: [
      { label: "\"Just put your phone down.\" — as if that is the whole solution.", score: { "screen-fried": 3, "routine-rebuilder": 1, "overcommitted": 0, "rest-resistant": 0, "emotionally-stuck": 1 } },
      { label: "\"You just need more discipline.\" — I have plenty of discipline, I am just exhausted.", score: { "overcommitted": 3, "rest-resistant": 2, "routine-rebuilder": 1, "screen-fried": 0, "emotionally-stuck": 0 } },
      { label: "\"Start small.\" — I start small and still disappear.", score: { "routine-rebuilder": 3, "emotionally-stuck": 2, "screen-fried": 0, "overcommitted": 1, "rest-resistant": 0 } },
      { label: "\"Rest more.\" — I feel worse when I rest, not better.", score: { "rest-resistant": 3, "emotionally-stuck": 1, "overcommitted": 1, "screen-fried": 0, "routine-rebuilder": 1 } },
    ],
  },
  {
    id: 7,
    text: "The thing that most often crowds out your reset is:",
    answers: [
      { label: "My phone — I reach for it before I even realize I am doing it.", score: { "screen-fried": 3, "routine-rebuilder": 1, "overcommitted": 0, "rest-resistant": 0, "emotionally-stuck": 1 } },
      { label: "My to-do list — there is always something more urgent.", score: { "overcommitted": 3, "rest-resistant": 1, "routine-rebuilder": 1, "screen-fried": 0, "emotionally-stuck": 1 } },
      { label: "My mood — some days I just cannot start.", score: { "emotionally-stuck": 3, "rest-resistant": 1, "routine-rebuilder": 1, "screen-fried": 1, "overcommitted": 0 } },
      { label: "Other people's needs — I run out of time for myself.", score: { "overcommitted": 2, "rest-resistant": 2, "screen-fried": 1, "routine-rebuilder": 1, "emotionally-stuck": 0 } },
    ],
  },
  {
    id: 8,
    text: "When you imagine a realistic reset ritual for yourself, it would be:",
    answers: [
      { label: "Something offline — a walk, a book, tea without my phone.", score: { "screen-fried": 3, "rest-resistant": 1, "routine-rebuilder": 1, "overcommitted": 0, "emotionally-stuck": 0 } },
      { label: "Something tiny — so small I cannot argue with it.", score: { "routine-rebuilder": 3, "emotionally-stuck": 2, "screen-fried": 0, "overcommitted": 1, "rest-resistant": 0 } },
      { label: "Something that protects my time — a stopping point or boundary.", score: { "overcommitted": 3, "rest-resistant": 2, "routine-rebuilder": 0, "screen-fried": 1, "emotionally-stuck": 0 } },
      { label: "Something gentle — that does not require me to feel ready first.", score: { "emotionally-stuck": 3, "rest-resistant": 2, "routine-rebuilder": 1, "screen-fried": 0, "overcommitted": 0 } },
    ],
  },
  {
    id: 9,
    text: "The phrase that feels most true right now is:",
    answers: [
      { label: "\"I know what would help. I just cannot seem to start.\"", score: { "emotionally-stuck": 3, "routine-rebuilder": 2, "rest-resistant": 1, "screen-fried": 0, "overcommitted": 0 } },
      { label: "\"I am so overstimulated I cannot even relax properly.\"", score: { "screen-fried": 3, "overcommitted": 1, "rest-resistant": 1, "routine-rebuilder": 0, "emotionally-stuck": 1 } },
      { label: "\"I keep adding things. I never remove anything.\"", score: { "overcommitted": 3, "rest-resistant": 2, "screen-fried": 0, "routine-rebuilder": 1, "emotionally-stuck": 0 } },
      { label: "\"I start strong and then disappear. Every time.\"", score: { "routine-rebuilder": 3, "emotionally-stuck": 1, "screen-fried": 1, "overcommitted": 1, "rest-resistant": 0 } },
    ],
  },
  {
    id: 10,
    text: "What would make the most difference for you right now?",
    answers: [
      { label: "A realistic way to spend less time on my phone.", score: { "screen-fried": 3, "routine-rebuilder": 1, "overcommitted": 0, "rest-resistant": 0, "emotionally-stuck": 1 } },
      { label: "A way to restart after missing a day without quitting.", score: { "routine-rebuilder": 3, "emotionally-stuck": 2, "screen-fried": 0, "overcommitted": 1, "rest-resistant": 0 } },
      { label: "Permission to rest before I finish everything.", score: { "rest-resistant": 3, "overcommitted": 2, "emotionally-stuck": 1, "screen-fried": 0, "routine-rebuilder": 0 } },
      { label: "A smaller, gentler first step that does not overwhelm me.", score: { "emotionally-stuck": 3, "routine-rebuilder": 1, "rest-resistant": 1, "screen-fried": 1, "overcommitted": 0 } },
    ],
  },
];

function computeResult(answers: number[]): ResultType {
  const totals: Record<ResultType, number> = {
    "screen-fried": 0,
    "routine-rebuilder": 0,
    "overcommitted": 0,
    "rest-resistant": 0,
    "emotionally-stuck": 0,
  };
  answers.forEach((answerIdx, qIdx) => {
    if (answerIdx < 0) return;
    const scores = questions[qIdx].answers[answerIdx].score;
    (Object.keys(scores) as ResultType[]).forEach((k) => {
      totals[k] += scores[k];
    });
  });
  return (Object.keys(totals) as ResultType[]).reduce((a, b) =>
    totals[a] >= totals[b] ? a : b
  );
}

export default function Quiz() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [currentQ, setCurrentQ] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [, navigate] = useLocation();
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progress = (currentQ / questions.length) * 100;
  const allAnswered = currentQ >= questions.length;

  function handleAnswer(qIdx: number, aIdx: number) {
    const updated = [...answers];
    updated[qIdx] = aIdx;
    setAnswers(updated);
    setTimeout(() => {
      if (qIdx + 1 < questions.length) {
        setCurrentQ(qIdx + 1);
        setTimeout(() => {
          questionRefs.current[qIdx + 1]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } else {
        setCurrentQ(questions.length);
      }
    }, 300);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailSubmitted(true);
    const result = computeResult(answers);
    setTimeout(() => navigate(`/result/${result}`), 800);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <Nav />

      {/* Progress bar */}
      <div className="ink-progress mx-0" style={{ position: "sticky", top: 0, zIndex: 10, borderRadius: 0 }}>
        <div className="ink-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 md:px-10 py-12 flex-1">
        {/* Header */}
        <div className="mb-12">
          <img
            src={QUIZ_ILLUSTRATION}
            alt=""
            className="w-20 h-auto mb-6 opacity-70"
            style={{ mixBlendMode: "multiply" }}
          />
          <span className="annotation uppercase tracking-widest mb-3 block" style={{ color: "oklch(0.64 0.09 25)" }}>
            Stubborn Reset Finder
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 600,
              color: "oklch(0.33 0.05 185)",
              marginBottom: "0.75rem",
            }}
          >
            Find Your Stubborn Reset Style
          </h1>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.95rem" }}>
            10 questions · About 3 minutes · No right answers
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-10">
          {questions.map((q, qIdx) => {
            const isVisible = qIdx <= currentQ;
            const isAnswered = answers[qIdx] >= 0;
            return (
              <div
                key={q.id}
                ref={(el) => { questionRefs.current[qIdx] = el; }}
                style={{
                  opacity: isVisible ? (isAnswered && qIdx < currentQ ? 0.45 : 1) : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.5s cubic-bezier(0.23,1,0.32,1), transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                  pointerEvents: isVisible && !isAnswered ? "auto" : "none",
                }}
              >
                <div className="mb-4">
                  <span className="annotation" style={{ color: "oklch(0.64 0.09 25)" }}>
                    {qIdx + 1} / {questions.length}
                  </span>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      color: "oklch(0.33 0.05 185)",
                      marginTop: "0.25rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {q.text}
                  </p>
                </div>
                <div className="space-y-2">
                  {q.answers.map((a, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handleAnswer(qIdx, aIdx)}
                      className={`quiz-answer w-full text-left ${answers[qIdx] === aIdx ? "selected" : ""}`}
                      style={{ display: "block" }}
                    >
                      <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", color: "oklch(0.38 0.05 185)" }}>
                        {a.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Email capture after all answered */}
        {allAnswered && (
          <div
            style={{
              marginTop: "3rem",
              opacity: 1,
              animation: "fadeInUp 0.5s cubic-bezier(0.23,1,0.32,1) both",
            }}
          >
            <div className="ink-divider mb-8" />
            {!emailSubmitted ? (
              <>
                <span className="annotation uppercase tracking-widest mb-3 block" style={{ color: "oklch(0.64 0.09 25)" }}>
                  One last step
                </span>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    color: "oklch(0.33 0.05 185)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Where should I send your result?
                </h2>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", color: "oklch(0.52 0.04 185)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                  Your reset style, first tiny action, and 7-day path will be sent to your inbox.
                  No spam. Unsubscribe anytime.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-sm"
                    style={{
                      border: "1px solid oklch(0.88 0.02 85)",
                      background: "oklch(0.99 0.01 90)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      color: "oklch(0.33 0.05 185)",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95 whitespace-nowrap"
                    style={{
                      background: "oklch(0.33 0.05 185)",
                      color: "oklch(0.98 0.005 90)",
                      fontFamily: "'Nunito Sans', sans-serif",
                      border: "none",
                    }}
                  >
                    See My Result →
                  </button>
                </form>
                <p className="annotation mt-3" style={{ color: "oklch(0.65 0.025 185)" }}>
                  By submitting, you agree to receive your result and occasional gentle nudges from Stubborn Dragonflies.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: "oklch(0.33 0.05 185)" }}>
                  Finding your reset style…
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
