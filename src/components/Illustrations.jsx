/* ─────────────────────────────────────────
   Inline SVG illustrations for SpeakEats
───────────────────────────────────────── */

export function RamenBowl() {
  return (
    <svg
      className="deco-food deco-food-left"
      viewBox="0 0 110 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Steam wisps */}
      <path d="M38 28 Q41 20 38 12 Q35 5 38 0" stroke="#d4902a" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
      <path d="M55 24 Q58 15 55 7 Q52 0 55 -4" stroke="#9A7828" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.38" />
      <path d="M72 28 Q75 19 72 11 Q69 4 72 0" stroke="#d4902a" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.32" />

      {/* Bowl outer */}
      <path d="M12 58 Q14 98 55 106 Q96 98 98 58 Z" fill="#E8C98A" />
      {/* Bowl inner (broth) */}
      <ellipse cx="55" cy="58" rx="43" ry="14" fill="#D4902A" opacity="0.9" />
      {/* Broth surface sheen */}
      <ellipse cx="45" cy="55" rx="18" ry="5" fill="rgba(255,255,255,0.15)" />

      {/* Noodle strands */}
      <path d="M28 54 Q36 48 44 54 Q52 60 60 54 Q68 48 76 54" stroke="#F5E6C0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
      <path d="M22 58 Q30 52 38 58 Q46 64 54 58 Q62 52 70 58 Q78 64 86 58" stroke="#F5E6C0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />

      {/* Toppings */}
      {/* Egg half */}
      <ellipse cx="42" cy="53" rx="10" ry="7" fill="#FEF0C0" />
      <ellipse cx="42" cy="53" rx="5" ry="4" fill="#D4902A" opacity="0.85" />
      {/* Nori slice */}
      <rect x="64" y="48" width="5" height="14" rx="1.5" fill="#2a3520" opacity="0.85" />
      {/* Green onion dots */}
      <circle cx="72" cy="54" r="2.5" fill="#4d6128" opacity="0.8" />
      <circle cx="78" cy="56" r="2" fill="#4d6128" opacity="0.7" />
      <circle cx="30" cy="56" r="2" fill="#4d6128" opacity="0.7" />

      {/* Bowl rim */}
      <ellipse cx="55" cy="58" rx="43" ry="14" stroke="#C8A55A" strokeWidth="2" fill="none" />
      {/* Bowl base */}
      <ellipse cx="55" cy="104" rx="22" ry="5" fill="#C8A55A" opacity="0.6" />

      {/* Bowl decoration band */}
      <path d="M14 68 Q14 78 55 84 Q96 78 96 68" stroke="#C8A55A" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Dot pattern on bowl */}
      <circle cx="30" cy="74" r="2" fill="#C8A55A" opacity="0.4" />
      <circle cx="55" cy="82" r="2" fill="#C8A55A" opacity="0.4" />
      <circle cx="80" cy="74" r="2" fill="#C8A55A" opacity="0.4" />
    </svg>
  )
}

export function GarlicBulb() {
  return (
    <svg
      className="deco-food deco-food-right"
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Papery stem */}
      <path d="M40 28 Q38 18 40 10 Q42 4 40 0" stroke="#8B7355" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* Side stem wisps */}
      <path d="M40 22 Q48 16 52 10" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
      <path d="M40 20 Q32 14 28 8" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />

      {/* Outer papery wrapper */}
      <path d="M40 28 Q14 32 12 62 Q14 90 40 96 Q66 90 68 62 Q66 32 40 28 Z" fill="#F5EFE0" />
      {/* Papery texture lines */}
      <path d="M40 28 Q26 38 24 62 Q26 80 40 88" stroke="#E0D5BF" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M40 28 Q54 38 56 62 Q54 80 40 88" stroke="#E0D5BF" strokeWidth="1" fill="none" opacity="0.7" />

      {/* Clove divisions — raised ridges */}
      <path d="M40 32 Q34 46 36 64 Q38 78 40 86" stroke="#D5C9A8" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M40 32 Q46 46 44 64 Q42 78 40 86" stroke="#D5C9A8" strokeWidth="2" fill="none" opacity="0.8" />

      {/* Left clove bump */}
      <path d="M26 50 Q18 58 22 70 Q28 80 38 82" stroke="#C8B898" strokeWidth="1.5" fill="none" opacity="0.6" />
      {/* Right clove bump */}
      <path d="M54 50 Q62 58 58 70 Q52 80 42 82" stroke="#C8B898" strokeWidth="1.5" fill="none" opacity="0.6" />

      {/* Root base */}
      <ellipse cx="40" cy="93" rx="16" ry="5" fill="#D5C9A8" opacity="0.8" />
      {/* Root hairs */}
      <path d="M30 94 Q28 100 26 104" stroke="#C8B898" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M36 96 Q35 103 34 108" stroke="#C8B898" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M44 96 Q45 103 46 108" stroke="#C8B898" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M50 94 Q52 100 54 104" stroke="#C8B898" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Highlight on bulb */}
      <ellipse cx="32" cy="48" rx="6" ry="9" fill="rgba(255,255,255,0.22)" transform="rotate(-10 32 48)" />
    </svg>
  )
}

