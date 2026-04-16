"use client";

import { useState, useEffect, useRef } from 'react'
import { useCounterAnimation, useStatCardsAnimation, useAboutAnimation } from './gsap-provider'
import { useInView } from 'react-intersection-observer'
import WaveformDivider from './WaveformDivider';
import { VoiceWaveHero } from './VoiceWaveHero';
import { Container } from './Container';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/outline';

function formatNumber(value, opts = {}) {
  if (value == null || value === "") return "";
  const raw = String(value).trim();
  const match = raw.match(/[\d.,]+/);
  if (!match) return raw;

  const numericPart = match[0].replace(/,/g, "");
  const num = Number(numericPart);
  if (!Number.isFinite(num)) return raw;

  const decimals = (numericPart.split('.')[1] || '').length;
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: opts.maximumFractionDigits ?? decimals,
    minimumFractionDigits: opts.minimumFractionDigits ?? decimals,
  });

  return formatter.format(num);
}

function formatForDisplay(raw, addPlus = false) {
  if (!raw) return "";
  
  const rawString = String(raw);
  // Extract numeric part and format
  const numericMatch = rawString.match(/[\d.,]+/);
  if (!numericMatch) return raw;
  
  const numericPart = numericMatch[0].replace(/,/g, "");
  const num = Number(numericPart);
  
  if (!Number.isFinite(num)) return raw;
  
  // Format with Indian numbering system
  const formatter = new Intl.NumberFormat("en-IN");
  let formatted = formatter.format(Math.floor(num));
  
  // Preserve 'hrs' suffix if present in original
  if (rawString.includes('hrs') || rawString.includes('hr')) {
    formatted += " hrs";
  }
  
  // Add plus suffix only if explicitly requested (now defaults to false)
  if (addPlus && num >= 1000) {
    formatted += "+";
  }
  
  return formatted;
}

function useCountUp(target, duration = 2500, inView = false, delay = 0) {
  const [count, setCount] = useState("");
  const started = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!inView || started.current) return;
    
    // Add delay before starting
    timeoutRef.current = setTimeout(() => {
      started.current = true;
      
      const raw = String(target || "").trim();
      const numericMatch = raw.match(/[\d.,]+/);
      if (!numericMatch) {
        setCount(raw);
        return;
      }

      const numericString = numericMatch[0].replace(/,/g, "");
      const targetValue = parseFloat(numericString);
      if (!Number.isFinite(targetValue)) {
        setCount(raw);
        return;
      }

      const suffix = raw.replace(numericMatch[0], '').trim();
      const hasPlus = raw.includes('+');
      
      const step = targetValue / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + step, targetValue);
        const formatted = formatForDisplay(String(current), hasPlus);
        setCount(formatted);
        if (current >= targetValue) {
          clearInterval(timer);
          setCount(formatForDisplay(raw, hasPlus));
        }
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [inView, target, duration, delay]);

  return count || formatForDisplay(target);
}


