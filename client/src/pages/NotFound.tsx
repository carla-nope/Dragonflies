/* NotFound — Soft Ink design system */
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.98 0.005 90)" }}>
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <span
          className="annotation uppercase tracking-widest mb-4 block"
          style={{ color: "oklch(0.64 0.09 25)" }}
        >
          404
        </span>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 600,
            fontStyle: "italic",
            color: "oklch(0.33 0.05 185)",
            marginBottom: "1rem",
          }}
        >
          This page wandered off.
        </h1>
        <p
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            color: "oklch(0.52 0.04 185)",
            marginBottom: "2rem",
            maxWidth: "28rem",
          }}
        >
          Even dragonflies get lost sometimes. Let us find you a better landing spot.
        </p>
        <Link href="/">
          <button
            className="px-7 py-3 text-sm font-semibold transition-all duration-200 active:scale-95"
            style={{
              background: "oklch(0.33 0.05 185)",
              color: "oklch(0.98 0.005 90)",
              fontFamily: "'Nunito Sans', sans-serif",
              border: "none",
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
