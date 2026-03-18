'use client';

import { Container } from './Container';
import HomepageDataAndMaps from './HomepageDataAndMaps';
import LanguageSection from './LanguageSection';
import { useInView } from '../hooks/useInView';

export function ExploreData({ data }) {
  const [headRef, headInView] = useInView();
  const [mapRef, mapInView] = useInView();
  const [gemsRef, gemsInView] = useInView();

  return (
    <section
      id="Data"
      aria-label="Explore India's Vernacular Vista"
      className="py-20 sm:py-28 bg-white overflow-hidden"
    >
      <Container>
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#212191] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#212191] inline-block" />
            Explore Data
          </span>
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-5">
              Explore India's<br />
              <span className="text-[#212191]">Vernacular Vista</span> with Vaani
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Explore the linguistic diversity of India in a click. Our dataset is intended to be a treasure trove of speech data from across India's districts — a comprehensive overview emphasizing language variety, providing a unique glimpse into India's rich cultural tapestry.
            </p>
          </div>
        </div>

        <div
          ref={mapRef}
          style={{
            opacity: mapInView ? 1 : 0,
            transform: mapInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}
          className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:p-6 shadow-sm mb-10"
        >
          <HomepageDataAndMaps data={data} />
        </div>

        <div className="flex items-center gap-4 my-12">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#212191]/20 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[#212191]/40" />
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[#212191]/20 to-transparent" />
        </div>

        <div
          ref={gemsRef}
          style={{
            opacity: gemsInView ? 1 : 0,
            transform: gemsInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#212191] uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#212191] inline-block" />
              Rare Languages
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Discovering the Linguistic Gems
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              As we go from district to district, collecting the language of choice by speakers, we have come across some not-so-common languages — some may not even be part of the latest census of India.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gradient-to-b from-[#FAFAFE] to-white p-6 sm:p-10 shadow-sm">
            <LanguageSection />
          </div>
        </div>
      </Container>
    </section>
  );
}