/* ─── Tier 1: Hero Stats ─── */
function HeroStatCard({ number, label, inView, delay }) {
  const countUp = useCountUp(number, 2500, inView, delay);
  const hasPlus = String(number).includes('+');

  return (
    <div
      className="stat-card-premium"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      <div className="text-center">
        <div className="stat-value">
          {countUp}
          {hasPlus && <span className="text-[0.6em] opacity-50 ml-1">+</span>}
        </div>
        <p className="stat-label">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ─── Tier 2: Coverage Stats ─── */
function CoverageStatCard({ number, label, inView, delay }) {
  const countUp = useCountUp(number, 1800, inView, delay);
  const hasPlus = String(number).includes('+');

  return (
    <div
      className="stat-card-premium"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      <div className="text-center">
        <div className="stat-value">
          {countUp}{hasPlus && <span className="text-[0.6em] opacity-50 ml-1">+</span>}
        </div>
        <p className="stat-label">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ─── Tier 3: Dataset Details ─── */
function DatasetDetails({ images, files, malePercent, femalePercent, inView, delay }) {
  const imagesCount = useCountUp(images, 1500, inView, delay);
  const filesDisplay = files > 10000000 ? `${(files / 10000000).toFixed(1)} Cr` : formatForDisplay(String(files), false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        className="stat-card-premium"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        }}
      >
        <div className="text-center">
          <div className="stat-value">{imagesCount}</div>
          <p className="stat-label">Visual Documentation</p>
        </div>
      </div>

      <div 
        className="stat-card-premium"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity 0.8s ease ${delay + 100}ms, transform 0.8s ease ${delay + 100}ms`,
        }}
      >
        <div className="text-center">
          <div className="stat-value">{filesDisplay}</div>
          <p className="stat-label">Data Files Collected</p>
        </div>
      </div>

      <div 
        className="stat-card-premium"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity 0.8s ease ${delay + 200}ms, transform 0.8s ease ${delay + 200}ms`,
        }}
      >
        <div className="text-center">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-left">
              <div className="text-2xl font-bold" style={{ color: '#42A5F5' }}>
                {malePercent.toFixed(0)}%
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Male
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: '#42A5F5' }}>
                {femalePercent.toFixed(0)}%
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                Female
              </div>
            </div>
          </div>
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)' }}
          >
            <div
              style={{
                width: `${malePercent}%`,
                height: '100%',
                backgroundColor: '#4285F4',
                transition: 'width 0.6s ease',
              }}
            />
          </div>
          <p className="stat-label mt-4">Gender Diversity</p>
        </div>
      </div>
    </div>
  );
}

