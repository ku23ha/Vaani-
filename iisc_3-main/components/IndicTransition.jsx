import { useState, useEffect } from 'react';

/* Indic script characters from multiple Indian languages */
const INDIC_CHARS = [
  'अ', 'आ', 'इ', 'उ', 'ए', 'ओ', 'क', 'ख', 'ग', 'च', 'ज', 'त', 'द', 'न', 'प', 'म', 'र', 'ल', 'व', 'श', 'स', 'ह',
  'அ', 'ஆ', 'இ', 'உ', 'க', 'ச', 'ட', 'த', 'ப', 'ம',
  'అ', 'ఆ', 'ఇ', 'క', 'గ', 'చ', 'త', 'న', 'ప', 'మ',
  'ಅ', 'ಆ', 'ಇ', 'ಕ', 'ಗ', 'ಚ', 'ನ', 'ಪ', 'ಮ',
  'অ', 'আ', 'ই', 'ক', 'গ', 'চ', 'ত', 'ন', 'প', 'ম',
  'અ', 'આ', 'ક', 'ગ', 'ચ', 'ત', 'ન', 'પ', 'મ',
  'അ', 'ആ', 'ക', 'ച', 'ത', 'ന', 'പ', 'മ',
  'ଅ', 'ଆ', 'କ', 'ଗ', 'ଚ', 'ତ', 'ନ', 'ପ', 'ମ',
];

export default function IndicTransition() {
  const [chars, setChars] = useState([]);

  useEffect(() => {
    const COLORS = ['#FF9933', '#FFFFFF', '#138808', '#FF9933', '#FFFFFF'];
    setChars(
      Array.from({ length: 40 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${2 + Math.random() * 96}%`,
        top: `${5 + Math.random() * 90}%`,
        fontSize: `${16 + Math.random() * 28}px`,
        opacity: 0.10 + Math.random() * 0.22,
        color: COLORS[i % 5],
        delay: `${Math.random() * 6}s`,
        duration: `${4 + Math.random() * 4}s`,
      }))
    );
  }, []);

  return (
    <div
      className="relative overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        height: '160px',
        background: 'linear-gradient(180deg, var(--bg-primary, #000000) 0%, #050505 100%)',
      }}
    >
      <style jsx>{`
        @keyframes indic-float {
          0% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(6px, -4px) rotate(1deg); }
          40% { transform: translate(-4px, 7px) rotate(-1deg); }
          60% { transform: translate(7px, 3px) rotate(2deg); }
          80% { transform: translate(-5px, -5px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .indic-float {
          animation: indic-float infinite ease-in-out;
          display: inline-block;
          will-change: transform;
        }
      `}</style>

      {/* Floating Indic characters with Brownian motion */}
      {chars.map((c, i) => (
        <span
          key={i}
          className="indic-float"
          style={{
            position: 'absolute',
            left: c.left,
            top: c.top,
            fontSize: c.fontSize,
            fontFamily: "'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Bengali', sans-serif",
            fontWeight: 600,
            color: c.color,
            opacity: c.opacity,
            animationDelay: c.delay,
            animationDuration: `${parseFloat(c.duration) * 1.5}s`,
            userSelect: 'none',
          }}
        >
          {c.char}
        </span>
      ))}

      {/* Gentle wave SVG transition */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: '40px' }}
      >
        <path
          d="M0,30 Q180,0 360,30 T720,30 T1080,30 T1440,30 L1440,60 L0,60 Z"
          fill="#FF9933"
          opacity="0.15"
        />
        <path
          d="M0,40 Q240,15 480,40 T960,40 T1440,40 L1440,60 L0,60 Z"
          fill="#138808"
          opacity="0.1"
        />
      </svg>
    </div>
  );
}
