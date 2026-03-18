'use client';

import { useState } from 'react';
import { Container } from './Container';
import HomepageDataAndMaps from './HomepageDataAndMaps';
import LanguageSection from './LanguageSection';
import { useInView } from '../hooks/useInView';
import WaveformDivider from './WaveformDivider';

export function ExploreData({ data }) {
  const [headRef, headInView] = useInView();
  const [mapRef, mapInView] = useInView();
  const [gemsRef, gemsInView] = useInView();

  return (
    <section
      id="Data"
      aria-label="India's Voice Atlas"
      className="py-20 sm:py-28 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      <Container>
        {/* Section header */}
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
            Data Explorer
          </span>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
              Hear India <span className="text-gradient-accent">Speak</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Explore the linguistic diversity of India in a click. Click on the states to explore their linguistic landscape a comprehensive overview of India's rich cultural tapestry.
            </p>
          </div>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          style={{
            opacity: mapInView ? 1 : 0,
            transform: mapInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}
          className="rounded-2xl glass p-4 sm:p-6 mb-10"
        >
          <HomepageDataAndMaps data={data} />
        </div>

        {/* Divider */}
        <WaveformDivider color="spectral" height={30} className="my-12" />

        {/* Linguistic Gems */}
        <div
          ref={gemsRef}
          style={{
            opacity: gemsInView ? 1 : 0,
            transform: gemsInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
              Discoveries
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Languages You've Never Heard Of
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              As we traveled district to district, we encountered languages that barely exist in any census.
            </p>
          </div>

          <LanguageSection />
        </div>
      </Container>
    </section>
  );
}
