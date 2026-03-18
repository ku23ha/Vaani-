"use client";

import { Container } from "./Container";
import { useInView } from "../hooks/useInView";

function formater(num) {
  const CurrencyFormater = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  });
  const formatString = CurrencyFormater.format(num);
  let cleanedInput = formatString.substring(1);
  let dotIndex = cleanedInput.indexOf(".");
  if (dotIndex !== -1) cleanedInput = cleanedInput.slice(0, dotIndex);
  return cleanedInput;
}

function formatStats(stat) {
  if (!stat) return "";
  return stat.replace(/(\d+)([A-Za-z]+)/, "$1 $2");
}

function StatCard({ title, value, icon, delay, inView }) {
  return (
    <div
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#212191]" style={{ background: 'rgba(33,33,145,0.08)' }}>
            {icon}
          </div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider leading-tight">{title}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value || '—'}</p>
      </div>
    </div>
  );
}

const MicIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>;
const UsersIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const GlobeIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const FileIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const MapIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const ImageIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const MaleIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="10" cy="14" r="5"/><line x1="19" y1="5" x2="14.14" y2="9.86"/><polyline points="15 5 19 5 19 9"/></svg>;
const FemaleIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></svg>;
const ClockIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const FlagIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;

export function Stats({ stats }) {
  const [headRef, headInView] = useInView();
  const [textRef, textInView] = useInView();
  const [gridRef, gridInView] = useInView();

  const totalFiles = formater(stats?.total_Files) ?? "";
  const totalDuration = stats?.total_duration ?? "";
  const totalSpeakers = formater(stats?.total_speakers) ?? "";
  const maleSpeakers = stats?.male_Speakers ?? "";
  const femaleSpeakers = stats?.female_Speakers ?? "";
  const totalDistricts = stats?.total_districts ?? "";
  const totalStates = stats?.total_states ?? "";
  const transcription_duration = stats.transcription_duration ?? "";
  const total_languages = stats.total_languages;
  const total_images = stats.total_images;

  const statCards = [
    { title: "Total Duration", value: formatStats(totalDuration), icon: <ClockIcon /> },
    { title: "Total Speakers", value: totalSpeakers, icon: <UsersIcon /> },
    { title: "Total Languages", value: total_languages, icon: <GlobeIcon /> },
    { title: "Transcription Duration", value: formatStats(transcription_duration), icon: <MicIcon /> },
    { title: "Districts Covered", value: totalDistricts, icon: <MapIcon /> },
    { title: "States & UTs", value: totalStates, icon: <FlagIcon /> },
    { title: "Total Images", value: total_images, icon: <ImageIcon /> },
    { title: "Male Audio", value: maleSpeakers, icon: <MaleIcon /> },
    { title: "Female Audio", value: femaleSpeakers, icon: <FemaleIcon /> },
    { title: "Total Files", value: totalFiles, icon: <FileIcon /> },
  ];

  return (
    <section id="About" aria-label="About Project VAANI" className="py-24 sm:py-32 bg-[#FAFAFA]">
      <Container>
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#212191] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#212191] inline-block" />
            About
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight max-w-xl leading-tight">
            About Project VAANI
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div
            ref={textRef}
            className="space-y-5 text-gray-600 leading-relaxed text-base"
            style={{
              opacity: textInView ? 1 : 0,
              transform: textInView ? 'translateX(0)' : 'translateX(-28px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <p>
              Digital India is marching ahead inexorably. Digital interfaces and communications have become critical for access to information, entertainment, economic opportunities and even essential services such as healthcare.
            </p>
            <p>
              Project Vaani, by IISc, Bangalore and ARTPARK, is capturing the true diversity of India's spoken languages to propel language AI technologies and content for an inclusive Digital India.
            </p>
            <p>
              We expect to create data corpora of over 150,000 hours of speech, part of which will be transcribed in local scripts, while ensuring linguistic, educational, urban-rural, age, and gender diversity. These diligently collected and curated datasets of natural speech and text from about 1 million people across all 773 districts of India will be open-sourced.
            </p>
            <p>
              This will boost the development of technologies such as automatic speech recognition (ASR), speech to speech translation (SST), and natural language understanding (NLU) that reflect the ground realities of how Indians speak.
            </p>
            <p className="font-semibold text-[#212191]">
              Google is funding the Project Vaani.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-2 gap-3">
            {statCards.map((card, i) => (
              <StatCard
                key={card.title}
                title={card.title}
                value={card.value}
                icon={card.icon}
                delay={i * 55}
                inView={gridInView}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
