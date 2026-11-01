import React from "react";

export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient background glow behind illustration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff9900]/15 via-transparent to-amber-500/10 rounded-full blur-2xl pointer-events-none transform scale-90" />

      {/* Main SVG Composition */}
      <svg
        viewBox="0 0 480 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[420px] drop-shadow-2xl relative z-10"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="hubOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffaa22" />
            <stop offset="100%" stopColor="#e68a00" />
          </linearGradient>

          <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e26" />
            <stop offset="100%" stopColor="#121217" />
          </linearGradient>

          <linearGradient id="bookCoverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#282834" />
            <stop offset="100%" stopColor="#16161e" />
          </linearGradient>

          <linearGradient id="pageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2c2c36" />
            <stop offset="50%" stopColor="#e2e2e8" />
            <stop offset="100%" stopColor="#2c2c36" />
          </linearGradient>

          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#252530" />
            <stop offset="100%" stopColor="#0e0e12" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floating Background Knowledge Symbols */}
        <g opacity="0.35" className="text-[12px] font-mono font-bold" fill="#ff9900">
          <text x="70" y="80">f(x) = ∫</text>
          <text x="370" y="100">λ → ∞</text>
          <text x="390" y="270">{"</>"}</text>
          <text x="50" y="290">∇ · B = 0</text>
          <text x="230" y="45">∑ e^(iπ) + 1 = 0</text>
        </g>

        {/* Orbit ring / Halo */}
        <ellipse
          cx="240"
          cy="260"
          rx="180"
          ry="65"
          stroke="#ff9900"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.3"
        />

        {/* STACK OF BOOKS (Base of Education) */}
        {/* Book 3 (Bottom) */}
        <g id="bottomBook">
          <path
            d="M 90 270 L 350 270 L 390 295 L 130 295 Z"
            fill="url(#bookCoverGrad)"
            stroke="#2e2e3a"
            strokeWidth="1.5"
          />
          <path
            d="M 130 295 L 390 295 L 390 318 L 130 318 Z"
            fill="#0f0f14"
            stroke="#2e2e3a"
            strokeWidth="1.5"
          />
          {/* Pages */}
          <path
            d="M 90 270 L 130 295 L 130 318 L 90 293 Z"
            fill="#dcdce2"
            stroke="#b8b8c2"
            strokeWidth="1"
          />
          {/* Gold Bookmark Ribbon */}
          <path
            d="M 230 295 L 245 295 L 250 340 L 237 332 L 225 340 Z"
            fill="url(#hubOrangeGrad)"
            filter="url(#softGlow)"
          />
        </g>

        {/* Book 2 (Middle, slightly angled) */}
        <g id="middleBook" transform="rotate(-3 240 240)">
          <path
            d="M 105 235 L 365 235 L 385 260 L 125 260 Z"
            fill="url(#bookCoverAccent)"
            stroke="#383848"
            strokeWidth="1.5"
          />
          <path
            d="M 125 260 L 385 260 L 385 280 L 125 280 Z"
            fill="#14141a"
            stroke="#383848"
            strokeWidth="1.5"
          />
          <path
            d="M 105 235 L 125 260 L 125 280 L 105 255 Z"
            fill="#e2e2ea"
            stroke="#b8b8c2"
            strokeWidth="1"
          />
        </g>

        {/* Book 1 (Top Open Textbook with Page Curvature) */}
        <g id="topBook">
          {/* Left Page */}
          <path
            d="M 240 205 C 200 195 150 200 115 210 L 115 240 C 150 230 200 225 240 235 Z"
            fill="#e8e8ee"
            stroke="#2b2b36"
            strokeWidth="1"
          />
          {/* Right Page */}
          <path
            d="M 240 205 C 280 195 330 200 365 210 L 365 240 C 330 230 280 225 240 235 Z"
            fill="#dedee6"
            stroke="#2b2b36"
            strokeWidth="1"
          />
          {/* Spine center shadow */}
          <path d="M 239 205 L 241 205 L 241 235 L 239 235 Z" fill="#9999a4" />

          {/* Book Content Lines (Text representation) */}
          <line x1="140" y1="214" x2="220" y2="210" stroke="#7e7e8c" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="222" x2="210" y2="218" stroke="#7e7e8c" strokeWidth="2" strokeLinecap="round" />
          <line x1="140" y1="230" x2="195" y2="226" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" />

          <line x1="260" y1="210" x2="340" y2="214" stroke="#7e7e8c" strokeWidth="2" strokeLinecap="round" />
          <line x1="260" y1="218" x2="330" y2="222" stroke="#7e7e8c" strokeWidth="2" strokeLinecap="round" />
          <line x1="260" y1="226" x2="310" y2="230" stroke="#7e7e8c" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* GRADUATION CAP (Academic Mastery) */}
        <g id="graduationCap" transform="translate(10, -25)">
          {/* Cap Skull/Base */}
          <path
            d="M 200 135 C 200 160 280 160 280 135 Z"
            fill="#121218"
            stroke="#2e2e3c"
            strokeWidth="1.5"
          />

          {/* Diamond Top Mortarboard */}
          <polygon
            points="240,75 345,115 240,145 135,115"
            fill="url(#capGrad)"
            stroke="#ff9900"
            strokeWidth="2"
          />

          {/* Center Button on Cap */}
          <ellipse cx="240" cy="115" rx="5" ry="3" fill="#ff9900" />

          {/* Tassel String & Pendant */}
          <path
            d="M 240 115 C 275 120 310 145 320 180"
            stroke="#ff9900"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <polygon
            points="317,180 323,180 326,200 314,200"
            fill="url(#hubOrangeGrad)"
            filter="url(#softGlow)"
          />
        </g>

        {/* FLOATING PLAY-BUTTON BADGE (Streaming Education Concept) */}
        <g id="playButtonConcept" transform="translate(290, 110)">
          {/* Subtle glow circle */}
          <circle cx="50" cy="50" r="44" fill="#ff9900" opacity="0.15" filter="url(#softGlow)" />

          {/* Main Dark Glass Orb */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="#121218"
            stroke="url(#hubOrangeGrad)"
            strokeWidth="2.5"
          />

          {/* Play Triangle Symbol (Warm Orange) */}
          <polygon
            points="44,36 64,50 44,64"
            fill="url(#hubOrangeGrad)"
          />

          {/* Live / Verified Badge Dot */}
          <circle cx="76" cy="24" r="5" fill="#38bdf8" />
          <circle cx="76" cy="24" r="5" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* Small floating sparkles/stars */}
        <g fill="#ff9900">
          <polygon points="120,130 123,137 130,140 123,143 120,150 117,143 110,140 117,137" opacity="0.75" />
          <polygon points="360,70 362,75 367,77 362,79 360,84 358,79 353,77 358,75" opacity="0.7" />
          <circle cx="100" cy="220" r="2.5" opacity="0.5" />
          <circle cx="380" cy="210" r="3" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
