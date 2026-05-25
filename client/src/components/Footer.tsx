/* Footer — Soft Ink design system
   Minimal footer with disclaimer, links, and brand note */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      className="w-full py-10 px-6 md:px-10 mt-20"
      style={{ borderTop: "1px solid oklch(0.88 0.02 85)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "oklch(0.33 0.05 185)",
              }}
            >
              Stubborn Dragonflies
            </span>
            <p
              className="mt-1 text-xs max-w-xs"
              style={{ color: "oklch(0.60 0.03 185)", fontFamily: "'Nunito Sans', sans-serif" }}
            >
              Tiny resets for stubborn humans. Wellness education only — not medical, therapeutic, or crisis support.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm" style={{ color: "oklch(0.52 0.04 185)" }}>
            <Link href="/quiz">
              <span className="hover:underline cursor-pointer">Find Your Reset Style</span>
            </Link>
            <Link href="/kit">
              <span className="hover:underline cursor-pointer">7-Day Stubborn Reset Kit</span>
            </Link>
            <Link href="/waitlist">
              <span className="hover:underline cursor-pointer">Dragonfly Reset Club</span>
            </Link>
          </div>
        </div>

        <div className="ink-divider mt-8 mb-4" />

        <p
          className="text-xs"
          style={{ color: "oklch(0.65 0.025 185)", fontFamily: "'Courier Prime', monospace" }}
        >
          © {new Date().getFullYear()} Stubborn Dragonflies. Wellness education only. If you need clinical care or are in crisis, please contact a qualified professional.
        </p>
      </div>
    </footer>
  );
}
