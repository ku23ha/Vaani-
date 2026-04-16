import { DownloadSection } from "../components/DownloadSection";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ArticlesSection } from "../components/ArticlesSection";
import { Stats } from "../components/Stats";
import EuphoniaSection from "../components/EuphoniaSection";
import { ExploreData } from "../components/ExploreData";
import { Team } from "../components/Team";
import { Partners } from "../components/Partners";
import { TestimonialsSection } from '../components/TestimonialsSection';
import ScrollReveal from '../components/ScrollReveal';
import IndicTransition from '../components/IndicTransition';
import SectionDivider from '../components/SectionDivider';
import AIPlayground from '../components/AILab/AIPlayground';
import { VisionStatement } from '../components/VisionStatement';
import { useState, useEffect } from "react";

export default function Home({ data }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: '#FFFFFF' }}>
      {/* Global Vignette effect */}
      <div className="euphonia-vignette" />

      {/* Scroll progress indicator */}
      <div className="scroll-progress" aria-hidden="true" />

      {isClient && <Header />}
      <main>
        <Hero />
        <IndicTransition />

        {/* Stats — smooth fade reveal */}
        <ScrollReveal variant="fadeUp" duration={1} delay={0.1}>
          <Stats stats={data.stats} />
        </ScrollReveal>

        {/* Stats → Euphonia */}
        <SectionDivider variant="voiceflow" accent="#4285F4" height={100} />

        {/* Project Euphonia Section */}
        <EuphoniaSection />

        {/* Euphonia → Mission */}
        <SectionDivider variant="voiceflow" accent="#4285F4" height={120} />

        {/* Mission Statement */}
        <ScrollReveal variant="fadeUp" duration={1}>
          <VisionStatement />
        </ScrollReveal>

        {/* ExploreData — smooth reveal */}
        <ScrollReveal variant="fadeUp" duration={1} delay={0.1}>
          <ExploreData data={data} />
        </ScrollReveal>

        {/* ExploreData → Download */}
        <SectionDivider variant="voiceflow" accent="#34A853" height={100} />

        {/* Download — organic scale-rotate */}
        <ScrollReveal variant="splitFade" duration={1}>
          <DownloadSection />
        </ScrollReveal>

        {/* Download → Team */}
        <SectionDivider variant="voiceflow" accent="#FBBC04" height={100} />

        {/* Team — deep parallax float */}
        <ScrollReveal variant="parallaxUp" duration={1.2}>
          <Team />
        </ScrollReveal>

        {/* Team → Partners */}
        <SectionDivider variant="voiceflow" accent="#EA4335" height={100} />

        {/* Partners — scale entrance */}
        <ScrollReveal variant="scaleUp" duration={0.9} delay={0.05}>
          <Partners />
        </ScrollReveal>

        {/* Partners → BuiltWithVaani */}
        <SectionDivider variant="dots" colorFrom="#FFFFFF" colorTo="#FFFFFF" height={80} />

        {/* BuiltWithVaani — case studies */}
        <ScrollReveal variant="fadeUp" duration={1}>
          <TestimonialsSection />
        </ScrollReveal>

        {/* BuiltWithVaani → Articles */}
        <SectionDivider variant="voiceflow" accent="#4285F4" height={100} />

        {/* Articles — slide from right */}
        <ScrollReveal variant="fadeRight" duration={1}>
          <ArticlesSection />
        </ScrollReveal>

        {/* Articles → FAQs */}
        <SectionDivider variant="voiceflow" accent="#EA4335" height={100} />

        {/* FAQs — parallax */}
        <ScrollReveal variant="parallaxUp" duration={1.1}>
          <Faqs />
        </ScrollReveal>

        {/* FAQs → Footer */}
        <SectionDivider variant="voiceflow" accent="#4285F4" height={120} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let url = null;
  try {
    url = new URL(
      `https://hub.vaani.artpark.ai/api/stats?data_source=${"VAANI"}`
    );
  } catch (e) {
    url = new URL(
      `https://hub.vaani.artpark.ai/api/stats?data_source=${"VAANI"}`
    );
  }

  let stats = null;

  try {
    let res = await fetch(url.toString());
    stats = await res.json();
  } catch (error) {
    console.log(error);
  }

  console.log(stats);

  const district_data = stats?.map_data?.districtwisedata?.map((item) => {
    return {
      id: item.district,
      district: item.district,
      state: item.state,
      duration_per_district_hrs: Number(item.duration_hours),
      spks_per_district: item.speaker_count,
      transcription_duration: item.transcription_duration,
    };
  });

  const state_data = stats?.map_data?.statewisedata?.map((item) => {
    return {
      id: item.state,
      total_duration_hrs: Number(item.duration_hours),
      total_speakers: item.speaker_count,
      transcription_duration_state: item.transcription_duration,
      language_duration_string: item.language_duration_string,
    };
  });

  // Calculate aggregates from the new API data
  const aggregates = {
    total_speakers: stats?.total_speakers || 0,
    total_files: stats?.total_files || 0,
    total_duration_hrs: parseFloat(stats?.total_duration?.replace('hr', '') || 0),
    transcription_duration: parseFloat(stats?.transcription_duration?.replace('hr', '') || 0),
    total_languages: stats?.language_count || 0,
    total_images: stats?.image_count || 0,
  };

  const data = {
    stats: {
      total_Files: stats?.total_files,
      total_duration: stats?.total_duration,
      total_speakers: stats?.total_speakers,
      male_Speakers: stats?.male_audio,
      female_Speakers: stats?.female_audio,
      total_districts: stats?.total_districts,
      total_states: stats?.total_states,
      transcription_duration: stats?.transcription_duration,
      total_languages: stats?.language_count,
      total_images: stats?.image_count,
    },
    data: {
      all: district_data || [],
    },
    stateWiseAggregates: {
      all: state_data || [],
    },
    aggregates: {
      all: aggregates,
    },
  };

  return {
    props: {
      data,
    },
    revalidate: 600,
  };
}
