export function RabbiNachmanPortrait() {
  return (
    <svg
      width="180"
      height="220"
      viewBox="0 0 180 220"
      xmlns="http://www.w3.org/2000/svg"
      className="rabbi-portrait"
    >
      {/* Background glow */}
      <defs>
        <radialGradient id="halo" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#f5d77a" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#f5d77a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f5d77a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="robeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c2c54" />
          <stop offset="100%" stopColor="#1a1a3e" />
        </linearGradient>
      </defs>

      {/* Halo / aura */}
      <ellipse cx="90" cy="80" rx="85" ry="85" fill="url(#halo)" />

      {/* Body / Robe */}
      <path
        d="M45 140 Q50 130 65 125 Q90 118 115 125 Q130 130 135 140 L145 220 L35 220 Z"
        fill="url(#robeGrad)"
        stroke="#3d3d6b"
        strokeWidth="1"
      />

      {/* Robe detail - collar */}
      <path
        d="M70 125 Q90 135 110 125"
        fill="none"
        stroke="#4a4a7a"
        strokeWidth="1.5"
      />

      {/* Tzitzit strings */}
      <line x1="55" y1="180" x2="50" y2="220" stroke="#d4d0c8" strokeWidth="1" opacity="0.6" />
      <line x1="57" y1="180" x2="53" y2="220" stroke="#d4d0c8" strokeWidth="1" opacity="0.6" />
      <line x1="125" y1="180" x2="130" y2="220" stroke="#d4d0c8" strokeWidth="1" opacity="0.6" />
      <line x1="123" y1="180" x2="127" y2="220" stroke="#d4d0c8" strokeWidth="1" opacity="0.6" />

      {/* Neck */}
      <rect x="82" y="110" width="16" height="18" rx="4" fill="#e8c99b" />

      {/* Face */}
      <ellipse cx="90" cy="85" rx="32" ry="38" fill="#e8c99b" />

      {/* Kippah */}
      <ellipse cx="90" cy="52" rx="28" ry="12" fill="#1a1a1a" />
      <path
        d="M62 55 Q90 35 118 55"
        fill="#1a1a1a"
        stroke="none"
      />

      {/* Hair / Peyot (sidelocks) */}
      <path
        d="M58 65 Q52 75 50 95 Q48 110 55 120"
        fill="none"
        stroke="#5c3a1e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M56 65 Q50 78 49 98 Q47 115 52 125"
        fill="none"
        stroke="#7a4e2e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M122 65 Q128 75 130 95 Q132 110 125 120"
        fill="none"
        stroke="#5c3a1e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M124 65 Q130 78 131 98 Q133 115 128 125"
        fill="none"
        stroke="#7a4e2e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Beard */}
      <path
        d="M70 100 Q75 105 80 108 Q85 120 90 135 Q95 120 100 108 Q105 105 110 100 Q108 115 105 125 Q100 140 90 148 Q80 140 75 125 Q72 115 70 100 Z"
        fill="#5c3a1e"
        opacity="0.9"
      />
      <path
        d="M73 100 Q78 108 83 112 Q87 125 90 138 Q93 125 97 112 Q102 108 107 100"
        fill="none"
        stroke="#7a4e2e"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Eyes */}
      <ellipse cx="78" cy="82" rx="5" ry="4" fill="white" />
      <ellipse cx="102" cy="82" rx="5" ry="4" fill="white" />
      <circle cx="79" cy="82" r="2.5" fill="#3a2510" />
      <circle cx="103" cy="82" r="2.5" fill="#3a2510" />
      <circle cx="79.5" cy="81.5" r="0.8" fill="white" />
      <circle cx="103.5" cy="81.5" r="0.8" fill="white" />

      {/* Eyebrows */}
      <path d="M72 76 Q78 73 84 76" fill="none" stroke="#5c3a1e" strokeWidth="1.5" />
      <path d="M96 76 Q102 73 108 76" fill="none" stroke="#5c3a1e" strokeWidth="1.5" />

      {/* Nose */}
      <path d="M90 85 Q87 93 88 97 Q90 98 92 97 Q93 93 90 85" fill="none" stroke="#c9a87c" strokeWidth="1.2" />

      {/* Gentle smile under beard */}
      <path d="M83 100 Q90 104 97 100" fill="none" stroke="#c9a87c" strokeWidth="1" opacity="0.5" />

      {/* Book in hands */}
      <rect x="70" y="155" width="40" height="30" rx="3" fill="#8B4513" stroke="#5c3a1e" strokeWidth="1" />
      <line x1="90" y1="155" x2="90" y2="185" stroke="#3d2b1f" strokeWidth="1.5" />
      <rect x="73" y="158" width="14" height="2" rx="1" fill="#d4c5a9" opacity="0.5" />
      <rect x="73" y="163" width="12" height="2" rx="1" fill="#d4c5a9" opacity="0.5" />
      <rect x="73" y="168" width="14" height="2" rx="1" fill="#d4c5a9" opacity="0.5" />
      <rect x="93" y="158" width="14" height="2" rx="1" fill="#d4c5a9" opacity="0.5" />
      <rect x="93" y="163" width="12" height="2" rx="1" fill="#d4c5a9" opacity="0.5" />
      <rect x="93" y="168" width="14" height="2" rx="1" fill="#d4c5a9" opacity="0.5" />

      {/* Hands */}
      <ellipse cx="68" cy="160" rx="8" ry="6" fill="#e8c99b" />
      <ellipse cx="112" cy="160" rx="8" ry="6" fill="#e8c99b" />

      {/* Stars decorating */}
      <circle cx="20" cy="30" r="1.5" fill="#f5d77a" opacity="0.8" />
      <circle cx="160" cy="25" r="1" fill="#f5d77a" opacity="0.6" />
      <circle cx="15" cy="120" r="1" fill="#f5d77a" opacity="0.5" />
      <circle cx="165" cy="100" r="1.5" fill="#f5d77a" opacity="0.7" />
      <circle cx="30" cy="200" r="1" fill="#f5d77a" opacity="0.4" />
      <circle cx="150" cy="195" r="1.2" fill="#f5d77a" opacity="0.5" />
    </svg>
  )
}
