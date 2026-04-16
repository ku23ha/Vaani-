import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHeroAnimation, useScrollIndicator } from './gsap-provider';
import IIScLogo from '../assets/IIScLogo.png';
import ArtparkLogo from '../assets/ARTPARK.png';
import GoogleLogo from '../assets/GoogleLogo.png';
import BhasniLogo from '../assets/bhashini.png';

/* ─── Premium animated voice waveform ─── */
function HeroWaveform() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    /* Neural Indic Waves — Saffron, White, Green */
    const layers = [
      { freq: 0.002, amp: 60, speed: 0.010, color: 'rgba(255, 153, 51, 0.6)', width: 3.5, blur: 2 },
      { freq: 0.004, amp: 40, speed: 0.015, color: 'rgba(255, 255, 255, 0.5)', width: 2.5, blur: 4 },
      { freq: 0.003, amp: 80, speed: 0.008, color: 'rgba(19, 136, 8, 0.4)', width: 2.0, blur: 1 },
      { freq: 0.006, amp: 30, speed: 0.020, color: 'rgba(255, 153, 51, 0.3)', width: 1.5, blur: 6 },
      { freq: 0.005, amp: 55, speed: 0.012, color: 'rgba(255, 255, 255, 0.25)', width: 1.8, blur: 0 },
    ];

    const draw = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const centerY = H * 0.45;

      ctx.clearRect(0, 0, W, H);

      layers.forEach((layer, index) => {
        ctx.save();
        if (layer.blur > 0) ctx.filter = `blur(${layer.blur}px)`;
        
        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.width;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        for (let x = 0; x <= W; x += 1.5) {
          const normalX = (x / W - 0.5) * 2;
          const envelope = Math.exp(-normalX * normalX * 2.2);
          
          // Composite harmonics for "Neural" organic look
          const y = centerY + 
            layer.amp * envelope * (
              0.5 * Math.sin(x * layer.freq + time * layer.speed * 60) +
              0.3 * Math.sin(x * layer.freq * 2.3 + time * layer.speed * 90 + index) +
              0.2 * Math.sin(x * layer.freq * 5.1 + time * layer.speed * 40 - index * 2)
            );

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      time += 0.012;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

/* ─── Floating Indic Script Characters ─── */
const INDIC_CHARS = [
  // Hindi / Devanagari
  'अ', 'आ', 'इ', 'उ', 'ए', 'ओ', 'क', 'ख', 'ग', 'च', 'ज', 'ट', 'ड', 'त', 'द', 'न', 'प', 'ब', 'म', 'र', 'ल', 'व', 'श', 'स', 'ह',
  // Tamil
  'அ', 'ஆ', 'இ', 'உ', 'எ', 'ஒ', 'க', 'ச', 'ட', 'த', 'ந', 'ப', 'ம',
  // Telugu
  'అ', 'ఆ', 'ఇ', 'ఉ', 'ఎ', 'క', 'గ', 'చ', 'ట', 'త', 'న', 'ప', 'మ',
  // Kannada
  'ಅ', 'ಆ', 'ಇ', 'ಉ', 'ಎ', 'ಕ', 'ಗ', 'ಚ', 'ಟ', 'ನ', 'ಪ', 'ಮ',
  // Bengali
  'অ', 'আ', 'ই', 'উ', 'এ', 'ক', 'খ', 'গ', 'চ', 'ট', 'ত', 'দ', 'ন', 'প', 'ব', 'ম',
  // Gujarati
  'અ', 'આ', 'ઇ', 'ઉ', 'એ', 'ક', 'ગ', 'ચ', 'ટ', 'ત', 'ન', 'પ', 'મ',
  // Malayalam
  'അ', 'ஆ', 'ഇ', 'ഉ', 'എ', 'ക', 'ച', 'ട', 'ത', 'ന', 'പ', 'മ',
  // Odia
  'ଅ', 'ଆ', 'ଇ', 'ଉ', 'ଏ', 'କ', 'ଗ', 'ଚ', 'ଟ', 'ତ', 'ନ', 'ପ', 'ମ',
];

function HeroParticles() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const COLORS = ['#0D47A1', '#0A3071', '#1A237E', '#0D47A1', '#1565C0'];
    setItems(
      Array.from({ length: 30 }, (_, i) => ({
        char: INDIC_CHARS[Math.floor(Math.random() * INDIC_CHARS.length)],
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 14}s`,
        duration: `${12 + Math.random() * 16}s`,
        fontSize: `${16 + Math.random() * 24}px`,
        opacity: 0.25 + Math.random() * 0.30,
        color: COLORS[i % 5],
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((p, i) => (
        <span
          key={i}
          className="indic-float"
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-40px',
            fontSize: p.fontSize,
            fontFamily: "'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Bengali', 'Noto Sans Kannada', sans-serif",
            fontWeight: 700,
            color: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0,
            userSelect: 'none',
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}

/* ─── Small inline waveform ─── */
function SmallWaveform() {
  return (
    <div className="flex items-end gap-[3px] h-5" aria-hidden="true">
      {[0.6, 1, 0.4, 0.8, 0.5, 1, 0.3, 0.7, 0.9, 0.4, 0.6, 0.8].map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full bg-[#42A5F5]/60 soundwave-bar"
          style={{
            height: `${h * 100}%`,
            animationDelay: `${i * 0.12}s`,
            animationDuration: `${0.8 + Math.random() * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);
  const headlineRef = useRef(null);

  // Hero page load animation
  useHeroAnimation();

  // Scroll indicator fade
  useScrollIndicator();

  useEffect(() => {
    const resetIdle = () => {
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), 3000);
    };
    document.addEventListener('mousemove', resetIdle);
    timerRef.current = setTimeout(() => setIsIdle(true), 3000);
    return () => {
      document.removeEventListener('mousemove', resetIdle);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Prepare headline for word-by-word animation
  useEffect(() => {
    if (headlineRef.current) {
      const text = headlineRef.current.textContent;
      const words = text.split(' ');
      headlineRef.current.innerHTML = words
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden;margin-right:0.25em;"><span style="display:inline-block;transform:translateY(110%)" class="hero-headline-word">${word}</span></span>`
        )
        .join(' ');
    }
  }, []);

  return (
    <section
      id="Home"
      className="min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center"
      style={{ background: 'var(--bg-hero)' }}
    >
      {/* Background layers */}
      <HeroWaveform />
      <HeroParticles />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(66, 165, 245, 0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(128, 210, 255, 0.05) 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-12 max-w-4xl mx-auto relative z-10">
        <h1 className="headline-hero">
          <span className="block text-white opacity-80 mb-2">Empowering India's</span>
          <span className="block text-gradient-accent tracking-tighter">Linguistic Sovereignty.</span>
        </h1>

        <p className="hero-subheadline text-xl sm:text-2xl text-white/60 font-medium max-w-3xl leading-relaxed italic mt-4" style={{ textShadow: '0 0 40px rgba(0,0,0,1)' }}>
          "31,000+ hours of authentic Indian speech across 109 languages. 
          The largest open-source dataset built for Bharat, by Bharat."
        </p>

        {/* CTA buttons with animation class */}
        <div className="hero-cta flex flex-wrap items-center justify-center gap-6 mt-10">
          <Link
            href="#Explore"
            className={`btn-primary shadow-lg shadow-[#42A5F5]/20 hover:text-white ${!isIdle ? '' : 'cta-breathe'}`}
          >
            Explore the Data
          </Link>
          <Link
            href="https://huggingface.co/datasets/ARTPARK-IISc/VAANI"
            target="_blank"
            className="btn-secondary"
          >
            Download Dataset
          </Link>
        </div>
      </div>

      {/* Supporter logos with animation class */}
      <div className="hero-partners mt-20 w-full max-w-3xl mx-auto relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-10 transition-opacity duration-300">
          <Link href="https://www.iisc.ac.in/" target="_blank" className="opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 transform nav">
            <span className="inline-flex p-1 rounded-md bg-white/80">
              <Image src={IIScLogo} alt="IISc" width={44} height={44} className="object-contain h-11 w-auto" />
            </span>
          </Link>
          <Link href="https://artpark.in/" target="_blank" className="opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 transform nav">
            <Image src={ArtparkLogo} alt="Artpark" width={150} height={40} className="object-contain h-10 w-auto" />
          </Link>
          <Link href="https://cloud.google.com/" target="_blank" className="opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 transform nav">
            <Image src={GoogleLogo} alt="Google" width={100} height={34} className="object-contain h-9 w-auto" />
          </Link>
          <Link href="https://bhashini.gov.in/" target="_blank" className="opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110 transform nav">
            <Image src={BhasniLogo} alt="Bhashini" width={68} height={54} className="object-contain h-12 w-auto" />
          </Link>
        </div>
      </div>

    </section>
  );
}