export function Stats({ stats }) {
  const [heroRef, heroInView] = useInView();
  const [coverageRef, coverageInView] = useInView();
  const [detailsRef, detailsInView] = useInView();
  
  // GSAP animations
  useStatCardsAnimation();
  useAboutAnimation();
  
  // Counter refs
  const hoursRef = useRef(null);
  const speakersRef = useRef(null);
  const languagesRef = useRef(null);
  const districtsRef = useRef(null);
  const statesRef = useRef(null);
  const transcribedRef = useRef(null);
  const imagesRef = useRef(null);
  
  // Counter animations
  useCounterAnimation(hoursRef, 31255, 2.5);
  useCounterAnimation(speakersRef, 156534, 2.8);
  useCounterAnimation(languagesRef, 109, 1.5);
  useCounterAnimation(districtsRef, 165, 1.8);
  useCounterAnimation(statesRef, 31, 1.5);
  useCounterAnimation(transcribedRef, 2043, 2.0);
  useCounterAnimation(imagesRef, 288429, 2.2);

  // Format the data
  const totalDuration = formatForDisplay(stats?.total_duration || "31,255.10 hrs", false);
  const totalSpeakers = formatForDisplay(stats?.total_speakers || "156,534", false);
  const totalLanguages = formatForDisplay(stats?.total_languages || "109", false);
  const transcriptionDuration = formatForDisplay(stats?.transcription_duration || "2,043.39 hrs", false);
  const totalDistricts = formatForDisplay(stats?.total_districts || "165", false);
  const totalStates = formatForDisplay(stats?.total_states || "31", false);
  const totalImages = formatForDisplay(stats?.total_images || stats?.image_count || "288,429", false);
  const totalFiles = stats?.total_files || 22034051;
  
  // Extract percentages for gender split
  const maleAudioRaw = stats?.male_audio || "45.57%";
  const femaleAudioRaw = stats?.female_audio || "54.37%";
  const malePercent = parseFloat(maleAudioRaw.match(/[\d.]+/)?.[0] || 45.6);
  const femalePercent = parseFloat(femaleAudioRaw.match(/[\d.]+/)?.[0] || 54.4);

  return (
    <>
      {/* ─── Impact Numbers Section ─── */}
      <section id="impact" className="relative" style={{ background: 'transparent', padding: '100px 0' }}>
        <WaveformDivider color="spectral" height={30} className="absolute top-0 left-0 right-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className="inline-block font-mono font-bold tracking-[0.3em] uppercase mb-6 text-[#4285F4]"
              style={{ 
                fontSize: '14px',
              }}
            >
              Impact
            </span>
            <h2 
              className="font-display font-bold mb-6"
              style={{ 
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              India's Voice, In Numbers
            </h2>
            <p 
              className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto"
            >
              The largest open-source speech dataset of Indian languages
            </p>
          </div>

          {/* Tier 1: Hero Stats */}
          <div 
            ref={heroRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            style={{ marginBottom: '48px' }}
          >
            <HeroStatCard 
              number={totalDuration} 
              label="Hours of Voice Data" 
              inView={heroInView} 
              delay={0} 
              ref={hoursRef}
            />
            <HeroStatCard 
              number={totalSpeakers} 
              label="Unique Voices Captured" 
              inView={heroInView} 
              delay={100} 
              ref={speakersRef}
            />
            <HeroStatCard 
              number={totalLanguages} 
              label="Languages & Dialects" 
              inView={heroInView} 
              delay={200} 
              ref={languagesRef}
            />
          </div>

          {/* Tier 2: Coverage Stats */}
          <div 
            ref={coverageRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            style={{ marginBottom: '32px' }}
          >
            <CoverageStatCard 
              number={totalDistricts} 
              label="of 773 Districts" 
              inView={coverageInView} 
              delay={300} 
              ref={districtsRef}
            />
            <CoverageStatCard 
              number={totalStates} 
              label="States & Union Territories" 
              inView={coverageInView} 
              delay={400} 
              ref={statesRef}
            />
            <CoverageStatCard 
              number={transcriptionDuration} 
              label="Hours Transcribed" 
              inView={coverageInView} 
              delay={500} 
              ref={transcribedRef}
            />
          </div>

          {/* Tier 3: Dataset Details */}
          <div 
            ref={detailsRef}
            className="w-full"
          >
            <DatasetDetails 
              images={totalImages}
              files={totalFiles}
              malePercent={malePercent}
              femalePercent={femalePercent}
              inView={detailsInView}
              delay={600}
              ref={imagesRef}
            />
          </div>
        </div>

        <WaveformDivider color="spectral" height={30} className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* ─── About / Mission ─── */}
      <section id="About" aria-label="About Project VAANI" className="about-section py-32 sm:py-48" style={{ background: 'transparent' }}>
        <Container>
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-center">
            {/* Left: Text (60%) */}
            <div className="about-text lg:col-span-3 space-y-10">
              <span className="inline-flex items-center gap-3 font-mono text-sm tracking-[0.3em] uppercase text-[#4285F4] font-bold">
                <span className="w-8 h-px bg-[#4285F4]/30" />
                About
              </span>
              <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05]">
                Mapping India's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Linguistic DNA</span>
              </h2>
              <p className="text-white/80 text-xl sm:text-2xl leading-[1.6] max-w-3xl font-light">
                India's billion+ citizens speak in hundreds of languages and thousands of dialects yet most language AI is trained on a fraction of this diversity. <span className="text-white font-medium">Project Vaani is changing that.</span> We're building a meticulously curated, open-source speech corpus spanning every district in India, capturing the authentic way Indians speak—not textbook language, but real voices from real communities.
              </p>

              {/* Tech cards */}
              <div className="tech-cards flex flex-wrap gap-3 pt-4">
                {[
                  { code: 'ASR', label: 'Automatic Speech Recognition' },
                  { code: 'SST', label: 'Speech-to-Speech Translation' },
                  { code: 'NLU', label: 'Natural Language Understanding' },
                ].map((tech) => (
                  <div
                    key={tech.code}
                    className="rounded-xl px-5 py-3 flex items-center gap-3 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] hover:bg-[#111111] transition-colors"
                  >
                    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
                      {[0.6, 1, 0.4, 0.8].map((h, i) => (
                        <div
                          key={i}
                          className="w-[2px] rounded-full bg-[#4285F4]/50 soundwave-bar"
                          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#4285F4] font-bold">{tech.code}</span>
                      <span className="text-xs text-white/70 ml-2">{tech.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Language Cube (40%) */}
            <div className="about-visual lg:col-span-2">
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <VoiceWaveHero />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
