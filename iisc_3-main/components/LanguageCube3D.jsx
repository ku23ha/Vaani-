import { useEffect, useMemo, useState } from 'react';

const languages = [
  {
    native: 'हिन्दी',
    english: 'Hindi',
    region: 'NORTH INDIA',
    hours: '3,993 hrs',
    sample: '“डिजिटल इंडिया आगे बढ़ रहा है”',
  },
  {
    native: 'বাংলা',
    english: 'Bengali',
    region: 'WEST BENGAL & TRIPURA',
    hours: '1,967 hrs',
    sample: '“ভারতের ভাষাগত বৈচিত্র্য”',
  },
  {
    native: 'ಕನ್ನಡ',
    english: 'Kannada',
    region: 'KARNATAKA',
    hours: '2,243 hrs',
    sample: '“ಭಾರತದ ಭಾಷಾ ವೈವಿಧ್ಯ”',
  },
  {
    native: 'తెలుగు',
    english: 'Telugu',
    region: 'ANDHRA & TELANGANA',
    hours: '2,233 hrs',
    sample: '“భారతదేశ భాషా వైవిధ్యం”',
  },
  {
    native: 'தமிழ்',
    english: 'Tamil',
    region: 'TAMIL NADU',
    hours: '833 hrs',
    sample: '“இந்தியாவின் மொழி பன்முகத்தன்மை”',
  },
  {
    native: 'मराठी',
    english: 'Marathi',
    region: 'MAHARASHTRA',
    hours: '1,043 hrs',
    sample: '“भारताची भाषिक विविधता”',
  },
  {
    native: 'ગુજરાતી',
    english: 'Gujarati',
    region: 'GUJARAT',
    hours: '292 hrs',
    sample: '“ભારતની ભાષાકીય વિવિધતા”',
  },
  {
    native: 'മലയാളം',
    english: 'Malayalam',
    region: 'KERALA',
    hours: '349 hrs',
    sample: '“ഇന്ത്യയുടെ ഭാഷാ വൈവിധ്യം”',
  },
  {
    native: 'ଓଡ଼ିଆ',
    english: 'Odia',
    region: 'ODISHA',
    hours: '589 hrs',
    sample: '“ଭାରତର ଭାଷାଗତ ବିବିଧତା”',
  },
  {
    native: 'ਪੰਜਾਬੀ',
    english: 'Punjabi',
    region: 'PUNJAB',
    hours: '219 hrs',
    sample: '“ਭਾਰਤ ਦੀ ਭਾਸ਼ਾਈ ਵਿਭਿੰਨਤਾ”',
  },
  {
    native: 'অসমীয়া',
    english: 'Assamese',
    region: 'ASSAM',
    hours: '354 hrs',
    sample: '“ভাৰতৰ ভাষিক বৈচিত্ৰ”',
  },
  {
    native: 'नेपाली',
    english: 'Nepali',
    region: 'SIKKIM & DARJEELING',
    hours: '182 hrs',
    sample: '“भारतको भाषिक विविधता”',
  },
  {
    native: 'Mizo',
    english: 'Mizo',
    region: 'MIZORAM',
    hours: '201 hrs',
    sample: '“India tawng hrang hrang”',
  },
  {
    native: 'ತುಳು',
    english: 'Tulu',
    region: 'COASTAL KARNATAKA',
    hours: '39 hrs',
    sample: '“ಭಾರತದ ಭಾಷೆ ವೈವಿಧ್ಯ”',
  },
  {
    native: 'Garo',
    english: 'Garo',
    region: 'MEGHALAYA',
    hours: '471 hrs',
    sample: '“Aro aro bol·gipa rang”',
  },
  {
    native: 'চাকমা',
    english: 'Chakma',
    region: 'TRIPURA',
    hours: '485 hrs',
    sample: '“ভারত ভাষার বৈচিত্র্য”',
  },
  {
    native: 'Wancho',
    english: 'Wancho',
    region: 'ARUNACHAL PRADESH',
    hours: '121 hrs',
    sample: '“Wancho zan mon”',
  },
  {
    native: 'Kokborok',
    english: 'Kokborok',
    region: 'TRIPURA',
    hours: '43 hrs',
    sample: '“India kok bising”',
  },
];

const FACE_SIZE = {
  desktop: 280,
  tablet: 240,
  mobile: 200,
};