export function SmallPlant() {
  return (
    <svg
      className="deco-small-plant"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M16 56 L19 72 Q30 78 41 72 L44 56 Z" fill="#c4563a" />
      <rect x="12" y="50" width="36" height="9" rx="4.5" fill="#d96b4a" />
      <ellipse cx="30" cy="56" rx="16" ry="4" fill="#4a2410" />
      {/* two herb stems */}
      <path d="M30 54 Q28 44 26 36" stroke="#4d6128" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M30 54 Q32 40 36 30" stroke="#4d6128" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* leaves */}
      <ellipse cx="24" cy="32" rx="7" ry="5" fill="#7aa33c" transform="rotate(-20 24 32)" />
      <ellipse cx="37" cy="26" rx="7" ry="5" fill="#6a8a38" transform="rotate(25 37 26)" />
      <ellipse cx="20" cy="42" rx="6" ry="4" fill="#8aad82" transform="rotate(-35 20 42)" />
    </svg>
  )
}

export function SteamWaves() {
  return (
    <svg
      className="deco-steam"
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 38 Q14 28 10 18 Q6 8 10 0"
        stroke="#d4902a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M30 38 Q34 25 30 15 Q26 5 30 0"
        stroke="#c4563a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M50 38 Q54 28 50 18 Q46 8 50 0"
        stroke="#d4902a"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  )
}

export function HiddenCat({ style, className }) {
  return (
    <svg
      className={className || "hidden-cat"}
      style={style}
      viewBox="0 0 140 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="A sleeping cat"
      role="img"
    >
      {/* body blob */}
      <ellipse cx="78" cy="64" rx="52" ry="24" fill="#d4902a" />
      {/* head */}
      <circle cx="30" cy="52" r="22" fill="#d4902a" />
      {/* ear left */}
      <path d="M12 36 L18 18 L28 34" fill="#d4902a" />
      <path d="M15 35 L19 22 L26 33" fill="#f5b05a" />
      {/* ear right */}
      <path d="M28 32 L36 16 L42 32" fill="#d4902a" />
      <path d="M30 32 L36 20 L40 31" fill="#f5b05a" />
      {/* face – eyes closed (sleeping) */}
      <path d="M20 50 Q24 55 28 50" stroke="#6b2a10" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M32 50 Q36 55 40 50" stroke="#6b2a10" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* nose */}
      <path d="M28 57 L30 54 L32 57 Q30 60 28 57 Z" fill="#e07455" />
      {/* whiskers */}
      <line x1="4" y1="54" x2="22" y2="56" stroke="#6b2a10" strokeWidth="1.2" opacity="0.5" />
      <line x1="4" y1="59" x2="22" y2="58" stroke="#6b2a10" strokeWidth="1.2" opacity="0.5" />
      <line x1="38" y1="56" x2="56" y2="54" stroke="#6b2a10" strokeWidth="1.2" opacity="0.5" />
      <line x1="38" y1="58" x2="56" y2="59" stroke="#6b2a10" strokeWidth="1.2" opacity="0.5" />
      {/* tabby stripes on body */}
      <path d="M50 58 Q58 52 66 58" stroke="#b87820" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M72 56 Q80 50 88 56" stroke="#b87820" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M94 58 Q102 52 110 58" stroke="#b87820" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* tail */}
      <path d="M128 54 Q140 38 132 26 Q126 18 120 28 Q116 36 122 44" stroke="#d4902a" strokeWidth="10" strokeLinecap="round" fill="none" />
      {/* tail tip */}
      <circle cx="120" cy="28" r="7" fill="#f5b05a" />
      {/* tiny zzz */}
      <text x="44" y="30" fontSize="11" fill="#c49a3a" opacity="0.75" fontFamily="serif" fontStyle="italic">z</text>
      <text x="52" y="22" fontSize="9" fill="#c49a3a" opacity="0.55" fontFamily="serif" fontStyle="italic">z</text>
      <text x="58" y="15" fontSize="7" fill="#c49a3a" opacity="0.4" fontFamily="serif" fontStyle="italic">z</text>
    </svg>
  )
}

