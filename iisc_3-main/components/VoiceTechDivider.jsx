import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/* ─── Indic characters for floating text ─── */
const INDIC_CHARS = [
  'अ','आ','इ','क','ग','त','न','प','म','श','स','ह',
  'அ','ஆ','க','ச','த','ப','ம',
  'అ','ఆ','క','త','న','ప',
  'ಅ','ಆ','ಕ','ನ','ಪ','ಮ',
  'অ','আ','ক','ত','ন','প',
  'અ','આ','ક','ત','ન','પ',
  'അ','ആ','ക','ത','ന','പ',
];

/*
 * variant:
 *   "waveform"   — animated soundwave bars + floating Indic chars
 *   "voiceflow"  — layered flowing sine waves with gradient fills + Indic chars
 *   "spectrum"   — audio spectrum bars visualization
 *   "circuit"    — circuit-board style dotted lines
 *
 * colorFrom / colorTo — bg gradient endpoints (CSS colors)
 * height — section height in px (default 120)
 */
export default function VoiceTechDivider({
  variant = 'waveform',
  colorFrom = '#FFFFFF',
  colorTo = '#FFFFFF',
  height = 120,
  flip = false,
}) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div
      ref={ref}
      className="relative overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{
        height: `${height}px`,
        background: `linear-gradient(180deg, ${flip ? colorTo : colorFrom} 0%, ${flip ? colorFrom : colorTo} 100%)`,
      }}
    >
      {variant === 'waveform' && <WaveformVariant inView={inView} />}
      {variant === 'voiceflow' && <VoiceFlowVariant inView={inView} />}
      {variant === 'signal' && <VoiceFlowVariant inView={inView} />}
      {variant === 'spectrum' && <SpectrumVariant inView={inView} />}
      {variant === 'circuit' && <CircuitVariant inView={inView} />}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Variant 1: Waveform — soundwave bars + Indic chars
   ═══════════════════════════════════════════ */
