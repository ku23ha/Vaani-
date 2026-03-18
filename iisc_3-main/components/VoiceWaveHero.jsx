"use client";

import { useState, useEffect, useRef } from 'react';

const languages = [
  { name: 'हिन्दी', english: 'Hindi', hours: '3,993', region: 'North India', sample: 'डिजिटल इंडिया आगे बढ़ रहा है' },
  { name: 'বাংলা', english: 'Bengali', hours: '1,967', region: 'West Bengal & Tripura', sample: 'ভারতের ভাষাগত বৈচিত্র্য' },
  { name: 'ಕನ್ನಡ', english: 'Kannada', hours: '2,243', region: 'Karnataka', sample: 'ಭಾರತದ ಭಾಷಾ ವೈವಿಧ್ಯ' },
  { name: 'తెలుగు', english: 'Telugu', hours: '2,233', region: 'Andhra & Telangana', sample: 'భారతదేశ భాషా వైవిధ్యం' },
  { name: 'தமிழ்', english: 'Tamil', hours: '833', region: 'Tamil Nadu', sample: 'இந்தியாவின் மொழி பன்முகத்தன்மை' },
  { name: 'मराठी', english: 'Marathi', hours: '1,043', region: 'Maharashtra', sample: 'भारताची भाषिक विविधता' },
  { name: 'ગુજરાતી', english: 'Gujarati', hours: '292', region: 'Gujarat', sample: 'ભારતની ભાષાકીય વિવિધતા' },
  { name: 'മലയാളം', english: 'Malayalam', hours: '349', region: 'Kerala', sample: 'ഇന്ത്യയുടെ ഭാഷാ വൈവിധ്യം' },
  { name: 'ଓଡ଼ିଆ', english: 'Odia', hours: '589', region: 'Odisha', sample: 'ଭାରତର ଭାଷାଗତ ବିବିଧତା' },
  { name: 'ਪੰਜਾਬੀ', english: 'Punjabi', hours: '219', region: 'Punjab', sample: 'ਭਾਰਤ ਦੀ ਭਾਸ਼ਾਈ ਵਿਭਿੰਨਤਾ' },
  { name: 'অসমীয়া', english: 'Assamese', hours: '354', region: 'Assam', sample: 'ভাৰতৰ ভাষিক বৈচিত্ৰ' },
  { name: 'Mizo', english: 'Mizo', hours: '201', region: 'Mizoram', sample: 'India tawng hrang hrang' },
  { name: 'ತುಳು', english: 'Tulu', hours: '39', region: 'Coastal Karnataka', sample: 'ತುಳು ಭಾಷೆ ಸುಂದರ' },
  { name: 'Garo', english: 'Garo', hours: '471', region: 'Meghalaya', sample: 'Aro aro bol·gipa rang' },
  { name: 'চাকমা', english: 'Chakma', hours: '485', region: 'Tripura', sample: 'ভারত ভাষার বৈচিত্র্য' },
  { name: 'Wancho', english: 'Wancho', hours: '121', region: 'Arunachal Pradesh', sample: 'Wancho zan mon' },
];

const stats = [
  { number: '31,255', label: 'Hours' },
  { number: '1,56,534', label: 'Speakers' },
  { number: '109', label: 'Languages' },
  { number: '165', label: 'Districts' },
];

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target, duration = 2200) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (!isVisible) return;

    const start = Date.now();
    const targetNum = parseFloat(target.replace(/,/g, ''));

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.floor(targetNum * eased);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNum);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, isVisible]);

  return count.toLocaleString();
}

export function VoiceWaveHero() {
  const canvasRef = useRef(null);
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const [barDurations, setBarDurations] = useState([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    let t = 0;
    const waves = [
      { amp: 45, freq: 0.003, speed: 1.0, color: 'rgba(255, 153, 51, 0.4)' }, // Saffron
      { amp: 35, freq: 0.005, speed: 1.4, color: 'rgba(255, 255, 255, 0.3)' }, // White
      { amp: 55, freq: 0.002, speed: 0.7, color: 'rgba(19, 136, 8, 0.3)' },   // Green
      { amp: 22, freq: 0.007, speed: 1.8, color: 'rgba(255, 255, 255, 0.4)' }, // White accent
    ];

    const animate = () => {
      if (prefersReducedMotion.current) return;

      ctx.clearRect(0, 0, rect.width, rect.height);

      waves.forEach(wave => {
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let x = 0; x < rect.width; x += 2) {
          const y1 = Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
          const y2 = Math.sin(x * wave.freq * 1.7 + t * wave.speed * 0.6) * wave.amp * 0.5;
          const y = y1 + y2 + rect.height / 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      });

      t += 0.008;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * 2;
      canvas.height = newRect.height * 2;
      ctx.scale(2, 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex(prev => (prev + 1) % languages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const durations = Array.from({ length: 24 }, () => 0.6 + Math.random() * 0.8);
    setBarDurations(durations);
  }, []);

  const currentLang = languages[currentLangIndex];

  // Call hooks for each stat
  const countUp0 = useCountUp(stats[0].number);
  const countUp1 = useCountUp(stats[1].number);
  const countUp2 = useCountUp(stats[2].number);
  const countUp3 = useCountUp(stats[3].number);
  const countUps = [countUp0, countUp1, countUp2, countUp3];

  return (
    <div className="relative w-full h-[450px] flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-black/40 border border-white/5">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        {/* Language Carousel */}
        <div className="h-18 overflow-hidden relative">
          <div
            key={currentLangIndex}
            className="absolute inset-0 flex flex-col items-center justify-center animate-slide-up"
            style={{
              animation: prefersReducedMotion.current ? 'none' : 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[rgba(61,90,128,0.5)] mb-2" style={{ fontFamily: 'Noto Sans' }}>
              {currentLang.name}
            </div>
            <div className="text-sm uppercase tracking-widest text-[rgba(61,90,128,0.5)]">
              {currentLang.english} · {currentLang.hours} hrs
            </div>
          </div>
        </div>

        {/* Waveform Bars */}
        <div className="flex items-end justify-center gap-0.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-[#FF9933] rounded-sm animate-wave-bar"
              style={{
                animationDuration: `${barDurations[i] || 1}s`,
                animationDelay: `${i * 0.05}s`,
                minHeight: '6px',
                maxHeight: '32px',
                background: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808'
              }}
            />
          ))}
        </div>

        {/* Region and Sample */}
        <div className="space-y-3">
          <div className="text-sm uppercase tracking-[4px] font-bold text-[#8AB4F8]">
            {currentLang.region}
          </div>
          <div className="text-lg italic text-white/70 max-w-lg leading-relaxed px-4" style={{ fontFamily: 'Noto Sans' }}>
            "{currentLang.sample}"
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          20% {
            transform: translateY(0);
            opacity: 1;
          }
          80% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-20px);
            opacity: 0;
          }
        }

        @keyframes wave-bar {
          0% {
            height: 6px;
            opacity: 0.4;
          }
          50% {
            height: 48px;
            opacity: 1;
          }
          100% {
            height: 6px;
            opacity: 0.4;
          }
        }

        .animate-slide-up {
          animation: slideUp 3s cubic-bezier(0.16,1,0.3,1) infinite;
        }

        .animate-wave-bar {
          animation: wave-bar ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}