export function BigBellyEater() {
  return (
    <svg
      viewBox="0 0 280 265"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="illu-big-belly"
      aria-label="A joyful person happily eating ribs with sauce on their face, totally unbothered"
      role="img"
    >
      {/* ── Legs ── */}
      <rect x="104" y="228" width="24" height="28" rx="12" fill="#3d2010" />
      <rect x="152" y="228" width="24" height="28" rx="12" fill="#3d2010" />
      {/* Shoes */}
      <ellipse cx="116" cy="258" rx="17" ry="8" fill="#2a1808" />
      <ellipse cx="164" cy="258" rx="17" ry="8" fill="#2a1808" />

      {/* ── Big belly (terracotta shirt) ── */}
      <ellipse cx="140" cy="188" rx="72" ry="56" fill="#c4563a" />
      {/* shirt highlight — roundness */}
      <ellipse cx="122" cy="168" rx="34" ry="24" fill="rgba(255,255,255,0.09)" />
      {/* belly button */}
      <ellipse cx="140" cy="198" rx="6" ry="5" fill="rgba(0,0,0,0.13)" />

      {/* ── Left arm (skin, reaching toward ribs) ── */}
      <path d="M76 162 Q42 170 16 196" stroke="#c87941" strokeWidth="28" strokeLinecap="round" fill="none" />
      {/* ── Rib rack in left hand ── */}
      {/* Meat slab */}
      <rect x="0" y="186" width="48" height="26" rx="6" fill="#8B4513" />
      {/* Glaze / top meat layer */}
      <rect x="0" y="180" width="48" height="14" rx="7" fill="#b04e24" />
      {/* Rib bones */}
      {[9, 19, 29, 39].map((x, i) => (
        <line key={i} x1={x} y1="186" x2={x} y2="212" stroke="#e8c84a" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* Sauce gloss on ribs */}
      <rect x="4" y="182" width="14" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />

      {/* ── Right arm (skin, holding chicken wing) ── */}
      <path d="M204 162 Q238 170 264 196" stroke="#c87941" strokeWidth="28" strokeLinecap="round" fill="none" />
      {/* ── Chicken wing in right hand ── */}
      {/* drum piece */}
      <ellipse cx="264" cy="196" rx="17" ry="11" fill="#d4902a" transform="rotate(-30 264 196)" />
      {/* flat piece */}
      <ellipse cx="272" cy="183" rx="13" ry="8" fill="#e8b040" transform="rotate(-30 272 183)" />
      {/* bone tip */}
      <circle cx="277" cy="172" r="5" fill="#fef9f0" />
      <line x1="277" y1="174" x2="279" y2="165" stroke="#d4c080" strokeWidth="2.5" strokeLinecap="round" />

      {/* ── Neck ── */}
      <rect x="128" y="112" width="24" height="22" rx="10" fill="#c87941" />

      {/* ── Head ── */}
      <circle cx="140" cy="78" r="46" fill="#c87941" />

      {/* ── Ears ── */}
      <circle cx="96" cy="80" r="16" fill="#c87941" />
      <circle cx="184" cy="80" r="16" fill="#c87941" />
      <circle cx="96" cy="80" r="10" fill="#b06830" />
      <circle cx="184" cy="80" r="10" fill="#b06830" />

      {/* ── Face ── */}
      {/* Blissful half-lidded eyes — arcs curving DOWN = happy squint */}
      <circle cx="120" cy="76" r="12" fill="white" />
      <circle cx="160" cy="76" r="12" fill="white" />
      <circle cx="120" cy="80" r="5" fill="#3d2010" />
      <circle cx="160" cy="80" r="5" fill="#3d2010" />
      {/* Eyelid covers top — unbothered look */}
      <path d="M108 76 Q120 67 132 76" fill="#c87941" />
      <path d="M148 76 Q160 67 172 76" fill="#c87941" />
      {/* Eyelid crease */}
      <path d="M108 76 Q120 68 132 76" stroke="#b06830" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M148 76 Q160 68 172 76" stroke="#b06830" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* Nose */}
      <ellipse cx="140" cy="88" rx="6" ry="5" fill="#b06830" />

      {/* Rosy cheeks */}
      <ellipse cx="106" cy="94" rx="14" ry="10" fill="#e07455" opacity="0.42" />
      <ellipse cx="174" cy="94" rx="14" ry="10" fill="#e07455" opacity="0.42" />

      {/* Big unbothered grin with teeth showing */}
      <path d="M112 100 Q140 122 168 100" stroke="#3d2010" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M114 102 Q140 120 166 102 Q140 112 114 102 Z" fill="white" opacity="0.95" />

      {/* ── Sauce drips (the unbothered part) ── */}
      {/* Left cheek sauce drip */}
      <path d="M103 97 Q100 108 102 120 Q105 114 107 122 Q109 114 107 106 Z" fill="#e53e3e" opacity="0.9" />
      {/* Chin sauce */}
      <path d="M134 118 Q131 132 133 145 Q136 138 138 148 Q140 138 139 130 Q137 124 134 118 Z" fill="#e53e3e" opacity="0.92" />
      {/* Right cheek dab */}
      <path d="M172 99 Q175 108 173 116 Q170 110 168 114 Z" fill="#e53e3e" opacity="0.82" />
      {/* Sauce splatter dots */}
      <circle cx="118" cy="64" r="4.5" fill="#e53e3e" opacity="0.75" />
      <circle cx="155" cy="60" r="3.5" fill="#e53e3e" opacity="0.65" />
      <circle cx="107" cy="58" r="2.5" fill="#e53e3e" opacity="0.55" />
      <circle cx="165" cy="68" r="2" fill="#e53e3e" opacity="0.5" />

      {/* Sweat drop — from the heat of the ribs, still unbothered */}
      <path d="M188 46 Q190 39 186 37 Q182 39 184 46 Z" fill="#5b9bd5" opacity="0.6" />
    </svg>
  )
}

export function StretchDollar() {
  return (
    <svg
      viewBox="0 0 300 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="illu-stretch-dollar"
      aria-label="A dollar bill stretching like taffy down a grocery aisle with a cart full of budget staples"
      role="img"
    >
      {/* ── Grocery aisle shelves (background) ── */}
      {/* Left shelf post */}
      <rect x="0" y="0" width="5" height="175" fill="#b09060" opacity="0.2" />
      {/* Left shelves */}
      {[18, 48, 78, 108].map((y, i) => (
        <rect key={i} x="0" y={y} width="28" height="8" rx="2" fill="#c8a870" opacity="0.35" />
      ))}
      {/* Left shelf items */}
      <rect x="2" y="8" width="11" height="10" rx="2" fill="#c4563a" opacity="0.45" />
      <rect x="15" y="8" width="11" height="10" rx="2" fill="#d4902a" opacity="0.45" />
      <rect x="2" y="38" width="11" height="10" rx="2" fill="#4d6128" opacity="0.45" />
      <rect x="15" y="38" width="11" height="10" rx="2" fill="#c4563a" opacity="0.45" />
      <rect x="2" y="68" width="11" height="10" rx="2" fill="#d4902a" opacity="0.4" />
      <rect x="15" y="68" width="11" height="10" rx="2" fill="#8B4513" opacity="0.4" />
      {/* Right shelf post */}
      <rect x="295" y="0" width="5" height="175" fill="#b09060" opacity="0.2" />
      {/* Right shelves */}
      {[18, 48, 78, 108].map((y, i) => (
        <rect key={i} x="272" y={y} width="28" height="8" rx="2" fill="#c8a870" opacity="0.35" />
      ))}
      {/* Right shelf items */}
      <rect x="275" y="8" width="11" height="10" rx="2" fill="#d4902a" opacity="0.45" />
      <rect x="288" y="8" width="11" height="10" rx="2" fill="#4d6128" opacity="0.45" />
      <rect x="275" y="38" width="11" height="10" rx="2" fill="#c4563a" opacity="0.45" />
      <rect x="288" y="38" width="11" height="10" rx="2" fill="#d4902a" opacity="0.45" />
      <rect x="275" y="68" width="11" height="10" rx="2" fill="#4d6128" opacity="0.4" />
      <rect x="288" y="68" width="11" height="10" rx="2" fill="#c4563a" opacity="0.4" />
      {/* Aisle floor line */}
      <line x1="0" y1="175" x2="300" y2="175" stroke="#e8d5b0" strokeWidth="1.5" opacity="0.35" />

      {/* ── Dollar bill — taffy stretched left arm ── */}
      {/* Left taffy arm — pinches thin at middle, wide at bill */}
      <path
        d="M78 52 Q60 46 44 52 Q30 56 18 50 Q12 58 18 66 Q30 70 44 66 Q60 72 78 68 Z"
        fill="#3d5020"
      />
      {/* Taffy texture lines on left arm */}
      <path d="M78 56 Q56 52 34 54" stroke="#4d6128" strokeWidth="1" opacity="0.4" fill="none" />
      <path d="M78 64 Q56 66 34 64" stroke="#4d6128" strokeWidth="1" opacity="0.4" fill="none" />

      {/* ── Dollar bill — taffy stretched right arm ── */}
      <path
        d="M222 52 Q240 46 256 52 Q270 56 282 50 Q288 58 282 66 Q270 70 256 66 Q240 72 222 68 Z"
        fill="#3d5020"
      />
      {/* Taffy texture lines on right arm */}
      <path d="M222 56 Q244 52 266 54" stroke="#4d6128" strokeWidth="1" opacity="0.4" fill="none" />
      <path d="M222 64 Q244 66 266 64" stroke="#4d6128" strokeWidth="1" opacity="0.4" fill="none" />

      {/* ── Dollar bill main body ── */}
      <rect x="74" y="24" width="152" height="82" rx="10" fill="#4d6128" />
      {/* Bill border detail */}
      <rect x="78" y="28" width="144" height="74" rx="8" stroke="#7aa33c" strokeWidth="1.5" fill="none" opacity="0.55" />
      {/* Inner ornate border */}
      <rect x="84" y="34" width="132" height="62" rx="6" stroke="#7aa33c" strokeWidth="0.75" fill="none" opacity="0.3" />

      {/* ── Bill face — determined budget warrior ── */}
      <ellipse cx="150" cy="65" rx="38" ry="28" fill="#3d5020" opacity="0.5" />
      {/* Eyes — wide open, locked in */}
      <circle cx="135" cy="60" r="10" fill="#fef9f0" />
      <circle cx="165" cy="60" r="10" fill="#fef9f0" />
      <circle cx="137" cy="62" r="5" fill="#3d2010" />
      <circle cx="167" cy="62" r="5" fill="#3d2010" />
      {/* Eye shine */}
      <circle cx="139" cy="60" r="2" fill="white" />
      <circle cx="169" cy="60" r="2" fill="white" />
      {/* Determined brows */}
      <path d="M125 50 Q135 45 145 50" stroke="#fef9f0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M155 50 Q165 45 175 50" stroke="#fef9f0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      {/* Clenched grin — I got this */}
      <path d="M132 76 Q150 86 168 76" stroke="#fef9f0" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M134 77 Q150 85 166 77 Q150 82 134 77 Z" fill="#fef9f0" opacity="0.3" />

      {/* Bill typography / decoration */}
      <text x="88" y="40" fontSize="7" fill="#7aa33c" opacity="0.55" letterSpacing="1.5">THE STRETCH</text>
      <text x="96" y="94" fontSize="7" fill="#7aa33c" opacity="0.55" letterSpacing="1.5">BUDGET INC.</text>
      <text x="150" y="50" fontSize="14" fill="#fef9f0" opacity="0.6" textAnchor="middle" fontWeight="bold" fontFamily="serif">$</text>

      {/* ── Sweat drops ── bill is working hard ── */}
      <path d="M248 32 Q250 25 246 23 Q242 25 244 32 Z" fill="#5b9bd5" opacity="0.7" />
      <path d="M58 35 Q60 28 56 26 Q52 28 54 35 Z" fill="#5b9bd5" opacity="0.6" />

      {/* ── Grocery cart ── */}
      {/* Cart basket */}
      <rect x="98" y="120" width="108" height="52" rx="4" stroke="#8B6040" strokeWidth="2.5" fill="#f5e8d0" />
      {/* Cart grid lines */}
      {[122, 146, 170].map((x, i) => (
        <line key={i} x1={x} y1="120" x2={x} y2="172" stroke="#8B6040" strokeWidth="1.5" opacity="0.35" />
      ))}
      <line x1="98" y1="146" x2="206" y2="146" stroke="#8B6040" strokeWidth="1.5" opacity="0.35" />

      {/* Cart items — front row */}
      {/* Ramen pack 1 */}
      <rect x="101" y="124" width="19" height="20" rx="2" fill="#c4563a" />
      <line x1="101" y1="130" x2="120" y2="130" stroke="#fef9f0" strokeWidth="1" opacity="0.4" />
      <text x="110" y="140" fontSize="5" fill="#fef9f0" textAnchor="middle" opacity="0.6">RAMEN</text>
      {/* Ramen pack 2 */}
      <rect x="124" y="123" width="19" height="21" rx="2" fill="#d4902a" />
      <text x="133" y="137" fontSize="5" fill="#fef9f0" textAnchor="middle" opacity="0.6">NOODLE</text>
      {/* Lentil can */}
      <rect x="148" y="122" width="16" height="24" rx="3" fill="#4d6128" />
      <ellipse cx="156" cy="122" rx="8" ry="3.5" fill="#6a8a38" />
      <text x="156" y="136" fontSize="5" fill="#fef9f0" textAnchor="middle" opacity="0.6">LENTILS</text>
      {/* Bean can */}
      <rect x="168" y="123" width="16" height="23" rx="3" fill="#8B4513" />
      <ellipse cx="176" cy="123" rx="8" ry="3.5" fill="#a05025" />
      {/* Another ramen — back row */}
      <rect x="102" y="148" width="20" height="14" rx="2" fill="#d4902a" opacity="0.7" />
      <rect x="126" y="148" width="18" height="14" rx="2" fill="#c4563a" opacity="0.7" />
      <rect x="148" y="148" width="16" height="14" rx="2" fill="#4d6128" opacity="0.7" />
      <rect x="168" y="149" width="18" height="13" rx="2" fill="#d4902a" opacity="0.65" />
      <rect x="190" y="124" width="14" height="22" rx="2" fill="#c4563a" opacity="0.7" />

      {/* Cart frame */}
      <path d="M98 172 L84 196" stroke="#8B6040" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M206 172 L206 196" stroke="#8B6040" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cart handle */}
      <path d="M200 120 Q218 106 224 92" stroke="#8B6040" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cart wheels */}
      <circle cx="86" cy="198" r="11" stroke="#8B6040" strokeWidth="2.5" fill="#f5e8d0" />
      <circle cx="86" cy="198" r="4.5" fill="#8B6040" />
      <circle cx="208" cy="198" r="11" stroke="#8B6040" strokeWidth="2.5" fill="#f5e8d0" />
      <circle cx="208" cy="198" r="4.5" fill="#8B6040" />
    </svg>
  )
}

export function ChefKnife() {
  return (
    <svg
      className="deco-utensils"
      viewBox="0 0 36 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Blade */}
      <path d="M18 6 L28 14 L22 64 L14 64 Z" fill="#B8BCC4" />
      {/* Blade bevel / edge highlight */}
      <path d="M22 14 L26 18 L20 62" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Blade spine */}
      <path d="M18 6 L22 64" stroke="#8A8E96" strokeWidth="1" fill="none" opacity="0.7" />
      {/* Bolster */}
      <rect x="12" y="62" width="12" height="5" rx="1.5" fill="#6B6F78" />
      {/* Handle — walnut tone */}
      <rect x="13" y="67" width="10" height="10" rx="2" fill="#6B3A2A" />
      <rect x="13" y="67" width="10" height="3" rx="1" fill="#7D4535" opacity="0.7" />
      {/* Rivets */}
      <circle cx="18" cy="70" r="1.4" fill="#8A6040" opacity="0.8" />
      <circle cx="18" cy="74" r="1.4" fill="#8A6040" opacity="0.8" />
    </svg>
  )
}
