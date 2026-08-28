import { useState, useEffect, useRef, type ReactNode } from "react";
import { Instagram, Linkedin, Mail, ChevronDown } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: TylerDigosSite,
  head: () => ({
    meta: [
      { title: "Tyler Digos." },
      { name: "description", content: "Tyler Digos." },
      { property: "og:title", content: "Tyler Digos." },
      { property: "og:description", content: "Tyler Digos." },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Tyler Digos." },
      { name: "twitter:description", content: "Tyler Digos." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

// ─────────────────────────────────────────────
// COLOR TOKENS — edit here to update the palette everywhere
// ─────────────────────────────────────────────

const colors = {
  bg: "#0a0a0a",
  card: "#111110",
  cardBorder: "#232320",
  hairline: "#1e1e1a",
  divider: "#2a2a26",
  cream: "#f2eee0",
  body: "#c9c4b4",
  muted: "#8a8578",
  faint: "#6a6a60",
};

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const aboutText =
  "Tyler Digos is a Canadian sales professional, e-commerce operator, and founder. Tyler is focused on building real, self-funded ventures in fashion and commerce, and sharpening his craft in tech sales at Yotpo.";

const storyText = [
  "Selling has been part of my life since I was a kid. It started with sneakers and streetwear — Supreme, Bape, whatever I could get my hands on before it sold out — flipping pieces long before I understood the word \"resale\" was a business model.",
  "At 16, that turned into something more ambitious: my brother and I started our own cut-and-sew fashion brand, designing and producing our own pieces from scratch. It was scrappy and self-taught, but it's where I first understood what it actually takes to build something — not just sell it.",
  "After high school, I spent time working construction — drywall, through the union. It wasn't glamorous, but it taught me a different kind of discipline, and it's stuck with me since.",
  "From there, I launched my own e-commerce brand in women's fashion, where I learned the full stack of running a DTC business: sourcing, paid acquisition, fulfillment, customer retention — the parts nobody sees on the outside.",
  "Eventually, I brought everything full circle into tech sales, joining Yotpo as a Sales Development Representative — now selling the tools that power the same kind of e-commerce brands I used to run.",
];

const companies = [
  {
    name: "Yotpo — Global Demand Generation",
    logo: null, // set to an image path/URL to use a real logo instead of the initial
    logoInitial: "Y",
    description:
      "Sales Development Representative at Yotpo, an e-commerce and retention marketing platform — selling the tools that power modern DTC brands. Role expanding as scope evolves.",
  },
  {
    name: "Keth Official — Co-Founder",
    logo: null,
    logoInitial: "K",
    description:
      "Co-Founder of Keth Official, a direct-to-consumer fashion brand built and scaled independently — covering sourcing, paid acquisition, and fulfillment from the ground up.",
  },
  {
    name: "Ecommerce & Digital Marketing Specialist",
    logo: null, // drop your icon path/URL here, e.g. "/ecommerce-icon.png"
    logoInitial: "E",
    description:
      "Self-employed, Jan 2024 – Nov 2025 (1 yr 11 mos). Built and managed multiple direct-to-consumer brands from the ground up — overseeing product research, supplier sourcing, store development, Meta ad campaign execution, customer service, and fulfillment logistics. Developed SOPs for each area of the business to ensure smooth, scalable operations.",
  },
];

const quarters = [
  { label: "Q1", value: 117 },
  { label: "Q2", value: 100 },
  { label: "Q3", value: 108, note: "Jul 100% · Aug 117% (in progress)" },
];

const avgAttainment =
  Math.round(
    (quarters.reduce((s, q) => s + q.value, 0) / quarters.length) * 10
  ) / 10;

const ecommerceStats = [
  { label: "Time in Business", value: 23, prefix: "", suffix: " mo", note: "Jan 2024 – Nov 2025" },
  { label: "Total Revenue", value: 262000, prefix: "$", suffix: "", note: "Lifetime, at $50 AOV" },
  { label: "Orders Fulfilled", value: 5240, prefix: "", suffix: "+", note: "Estimated from revenue" },
  { label: "Best Streak", value: 8, prefix: "", suffix: " days", note: "Consecutive $1K+ days" },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setInView(true),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);
  return value;
}

function StatCard({ stat, inView }: { stat: (typeof ecommerceStats)[number]; inView: boolean }) {
  const count = useCountUp(stat.value, inView);
  return (
    <div>
      <div className="text-2xl" style={{ color: colors.cream, ...serif }}>
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-xs mt-1" style={{ color: colors.muted }}>
        {stat.label}
      </div>
      {stat.note && (
        <div className="text-[10px] mt-0.5" style={{ color: colors.faint }}>
          {stat.note}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[11px] uppercase tracking-[0.35em] mb-6"
      style={{ color: colors.muted, ...serif }}
    >
      {children}
    </div>
  );
}

function Bar({ q, i, inView }: { q: (typeof quarters)[number]; i: number; inView: boolean }) {
  const max = 130;
  const h = (q.value / max) * 100;
  return (
    <div className="flex flex-col items-center gap-3 flex-1">
      <div className="text-sm tracking-wider" style={{ color: colors.body }}>
        {q.value}%
      </div>
      <div
        className="relative w-full h-56 flex items-end rounded-sm overflow-hidden"
        style={{ background: colors.card, border: `1px solid ${colors.divider}` }}
      >
        <div
          className="w-full transition-all ease-out"
          style={{
            height: inView ? `${h}%` : "0%",
            transitionDuration: "900ms",
            transitionDelay: `${i * 140}ms`,
            background:
              q.value >= 110
                ? `linear-gradient(180deg, ${colors.cream} 0%, ${colors.body} 100%)`
                : "linear-gradient(180deg, #6b6a60 0%, #4b4a44 100%)",
          }}
        />
        <div
          className="absolute left-0 right-0"
          style={{
            bottom: `${(100 / max) * 100}%`,
            borderTop: "1px dashed #3a3a34",
          }}
        />
      </div>
      <div
        className="text-xs uppercase tracking-[0.2em]"
        style={{ color: colors.muted }}
      >
        {q.label}
      </div>
      {q.note && (
        <div
          className="text-[10px] text-center max-w-[120px]"
          style={{ color: colors.faint }}
        >
          {q.note}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

function TylerDigosSite() {
  const [dashRef, dashInView] = useInView();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#story", label: "Story" },
    { href: "#companies", label: "Experience" },
    { href: "#results", label: "Results" },
    { href: "#contact", label: "Contact" },
  ];

  const linkStyle = { color: colors.muted };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.cream }}>
      <style>{`
        html, body { background-color: ${colors.bg} !important; margin: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; }
        .nav-link:hover { color: ${colors.cream} !important; }
      `}</style>

      {/* STICKY NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-20 backdrop-blur"
        style={{
          background: `${colors.bg}e6`,
          borderBottom: `1px solid ${colors.hairline}`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-lg tracking-wide" style={{ color: colors.cream, ...serif }}>
            T·D
          </div>
          <div
            className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.25em]"
            style={serif}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link transition-colors"
                style={linkStyle}
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col gap-1.5 w-6"
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            <span
              className="h-px transition-transform"
              style={{
                background: colors.cream,
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="h-px transition-opacity"
              style={{ background: colors.cream, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="h-px transition-transform"
              style={{
                background: colors.cream,
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden flex flex-col items-center gap-6 py-8 text-[12px] uppercase tracking-[0.25em]"
            style={{ borderTop: `1px solid ${colors.hairline}`, ...serif, color: colors.muted }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="nav-link transition-colors"
                style={linkStyle}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <header className="relative h-[100vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <img
          src="/hero-photo.jpg"
          alt="Tyler Digos"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        {/* Replace src="/hero-photo.jpg" with your actual photo path/URL */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${colors.bg} 0%, ${colors.bg}4d 60%, ${colors.bg}1a 100%)`,
          }}
        />
        <div className="relative z-10 text-center px-4 w-full">
          <h1
            className="text-[13vw] sm:text-7xl md:text-9xl tracking-[0.03em] whitespace-nowrap leading-none"
            style={{
              color: colors.cream,
              opacity: 0.92,
              mixBlendMode: "overlay",
              ...serif,
            }}
          >
            TYLER DIGOS
          </h1>
        </div>

        <a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-colors animate-bounce nav-link"
          style={linkStyle}
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </header>

      {/* ABOUT */}
      <section
        id="about"
        style={{ scrollMarginTop: "80px", borderBottom: `1px solid ${colors.hairline}` }}
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <SectionLabel>About</SectionLabel>
        <div
          className="rounded-3xl p-5 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start"
          style={{ background: colors.card, border: `1px solid ${colors.cardBorder}` }}
        >
          <div className="w-full md:w-64 aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shrink-0">
            <img
              src="/about-photo.jpg"
              alt="Tyler Digos"
              className="w-full h-full object-cover"
            />
            {/* Replace src="/about-photo.jpg" with your actual photo path/URL */}
          </div>
          <div className="flex-1">
            <h3 className="text-3xl mb-4" style={{ color: colors.cream, ...serif }}>
              About
            </h3>
            <p className="leading-relaxed" style={{ color: colors.body }}>
              {aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        style={{ scrollMarginTop: "80px", borderBottom: `1px solid ${colors.hairline}` }}
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <SectionLabel>Early Life &amp; Story</SectionLabel>
        <div
          className="rounded-3xl p-5 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start"
          style={{ background: colors.card, border: `1px solid ${colors.cardBorder}` }}
        >
          <div className="w-full md:w-64 aspect-[4/5] rounded-2xl overflow-hidden shrink-0">
            <img
              src="/story-photo.jpg"
              alt="Tyler Digos"
              className="w-full h-full object-cover"
              style={{ objectPosition: "top" }}
            />
            {/* Replace src="/story-photo.jpg" with your actual photo path/URL */}
          </div>
          <div className="flex-1">
            <h3 className="text-3xl mb-4" style={{ color: colors.cream, ...serif }}>
              Early Life
            </h3>
            <div className="space-y-4">
              {storyText.map((p, i) => (
                <p key={i} className="leading-relaxed" style={{ color: colors.body }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES / EXPERIENCE GRID */}
      <section
        id="companies"
        style={{ scrollMarginTop: "80px", borderBottom: `1px solid ${colors.hairline}` }}
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <SectionLabel>Experience</SectionLabel>
        <h2 className="text-3xl md:text-4xl mb-14 tracking-wide" style={{ color: colors.cream, ...serif }}>
          Companies
        </h2>
        <div className="flex flex-col gap-6">
          {companies.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              style={{ background: colors.card, border: `1px solid ${colors.cardBorder}` }}
            >
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-3xl shrink-0 overflow-hidden"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.divider}`,
                  color: colors.cream,
                  ...serif,
                }}
              >
                {c.logo ? (
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  c.logoInitial
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl mb-2" style={{ color: colors.cream, ...serif }}>
                  {c.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>
                  {c.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section
        id="results"
        ref={dashRef}
        style={{ scrollMarginTop: "80px", borderBottom: `1px solid ${colors.hairline}` }}
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <SectionLabel>Results</SectionLabel>
        <h2 className="text-3xl md:text-4xl mb-4 tracking-wide" style={{ color: colors.cream, ...serif }}>
          Quota Attainment — Yotpo
        </h2>
        <div className="text-5xl md:text-6xl mb-14" style={{ color: colors.cream, ...serif }}>
          {avgAttainment}%{" "}
          <span
            className="text-sm uppercase tracking-[0.25em] align-middle"
            style={{ color: colors.muted, fontFamily: "'Inter', sans-serif" }}
          >
            Avg. Since Start
          </span>
        </div>

        <div className="flex gap-4 md:gap-10 mb-16 max-w-2xl">
          {quarters.map((q, i) => (
            <Bar key={q.label} q={q} i={i} inView={dashInView} />
          ))}
        </div>

        <h3 className="text-xl mb-8 tracking-wide" style={{ color: colors.cream, ...serif }}>
          E-Commerce Track Record
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {ecommerceStats.map((s) => (
            <StatCard key={s.label} stat={s} inView={dashInView} />
          ))}
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section
        id="contact"
        style={{ scrollMarginTop: "80px" }}
        className="max-w-5xl mx-auto px-6 py-24"
      >
        <SectionLabel>Get in Touch</SectionLabel>
        <h2 className="text-4xl md:text-5xl mb-10 tracking-wide" style={{ color: colors.cream, ...serif }}>
          TYLER DIGOS
        </h2>
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-3 rounded-sm text-sm tracking-wide transition-colors"
            style={{ border: `1px solid ${colors.divider}`, color: colors.cream }}
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-3 rounded-sm text-sm tracking-wide transition-colors"
            style={{ border: `1px solid ${colors.divider}`, color: colors.cream }}
          >
            <Instagram className="w-4 h-4" /> Instagram
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-3 rounded-sm text-sm tracking-wide transition-colors"
            style={{ border: `1px solid ${colors.divider}`, color: colors.cream }}
          >
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
        <div className="text-xs tracking-wide" style={{ color: colors.faint }}>
          © {new Date().getFullYear()} Tyler Digos. All Rights Reserved.
        </div>
      </section>
    </div>
  );
}