function WaveformVariant({ inView }) {
  const [chars, setChars] = useState([]);
  useEffect(() => {
    setChars(
      Array.from({ length: 12 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${8 + i * 8}%`,
        top: `${15 + Math.random() * 60}%`,
        size: `${14 + Math.random() * 14}px`,
        delay: `${i * 0.3}s`,
        opacity: 0.06 + Math.random() * 0.08,
      }))
    );
  }, []);

  return (
    <>
      {/* Center waveform bars */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-end gap-[3px]"
        style={{
          height: '50px',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        {Array.from({ length: 40 }, (_, i) => {
          const h = 15 + Math.sin(i * 0.5) * 30 + Math.random() * 10;
          return (
            <div
              key={i}
              className="soundwave-bar"
              style={{
                width: '2px',
                height: `${h}%`,
                borderRadius: '2px',
                background: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
                opacity: 0.3 + Math.random() * 0.3,
                animationDelay: `${i * 0.08}s`,
                animationDuration: `${0.8 + Math.random() * 0.8}s`,
              }}
            />
          );
        })}
      </div>

      {/* Floating Indic characters */}
      {chars.map((c, i) => (
        <span
          key={i}
          className="indic-pulse"
          style={{
            position: 'absolute',
            left: c.left,
            top: c.top,
            fontSize: c.size,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontWeight: 600,
            color: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
            opacity: inView ? c.opacity : 0,
            animationDelay: c.delay,
            animationDuration: '4s',
            transition: 'opacity 0.6s ease',
          }}
        >
          {c.char}
        </span>
      ))}

      {/* Thin horizontal signal line */}
      <div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,153,51,0.15) 20%, rgba(255,255,255,0.25) 50%, rgba(19,136,8,0.15) 80%, transparent 100%)',
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════
   Variant 2: VoiceFlow — layered flowing sine waves + Indic chars
   ═══════════════════════════════════════════ */
function VoiceFlowVariant({ inView }) {
  const [chars, setChars] = useState([]);
  useEffect(() => {
    setChars(
      Array.from({ length: 10 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${5 + i * 10}%`,
        top: `${10 + Math.random() * 75}%`,
        size: `${14 + Math.random() * 16}px`,
        delay: `${i * 0.4}s`,
        opacity: 0.05 + Math.random() * 0.08,
      }))
    );
  }, []);

  // Build smooth sine wave paths
  const buildSineWave = (freq, amp, yOffset, phase) => {
    let d = `M0,${yOffset}`;
    for (let x = 0; x <= 1440; x += 4) {
      const y = yOffset + Math.sin((x * freq * Math.PI) / 720 + phase) * amp;
      d += ` L${x},${y.toFixed(1)}`;
    }
    return d;
  };

  const waves = [
    { freq: 1.2, amp: 18, yOffset: 50, fillOpacity: 0.08, strokeOpacity: 0.3, color: '#FF9933', animDur: '8s' },
    { freq: 1.8, amp: 12, yOffset: 60, fillOpacity: 0.06, strokeOpacity: 0.25, color: '#FFFFFF', animDur: '6s' },
    { freq: 2.5, amp: 8, yOffset: 55, fillOpacity: 0.05, strokeOpacity: 0.2, color: '#138808', animDur: '10s' },
  ];

  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full wave-flow"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      >
        <defs>
          {waves.map((w, i) => (
            <linearGradient key={`vf-fill-${i}`} id={`vf-fill-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={w.color} stopOpacity="0" />
              <stop offset="30%" stopColor={w.color} stopOpacity={w.fillOpacity} />
              <stop offset="50%" stopColor={w.color} stopOpacity={w.fillOpacity * 1.5} />
              <stop offset="70%" stopColor={w.color} stopOpacity={w.fillOpacity} />
              <stop offset="100%" stopColor={w.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {waves.map((w, i) => {
          const pathD = buildSineWave(w.freq, w.amp, w.yOffset, i * 1.2);
          const fillD = pathD + ` L1440,120 L0,120 Z`;
          return (
            <g key={i}>
              {/* Filled area under wave */}
              <path d={fillD} fill={`url(#vf-fill-${i})`} />
              {/* Wave stroke */}
              <path
                d={pathD}
                stroke={w.color}
                strokeWidth="1.5"
                opacity={w.strokeOpacity}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Indic characters layered over waves */}
      {chars.map((c, i) => (
        <span
          key={i}
          className="indic-pulse"
          style={{
            position: 'absolute',
            left: c.left,
            top: c.top,
            fontSize: c.size,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontWeight: 600,
            color: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
            opacity: inView ? c.opacity : 0,
            animationDelay: c.delay,
            animationDuration: '5s',
            transition: 'opacity 0.8s ease',
          }}
        >
          {c.char}
        </span>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════
   Variant 3: Spectrum — frequency bars
   ═══════════════════════════════════════════ */
function SpectrumVariant({ inView }) {
  const [bars, setBars] = useState([]);
  useEffect(() => {
    setBars(
      Array.from({ length: 60 }, (_, i) => ({
        height: 15 + Math.sin(i * 0.3) * 40 + Math.random() * 20,
        delay: `${i * 0.05}s`,
        duration: `${1.5 + Math.random() * 1.5}s`,
      }))
    );
  }, []);

  return (
    <>
      {/* Spectrum bars across full width */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-[4px] px-8"
        style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        {bars.map((b, i) => (
          <div
            key={i}
            className="soundwave-bar"
            style={{
              flex: '1 1 0',
              maxWidth: '8px',
              height: `${b.height}%`,
              borderRadius: '3px',
              background: `linear-gradient(180deg, ${i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808'}, rgba(255,255,255,0.2))`,
              animationDelay: b.delay,
              animationDuration: b.duration,
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>

      {/* Frequency labels */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-12">
        {['20Hz', '200Hz', '2kHz', '8kHz', '20kHz'].map((f, i) => (
          <span
            key={f}
            className="font-mono"
            style={{
              fontSize: '8px',
              color: '#FF9933',
              opacity: inView ? 0.2 : 0,
              transition: `opacity 0.6s ease ${0.5 + i * 0.15}s`,
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   Variant 4: Circuit — dotted lines + nodes
   ═══════════════════════════════════════════ */
function CircuitVariant({ inView }) {
  const [chars, setChars] = useState([]);
  useEffect(() => {
    setChars(
      Array.from({ length: 8 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${10 + i * 11}%`,
        top: `${20 + Math.random() * 55}%`,
        size: `${16 + Math.random() * 12}px`,
        opacity: 0.06 + Math.random() * 0.06,
      }))
    );
  }, []);

  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Horizontal dotted lines */}
        {[30, 60, 90].map((y, lineIdx) => (
          <line
            key={`h-${lineIdx}`}
            x1="0"
            y1={y}
            x2="1440"
            y2={y}
            stroke="#42A5F5"
            strokeWidth="0.5"
            strokeDasharray="8 12"
            opacity={inView ? 0.12 : 0}
            style={{ transition: `opacity 0.8s ease ${lineIdx * 0.2}s` }}
          />
        ))}
        {/* Node circles */}
        {[
          { x: 180, y: 30 }, { x: 360, y: 60 }, { x: 540, y: 90 },
          { x: 720, y: 30 }, { x: 900, y: 60 }, { x: 1080, y: 90 },
          { x: 1260, y: 30 },
        ].map((node, i) => (
          <g key={i}>
            <circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="none"
              stroke="#42A5F5"
              strokeWidth="1"
              opacity={inView ? 0.25 : 0}
              style={{ transition: `opacity 0.5s ease ${0.3 + i * 0.1}s` }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="1.5"
              fill="#42A5F5"
              opacity={inView ? 0.35 : 0}
              style={{ transition: `opacity 0.5s ease ${0.3 + i * 0.1}s` }}
            />
            {/* Vertical connector */}
            <line
              x1={node.x}
              y1={node.y}
              x2={node.x}
              y2={node.y + (i % 2 === 0 ? 30 : -30)}
              stroke="#42A5F5"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              opacity={inView ? 0.10 : 0}
              style={{ transition: `opacity 0.5s ease ${0.4 + i * 0.1}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Floating Indic characters at circuit nodes */}
      {chars.map((c, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: c.left,
            top: c.top,
            fontSize: c.size,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontWeight: 600,
            color: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
            opacity: inView ? c.opacity : 0,
            transition: `opacity 0.6s ease ${i * 0.15}s`,
          }}
        >
          {c.char}
        </span>
      ))}
    </>
  );
}
