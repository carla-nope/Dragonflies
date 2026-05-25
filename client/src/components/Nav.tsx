/* Nav — Soft Ink design system
   Minimal top nav: wordmark left, links right, ink-stroke underline on active */
import { Link, useLocation } from "wouter";

export default function Nav() {
  const [location] = useLocation();

  return (
    <nav className="w-full py-5 px-6 md:px-10 flex items-center justify-between" style={{ borderBottom: "1px solid oklch(0.88 0.02 85)" }}>
      <Link href="/">
        <span className="flex items-center gap-2 group cursor-pointer">
          <span
            className="text-xl md:text-2xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontStyle: "italic",
              color: "oklch(0.33 0.05 185)",
              letterSpacing: "-0.01em",
            }}
          >
            Stubborn Dragonflies
          </span>
        </span>
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        <NavLink href="/quiz" active={location.startsWith("/quiz") || location.startsWith("/result")}>
          Find Your Style
        </NavLink>
        <NavLink href="/kit" active={location === "/kit"}>
          7-Day Kit
        </NavLink>
        <NavLink href="/waitlist" active={location === "/waitlist"}>
          Join the Club
        </NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href}>
      <span
        className="relative text-sm md:text-base transition-colors duration-200"
        style={{
          fontFamily: "'Nunito Sans', sans-serif",
          fontWeight: active ? 600 : 400,
          color: active ? "oklch(0.33 0.05 185)" : "oklch(0.52 0.04 185)",
          cursor: "pointer",
        }}
      >
        {children}
        {active && (
          <span
            className="absolute bottom-[-2px] left-0 right-0 h-px"
            style={{ background: "oklch(0.64 0.09 25 / 0.6)" }}
          />
        )}
      </span>
    </Link>
  );
}
