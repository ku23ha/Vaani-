'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const languages = [
  { name: 'हिन्दी', english: 'Hindi', hours: '3,993', region: 'North' },
  { name: 'বাংলা', english: 'Bengali', hours: '1,967', region: 'East' },
  { name: 'ಕನ್ನಡ', english: 'Kannada', hours: '2,243', region: 'South' },
  { name: 'తెలుగు', english: 'Telugu', hours: '2,233', region: 'South' },
  { name: 'தமிழ்', english: 'Tamil', hours: '833', region: 'South' },
  { name: 'മലയാളം', english: 'Malayalam', hours: '349', region: 'South' },
  { name: 'मराठी', english: 'Marathi', hours: '1,043', region: 'West' },
  { name: 'ગુજરાતી', english: 'Gujarati', hours: '292', region: 'West' },
  { name: 'ଓଡ଼ିଆ', english: 'Odia', hours: '589', region: 'East' },
  { name: 'ਪੰਜਾਬੀ', english: 'Punjabi', hours: '219', region: 'North' },
  { name: 'తులు', english: 'Tulu', hours: '39', region: 'South' },
  { name: 'গারো', english: 'Garo', hours: '471', region: 'Northeast' },
];

export default function Hero() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);

  // Canvas waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const waves = [
      { amp: 50, freq: 0.002, speed: 0.8, color: 'rgba(66, 165, 245,0.06)', lineWidth: 1.5 },
      { amp: 35, freq: 0.004, speed: 1.2, color: 'rgba(66, 165, 245,0.04)', lineWidth: 1 },
      { amp: 60, freq: 0.0015, speed: 0.5, color: 'rgba(66, 165, 245,0.05)', lineWidth: 2 },
      { amp: 25, freq: 0.006, speed: 1.6, color: 'rgba(66, 165, 245,0.03)', lineWidth: 1 },
      { amp: 40, freq: 0.003, speed: 1.0, color: 'rgba(66, 165, 245,0.04)', lineWidth: 1.5 },
    ];

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width / dpr,
      y: Math.random() * canvas.height / dpr,
      size: 1.5 + Math.random() * 1.5,
      opacity: 0.05 + Math.random() * 0.15,
      speed: 0.1 + Math.random() * 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      const cy = canvas.height / dpr / 2;

      // Draw waves
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;

        for (let x = 0; x < canvas.width / dpr; x += 2) {
          const y = cy + 
            Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 1.7 + t * wave.speed * 0.6) * wave.amp * 0.5;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Draw particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height / dpr + 10;
          p.x = Math.random() * canvas.width / dpr;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66, 165, 245,${p.opacity})`;
        ctx.fill();
      });

      t += 0.006;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Language carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % languages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const currentLang = languages[currentLangIndex];

  // Equalizer bars with random animations
  const equalizerBars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    duration: 0.5 + Math.random() * 0.9,
    delay: i * 0.04,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0A0E1A' }}>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        {/* Top label */}
        <p className="font-mono text-xs tracking-[3px] mb-6" style={{ color: 'rgba(66, 165, 245,0.7)' }}>
          IISc Bangalore × ARTPARK
        </p>

        {/* Main headline */}
        <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-tight mb-8" style={{ color: '#F0ECE3' }}>
          Every Voice in India, Heard.
        </h1>

        {/* Language carousel */}
        <div className="mb-6 h-16 flex items-center justify-center overflow-hidden">
          <div 
            key={currentLangIndex}
            className="flex flex-col items-center animate-fade-in"
          >
            <span className="font-indic text-2xl md:text-3xl font-semibold" style={{ color: '#F0ECE3' }}>
              {currentLang.name}
            </span>
            <span className="text-sm mt-1" style={{ color: '#42A5F5' }}>
              {currentLang.english} · {currentLang.hours} hrs
            </span>
          </div>
        </div>

        {/* Equalizer */}
        <div className="flex items-center justify-center gap-[2.5px] mb-8 h-9">
          {equalizerBars.map((bar) => (
            <div
              key={bar.id}
              className="w-[3px] rounded-full origin-bottom"
              style={{
                background: '#42A5F5',
                height: '36px',
                animation: `equalizer-bar ${bar.duration}s ease-in-out infinite alternate`,
                animationDelay: `${bar.delay}s`,
                transform: 'scaleY(0.3)',
              }}
            />
          ))}
        </div>

        {/* Subheadline */}
        <p className="text-lg leading-relaxed max-w-[640px] mx-auto mb-10" style={{ color: 'rgba(240,236,227,0.55)' }}>
          Building the world&apos;s largest open dataset of Indian speech{' '}
          <span className="text-[#42A5F5]">31,000+ hours</span> across{' '}
          <span className="text-[#42A5F5]">109 languages</span>, capturing how a billion people truly speak.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="#data-explorer"
            className="btn-primary inline-flex items-center gap-2 cta-breathe"
          >
            Explore the Data
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
          <Link
            href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
            target="_blank"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Download on Hugging Face
            <span className="text-lg">🤗</span>
          </Link>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-wider mb-4" style={{ color: 'rgba(240,236,227,0.3)' }}>
            Supported by
          </p>
          <div className="flex items-center gap-8 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-sm" style={{ color: '#F0ECE3' }}>IISc</span>
            <span className="font-mono text-sm" style={{ color: '#F0ECE3' }}>ARTPARK</span>
            <span className="font-mono text-sm" style={{ color: '#F0ECE3' }}>Google</span>
            <span className="font-mono text-sm" style={{ color: '#F0ECE3' }}>Bhashini</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center scroll-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#42A5F5]/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#42A5F5] rounded-full scroll-bounce" />
        </div>
        <p className="text-[11px] mt-2" style={{ color: 'rgba(240,236,227,0.3)' }}>
          Scroll to explore
        </p>
      </div>

      <style jsx>{`
        @keyframes equalizer-bar {
          0% { transform: scaleY(0.25); opacity: 0.25; }
          50% { transform: scaleY(1); opacity: 0.8; }
          100% { transform: scaleY(0.25); opacity: 0.25; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
}
