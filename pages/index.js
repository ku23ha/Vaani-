import { DownloadSection } from "../components/DownloadSection";
import { Faqs } from "../components/Faqs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ArticlesSection } from "../components/ArticlesSection";
import { Stats } from "../components/Stats";
import { ExploreData } from "../components/ExploreData";
import { Team } from "../components/Team";
import { Partners } from "../components/Partners";
import { useState, useEffect } from "react";
import { districtwisedata, statewisedata } from "../src/data/info";
import LowResource from "../components/LowResourse";

export default function Home({ data }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className={"bg-[#FAFAFA]"}>
      {isClient && <Header />}
      <main>
        <Hero />
        <Stats stats={data.stats} />
        <ExploreData data={data} />
        <DownloadSection />
        <Team />
        <Partners />
        {/*<LowResource />*/}
        <ArticlesSection />
        <Faqs />
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
