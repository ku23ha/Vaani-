export default function WaveformDivider({ color = 'amber', height = 40, className = '' }) {
  const colors = {
    amber: { stroke: '#FF9933', opacity: 0.25 },
    teal: { stroke: '#138808', opacity: 0.25 },
    spectral: { stroke: 'url(#spectral-grad)', opacity: 0.35 },
    white: { stroke: '#FFFFFF', opacity: 0.2 },
  };

  const c = colors[color] || colors.amber;

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="w-full h-full wave-pulse"
        fill="none"
      >
        <defs>
          <linearGradient id="spectral-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#138808" />
          </linearGradient>
        </defs>
        <path
          d="M0,20 Q60,5 120,20 T240,20 T360,20 T480,20 T600,20 T720,20 T840,20 T960,20 T1080,20 T1200,20 T1320,20 T1440,20"
          stroke={c.stroke}
          strokeWidth="2"
          opacity={c.opacity}
        />
        <path
          d="M0,20 Q80,35 160,20 T320,20 T480,20 T640,20 T800,20 T960,20 T1120,20 T1280,20 T1440,20"
          stroke={c.stroke}
          strokeWidth="1.5"
          opacity={c.opacity * 0.6}
        />
      </svg>
    </div>
  );
}
