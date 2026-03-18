'use client';

import Link from 'next/link';
import { Container } from './Container';
import Model2 from './Model2';
import { useMyContext } from '../contexts/MyContext';
import { useInView } from '../hooks/useInView';
import WaveformDivider from './WaveformDivider';
import CodeSnippet from './CodeSnippet';

export function DownloadSection() {
  const { popup } = useMyContext();
  const [sectionRef, sectionInView] = useInView();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'transparent' }}>
      {popup && <Model2 />}

      {/* Vibrant animated waveform background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute w-[200%] h-full left-0 top-0 wave-flow"
          viewBox="0 0 2880 400"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="cta-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#42A5F5" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#64B5F6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#42A5F5" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q180,100 360,200 T720,200 T1080,200 T1440,200 T1800,200 T2160,200 T2520,200 T2880,200" stroke="url(#cta-wave-grad)" strokeWidth="3" />
          <path d="M0,220 Q200,120 400,220 T800,220 T1200,220 T1600,220 T2000,220 T2400,220 T2880,220" stroke="url(#cta-wave-grad)" strokeWidth="2" opacity="0.5" />
          <path d="M0,180 Q150,280 300,180 T600,180 T900,180 T1200,180 T1500,180 T1800,180 T2100,180 T2400,180 T2700,180" stroke="url(#cta-wave-grad)" strokeWidth="1.5" opacity="0.3" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div
          ref={sectionRef}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6"
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Open Data. Open Possibilities.
          </h2>
          <p
            className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            }}
          >
            Our comprehensive multimodal dataset is freely available on Hugging Face. Build the next breakthrough in Indian language AI.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            }}
          >
            <Link
              href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#4285F4]/25 text-lg"
              style={{ background: 'linear-gradient(135deg, #1967D2, #4285F4, #8AB4F8)', color: '#FFFFFF' }}
            >
              🤗 Download on Hugging Face
            </Link>
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 hover:text-white transition-all"
            >
              View License (CC-BY-4.0)
            </a>
          </div>

          {/* Code snippet */}
          <CodeSnippet />
        </div>
      </Container>
    </section>
  );
}