function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function Waveform({ seed = 0 }) {
  const bars = Array.from({ length: 12 });
  return (
    <div className="flex items-end justify-center gap-[2px]">
      {bars.map((_, i) => {
        const delay = (i * 0.1).toFixed(2);
        return (
          <span
            key={i}
            className="wave-bar"
            style={{
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Face({ data, faceSize }) {
  if (!data) return null;
  return (
    <div className="face" style={{ width: faceSize, height: faceSize }}>
      <div className="face-content">
        <div className="face-top">
          <span className="face-language">{data.native}</span>
          <span className="face-english">{data.english}</span>
          <span className="face-region">{data.region}</span>
        </div>

        <div className="face-wave">
          <Waveform />
          <span className="face-hours">{data.hours}</span>
        </div>

        <div className="face-sample">{data.sample}</div>
      </div>
    </div>
  );
}

export function LanguageCube3D() {
  const [batchIndex, setBatchIndex] = useState(0);
  const [manualRotation, setManualRotation] = useState({ x: -15, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);


  const batches = useMemo(() => chunk(languages, 6), []);
  const currentBatch = batches[batchIndex % batches.length];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReduced(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (prefersReduced || dragging) return;
    const interval = window.setInterval(() => {
      setBatchIndex((prev) => (prev + 1) % batches.length);
    }, 12 * 1000);
    return () => window.clearInterval(interval);
  }, [prefersReduced, dragging, batches.length]);


  const handlePointerDown = (event) => {
    if (prefersReduced) return;
    setDragging(true);
    const startX = event.clientX;
    const startY = event.clientY;
    const startRot = { ...manualRotation };

    const onMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const nextX = clamp(startRot.x - deltaY * 0.2, -80, 80);
      const nextY = (startRot.y + deltaX * 0.25) % 360;
      setManualRotation({ x: nextX, y: nextY });
    };

    const onUp = () => {
      setDragging(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const [faceSize, setFaceSize] = useState(FACE_SIZE.desktop);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setFaceSize(FACE_SIZE.desktop);
      else if (width >= 768) setFaceSize(FACE_SIZE.tablet);
      else setFaceSize(FACE_SIZE.mobile);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const rotationStyle = prefersReduced
    ? {}
    : {
        animationDuration: `12s`,
        animationPlayState: dragging ? 'paused' : 'running',
        transform: dragging
          ? `perspective(900px) rotateX(${manualRotation.x}deg) rotateY(${manualRotation.y}deg)`
          : undefined,
      };

  return (
    <div className="language-cube">
      <div className="language-cube-inner" style={rotationStyle} onPointerDown={handlePointerDown}>
        {prefersReduced ? (
          <div className="language-grid">
            {currentBatch.map((lang) => (
              <div key={lang.native} className="language-card">
                <div className="language-card-top">
                  <span className="language-native">{lang.native}</span>
                  <span className="language-english">{lang.english}</span>
                  <span className="language-region">{lang.region}</span>
                </div>
                <div className="language-wave">
                  <Waveform />
                  <span className="language-hours">{lang.hours}</span>
                </div>
                <div className="language-sample">{lang.sample}</div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {currentBatch.map((lang, index) => (
              <div
                key={lang.native}
                className={`cube-face face-${index + 1}`}
                style={{ '--face-size': `${faceSize}px` }}
              >
                <Face data={lang} faceSize={faceSize} />
              </div>
            ))}
          </>
        )}
      </div>


      <style jsx>{`
        .language-cube {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          perspective: 1200px;
          perspective-origin: center center;
        }

        .language-cube-inner {
          position: relative;
          width: var(--face-size, 280px);
          height: var(--face-size, 280px);
          transform-style: preserve-3d;
          will-change: transform;
          animation: cube-rotate 12s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
          cursor: grab;
          margin: 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
        }

        .language-cube-inner:active {
          cursor: grabbing;
        }

        .cube-face {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--face-size, 280px);
          height: var(--face-size, 280px);
          transform-style: preserve-3d;
          transform-origin: center center;
          backface-visibility: hidden;
        }

        .face-1 { transform: translate(-50%, -50%) translateZ(calc(var(--face-size) / 2)); }
        .face-2 { transform: translate(-50%, -50%) rotateY(90deg) translateZ(calc(var(--face-size) / 2)); }
        .face-3 { transform: translate(-50%, -50%) rotateY(180deg) translateZ(calc(var(--face-size) / 2)); }
        .face-4 { transform: translate(-50%, -50%) rotateY(270deg) translateZ(calc(var(--face-size) / 2)); }
        .face-5 { transform: translate(-50%, -50%) rotateX(90deg) translateZ(calc(var(--face-size) / 2)); }
        .face-6 { transform: translate(-50%, -50%) rotateX(-90deg) translateZ(calc(var(--face-size) / 2)); }

        .face {
          background: rgba(10, 14, 26, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          backface-visibility: hidden;
        }

        .face-content {
          width: 100%;
          height: 100%;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .face-top {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .face-language {
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.1;
        }

        .face-english {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
        }

        .face-region {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }

        .face-wave {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 12px;
        }

        .wave-bar {
          display: inline-block;
          width: 3px;
          border-radius: 2px;
          background: rgba(30, 136, 229, 0.6);
          animation: wave 1.2s ease-in-out infinite alternate;
        }

        .face-hours {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Segoe UI Mono', monospace;
          font-size: 12px;
          color: #1976d2;
          white-space: nowrap;
        }

        .face-sample {
          margin-top: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
          font-style: italic;
          line-height: 1.2;
        }

        @keyframes cube-rotate {
          0% { transform: perspective(900px) rotateX(-15deg) rotateY(0deg); }
          25% { transform: perspective(900px) rotateX(15deg) rotateY(90deg); }
          50% { transform: perspective(900px) rotateX(-5deg) rotateY(180deg); }
          75% { transform: perspective(900px) rotateX(10deg) rotateY(270deg); }
          100% { transform: perspective(900px) rotateX(-15deg) rotateY(360deg); }
        }

        @keyframes wave {
          0% { height: 4px; }
          100% { height: 20px; }
        }

        .language-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          justify-items: center;
        }

        .language-card {
          width: 100%;
          max-width: 280px;
          background: rgba(10, 14, 26, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 280px;
          justify-content: space-between;
        }

        .language-card-top {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .language-native {
          font-size: 28px;
          font-weight: 600;
          color: #fff;
        }

        .language-english {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
        }

        .language-region {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }


        @media (max-width: 1024px) {
          .language-cube-inner {
            width: 240px;
            height: 240px;
          }
        }

        @media (max-width: 768px) {
          .language-cube-inner {
            width: 200px;
            height: 200px;
          }

          .language-card {
            max-width: 220px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .language-cube-inner {
            animation: none;
          }

          .wave-bar {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
