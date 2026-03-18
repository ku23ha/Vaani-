"use client";

import { useState, useEffect, useRef } from 'react';
import { Container } from "./Container";
import { useInView } from "../hooks/useInView";
import WaveformDivider from './WaveformDivider';
import { VoiceWaveHero } from './VoiceWaveHero';

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

function formatDuration(raw) {
  if (!raw) return "";
  const hasHr = /hr/i.test(raw);
  const number = formatNumber(raw, { maximumFractionDigits: 2 });
  // Use a non-breaking space to keep the unit on the same line
  return hasHr ? `${number}\u00A0hr` : number;
}

function formatWithSuffix(raw) {
  if (!raw) return "";
  const suffix = String(raw).replace(/[\d.,\s%]+/g, '').trim();
  const formatted = formatNumber(raw);
  // Keep suffix attached to the number to prevent wrapping across lines
  return suffix ? `${formatted}\u00A0${suffix}` : formatted;
}

function useCountUp(target, duration = 2000, inView = false) {
  const [count, setCount] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const raw = String(target || "").trim();
    const match = raw.match(/[\d.,]+/);
    if (!match) {
      setCount(raw);
      return;
    }

    const numericString = match[0].replace(/,/g, "");
    const targetValue = parseFloat(numericString);
    if (!Number.isFinite(targetValue)) {
      setCount(raw);
      return;
    }

    const suffix = raw.replace(match[0], '').trim();
    const decimals = (numericString.split('.')[1] || '').length;
    const formatter = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });

    const step = targetValue / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, targetValue);
      const formatted = formatter.format(current);
      setCount(suffix ? `${formatted} ${suffix}` : formatted);
      if (current >= targetValue) {
        clearInterval(timer);
        setCount(suffix ? `${formatter.format(targetValue)} ${suffix}` : formatter.format(targetValue));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count || target;
}

