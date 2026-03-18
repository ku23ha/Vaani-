import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

/**
 * SectionDivider — Premium voice-tech themed transition between sections.
 *
 * Variants:
 *   "gradient"  — Animated soundwave lines with gradient fade
 *   "dots"      — Floating Indic script particles with subtle wave
 *   "glow"      — Pulsing audio-visualizer glow orb
 */

const INDIC_CHARS = [
  'अ', 'आ', 'इ', 'क', 'ग', 'त', 'म', 'व',
  'அ', 'க', 'ம', 'ప', 'క', 'ಕ', 'অ', 'ক',
  'અ', 'ക', 'ଅ', 'ਅ',
];

export default function SectionDivider({
  variant = 'gradient',
  colorFrom = '#FFFFFF',
  colorTo = '#FFFFFF',
  height = 80,
  flip = false,
  accent = '#42A5F5',
}) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{
        height: `${height}px`,
        backgroundColor: 'transparent'
      }}
    >
      {variant === 'gradient' && <SoundwaveVariant inView={inView} accent={accent} />}
      {variant === 'dots' && <ParticleVariant inView={inView} accent={accent} />}
      {variant === 'glow' && <PulseVariant inView={inView} accent={accent} />}
      {variant === 'voiceflow' && <VoiceflowVariant inView={inView} accent={accent} />}
    </div>
  );
}

/* ─── Voiceflow: Euphonia-inspired layered flowing sine waves ─── */
function VoiceflowVariant({ inView, accent }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${10 + (i * 8) % 80}%`,
        size: 14 + (i % 3) * 4,
        delay: i * 0.2,
        duration: 4 + (i % 4) * 2,
        yOffset: (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 5),
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 100">
        <defs>
          <linearGradient id="flow-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF9933" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flow-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flow-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#138808" stopOpacity="0" />
            <stop offset="50%" stopColor="#138808" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#138808" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flow-grad-4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF9933" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 5 Layered Animated Paths */}
        {[
          { id: 1, d: "M0,50 Q180,20 360,50 T720,50 T1080,50 T1440,50", dur: "7s", grad: "flow-grad-1", width: 2.5 },
          { id: 2, d: "M0,55 Q200,85 400,55 T800,55 T1200,55 T1440,55", dur: "10s", grad: "flow-grad-2", width: 1.5 },
          { id: 3, d: "M0,45 Q240,15 480,45 T960,45 T1440,45", dur: "13s", grad: "flow-grad-3", width: 1.2 },
          { id: 4, d: "M0,52 Q150,75 300,52 T600,52 T900,52 T1200,52 T1440,52", dur: "8s", grad: "flow-grad-4", width: 1.8 },
          { id: 5, d: "M0,48 Q300,30 600,48 T1200,48 T1440,48", dur: "15s", grad: "flow-grad-3", width: 1.0 },
        ].map((p) => (
          <path
            key={p.id}
            d={p.d}
            stroke={`url(#${p.grad})`}
            strokeWidth={p.width}
            fill="none"
            className="euphonia-wave"
            style={{ 
              animationDuration: p.dur,
              opacity: inView ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
        ))}
      </svg>

      {/* Floating Particles moving along with waves */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="voiceflow-particle"
          style={{
            position: 'absolute',
            left: p.left,
            top: `calc(50% + ${p.yOffset}px)`,
            fontSize: `${p.size}px`,
            color: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
            opacity: inView ? 0.3 : 0,
            transition: 'opacity 1s ease',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.char}
        </span>
      ))}

      <style jsx>{`
        @keyframes flowWave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-20px) scaleY(1.1); }
          100% { transform: translateX(0); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.1; }
          50% { transform: translate(15px, -15px) rotate(15deg); opacity: 0.3; }
        }
        .euphonia-wave {
          animation: flowWave linear infinite alternate;
          transform-origin: center;
        }
        .voiceflow-particle {
          animation: floatParticle ease-in-out infinite alternate;
          font-family: 'Noto Sans Devanagari', sans-serif;
        }
      `}</style>
    </div>
  );
}

/* ─── Soundwave: animated equalizer bars + flowing sine line ─── */
function SoundwaveVariant({ inView, accent }) {
  const barCount = 40;

  return (
    <>
      {/* Central flowing sound wave line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="divider-wave-g" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop offset="20%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.6" />
            <stop offset="80%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q120,20 240,40 T480,40 T720,40 T960,40 T1200,40 T1440,40"
          stroke="url(#divider-wave-g)"
          strokeWidth="1.5"
          className="divider-wave-path"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
        <path
          d="M0,42 Q180,28 360,42 T720,42 T1080,42 T1440,42"
          stroke="url(#divider-wave-g)"
          strokeWidth="1"
          className="divider-wave-path-slow"
          style={{
            opacity: inView ? 0.5 : 0,
            transition: 'opacity 1s ease 0.2s',
          }}
        />
      </svg>

      {/* Mini equalizer bars */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-[2px]"
        style={{
          height: '24px',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}
      >
        {Array.from({ length: barCount }, (_, i) => {
          const distance = Math.abs(i - barCount / 2) / (barCount / 2);
          const maxH = (1 - distance * distance) * 20;
          return (
            <div
              key={i}
              className="eq-bar"
              style={{
                width: '2px',
                borderRadius: '1px',
                background: `linear-gradient(180deg, ${accent}80, ${accent}30)`,
                animationDelay: `${i * 0.05}s`,
                '--max-h': `${Math.max(maxH, 2)}px`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}

/* ─── Particles: floating Indic characters drifting across ─── */
function ParticleVariant({ inView, accent }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 16 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${3 + (i * 6.2) % 94}%`,
        top: `${10 + ((i * 31) % 80)}%`,
        size: 12 + (i % 4) * 3,
        delay: i * 0.08,
        opacity: 0.08 + (i % 3) * 0.04,
      }))
    );
  }, []);

  return (
    <>
      {/* Floating characters */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="indic-drift"
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            fontSize: `${p.size}px`,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontWeight: 600,
            color: accent,
            opacity: inView ? p.opacity : 0,
            transition: `opacity 0.6s ease ${p.delay}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Subtle center line */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: inView ? '30%' : '0%',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accent}25, transparent)`,
          transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </>
  );
}

/* ─── Pulse: audio-visualizer inspired pulsing glow ─── */
function PulseVariant({ inView, accent }) {
  return (
    <>
      {/* Pulsing concentric rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((ring) => (
          <div
            key={ring}
            className="voice-ring"
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${60 + ring * 50}px`,
              height: `${20 + ring * 12}px`,
              borderRadius: '50%',
              border: `1px solid ${accent}`,
              opacity: inView ? 0.15 - ring * 0.04 : 0,
              transition: `opacity 0.6s ease ${ring * 0.2}s`,
              animationDelay: `${ring * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Center dot with glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: accent,
          opacity: inView ? 0.4 : 0,
          transition: 'opacity 0.5s ease',
          boxShadow: `0 0 12px ${accent}50, 0 0 24px ${accent}20`,
        }}
      />

      {/* Soft radial glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '200px',
          height: '30px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${accent}15 0%, transparent 70%)`,
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
    </>
  );
}