/* Impact Number Card */
function ImpactMetric({ number, label, color, inView, delay }) {
  return (
    <div
      className="flex h-full min-w-[180px] flex-col items-center justify-center gap-2 text-center rounded-xl p-4 sm:p-5 shadow-sm"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(26, 26, 46, 0.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <span
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mono tracking-tight counter-number leading-tight max-w-full break-words whitespace-normal"
        style={{ color }}
      >
        {number}
      </span>
      <span className="text-sm text-[#1A1A2E]/60 font-medium tracking-wide">{label}</span>
    </div>
  );
}

export function Stats({ stats }) {
  const [bandRef, bandInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [vizRef, vizInView] = useInView();

  const totalDuration = formatDuration(stats?.total_duration || "");
  const totalSpeakers = formatNumber(stats?.total_speakers || "");
  const totalLanguages = formatNumber(stats?.total_languages || "");
  const transcriptionDuration = formatDuration(stats?.transcription_duration || "");
  const totalDistricts = formatNumber(stats?.total_districts || "");
  const totalStates = formatNumber(stats?.total_states || "");
  const totalImages = formatNumber(stats?.total_images || stats?.image_count || "");
  const totalFiles = formatNumber(stats?.total_files || "");
  const maleAudio = formatWithSuffix(stats?.male_audio || "");
  const femaleAudio = formatWithSuffix(stats?.female_audio || "");

  const impactMetrics = [
    { number: totalDuration || '31,255.10 hr', label: 'Total Duration', color: '#42A5F5' },
    { number: totalSpeakers || '1,56,534', label: 'Total Speakers', color: '#42A5F5' },
    { number: totalLanguages || '109', label: 'Total Languages', color: '#42A5F5' },
    { number: transcriptionDuration || '2,043.39 hr', label: 'Transcription Duration', color: '#42A5F5' },
    { number: totalDistricts || '165', label: 'Districts Covered', color: '#42A5F5' },
    { number: totalStates || '31', label: 'States & UT Covered', color: '#42A5F5' },
    { number: totalImages || '2,88,429', label: 'Total Images', color: '#42A5F5' },
    { number: totalFiles || '22,034,051', label: 'Total Files', color: '#42A5F5' },
    { number: maleAudio || '45.57 %', label: 'Male Audio', color: '#42A5F5' },
    { number: femaleAudio || '54.37 %', label: 'Female Audio', color: '#42A5F5' },
  ];

  // Call hooks individually (can't use .map() — Rules of Hooks)
  const countUp0 = useCountUp(impactMetrics[0].number, 2000, bandInView);
  const countUp1 = useCountUp(impactMetrics[1].number, 2000, bandInView);
  const countUp2 = useCountUp(impactMetrics[2].number, 2000, bandInView);
  const countUp3 = useCountUp(impactMetrics[3].number, 2000, bandInView);
  const countUp4 = useCountUp(impactMetrics[4].number, 2000, bandInView);
  const countUp5 = useCountUp(impactMetrics[5].number, 2000, bandInView);
  const countUp6 = useCountUp(impactMetrics[6].number, 2000, bandInView);
  const countUp7 = useCountUp(impactMetrics[7].number, 2000, bandInView);
  const countUp8 = useCountUp(impactMetrics[8].number, 2000, bandInView);
  const countUp9 = useCountUp(impactMetrics[9].number, 2000, bandInView);
  const countUps = [
    countUp0,
    countUp1,
    countUp2,
    countUp3,
    countUp4,
    countUp5,
    countUp6,
    countUp7,
    countUp8,
    countUp9,
  ];

  return (
    <>
      {/* Impact Numbers Strip */}
      <section id="impact" className="relative" style={{ background: '#FFFFFF', padding: '100px 0' }}>
        <WaveformDivider color="spectral" height={30} className="absolute top-0 left-0 right-0" />

        <div ref={bandRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {impactMetrics.map((metric, i) => (
              <ImpactMetric
                key={metric.label}
                number={countUps[i]}
                label={metric.label}
                color={metric.color}
                inView={bandInView}
                delay={i * 100}
              />
            ))}
          </div>
        </div>

        <WaveformDivider color="spectral" height={30} className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* About / Mission */}
      <section id="About" aria-label="About Project VAANI" className="py-24 sm:py-32" style={{ background: '#F5F7FA' }}>
        <Container>
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left: Text (60%) */}
            <div
              ref={aboutRef}
              className="lg:col-span-3 space-y-6"
            >
              <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#42A5F5]">
                About
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1A1A2E] tracking-tight leading-tight">
                Mapping India's Linguistic DNA
              </h2>
              <p className="text-[#1A1A2E]/60 text-lg leading-relaxed max-w-2xl">
                India's billion+ citizens speak in hundreds of languages and thousands of dialects yet most language AI is trained on a fraction of this diversity. Project Vaani is changing that. We're building a meticulously curated, open-source speech corpus spanning every district in India, capturing the authentic way Indians speak not textbook language, but real voices from real communities.
              </p>

              {/* Tech cards */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { code: 'ASR', label: 'Automatic Speech Recognition' },
                  { code: 'SST', label: 'Speech-to-Speech Translation' },
                  { code: 'NLU', label: 'Natural Language Understanding' },
                ].map((tech) => (
                  <div
                    key={tech.code}
                    className="glass rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
                      {[0.6, 1, 0.4, 0.8].map((h, i) => (
                        <div
                          key={i}
                          className="w-[2px] rounded-full bg-[#42A5F5]/50 soundwave-bar"
                          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#42A5F5] font-bold">{tech.code}</span>
                      <span className="text-xs text-[#1A1A2E]/40 ml-2">{tech.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Language Cube (40%) */}
            <div
              ref={vizRef}
              className="lg:col-span-2"
              style={{
                opacity: vizInView ? 1 : 0,
                transform: vizInView ? 'scale(1)' : 'scale(0.9)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                perspective: '1200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
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
