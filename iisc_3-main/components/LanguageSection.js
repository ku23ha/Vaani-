import { useState, useEffect, useRef } from "react";

const languageData = [
  {
    name: 'Tulu',
    region: 'Coastal Karnataka & Kerala',
    family: 'Dravidian',
    description: 'A rich oral tradition with distinct phonetic features, reflecting the unique cultural identity of the Tulu-speaking community.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Karnataka_DakshinKannada_Vais35676_1007110000_DakshinKannada-SPECIFIC_00770_19713_25078.wav',
    transcription: '"ಮಾತಲ ಐನ್ ಉಲಯಿ ಉಪ್ಪುಂಡು ಉಂಡು..."',
  },
  {
    name: 'Bearybashe',
    region: 'Coastal Karnataka',
    family: 'Kannada · Tulu · Urdu',
    description: 'A unique blend of Kannada, Tulu, and Urdu reflecting diverse cultural influences in coastal Karnataka.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CBearybashe%5CIISc_VaaniProject_M_KA_DakshinKannada_Moha99609_0821160000_KTCMMAO_136341_589_4854.wav',
    transcription: '"ಇದೊರ್‌ ತಾಲ್ಲೂಕ್‌ ಆಪಿಸ್‌..."',
  },
  {
    name: 'Konkani',
    region: 'Goa, Karnataka, Maharashtra',
    family: 'Indo-Aryan',
    description: 'Written in multiple scripts  Devanagari, Roman, Kannada, and Malayalam  with a rich literary tradition.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Goa_NorthSouthGoa_45021854_1310240000_NorthSouthGoa-SPECIFIC_00768_17749_20736.wav',
    transcription: '"आणि ते पुतळ्यान हातींन एक..."',
  },
  {
    name: 'Malvani',
    region: 'Coastal Maharashtra',
    family: 'Indo-Aryan',
    description: 'Distinct vocabulary and pronunciation that set it apart from both standard Marathi and Konkani.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CMalwani%5CMalwani.wav',
    transcription: '"व छोटी मोठी झाडे शोभेसाठी..."',
  },
  {
    name: 'Duruwa',
    region: 'Koraput (Odisha), Bastar (CG)',
    family: 'Central Dravidian',
    description: 'Spoken by the Duruwa people with ~18,000 speakers  a vital thread in tribal India\'s linguistic tapestry.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CDuruwa%5CCG_Sukma_Bhun26589_0718250000_TGKTES_53632_13888_19797.wav',
    transcription: '"और सेठ होंदे न बिकट नेनर..."',
  },
  {
    name: 'Bajjika',
    region: 'Vaishali & Muzaffarpur, Bihar',
    family: 'Indo-Aryan',
    description: 'A dialect with distinct characteristics and vocabulary reflecting deep local cultural nuances of northern Bihar.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CBajjika%5CIISc_VaaniProject_S_Bihar_Vaishali_114301_11798763_TGKEV_134649_7746_14852.wav',
    transcription: '"निच्चा जग हई, जग में बहुत सारा फूल..."',
  },
  {
    name: 'Halbi',
    region: 'Chhattisgarh & Maharashtra',
    family: 'Indo-Aryan',
    description: 'Occupies a unique space between tribal and mainstream speech with influences from neighboring languages.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CHalbi%5Cdownload.wav',
    transcription: '"बड़े मा बोर्ड लगलिसे..."',
  },
  {
    name: 'Rajbangshi',
    region: 'West Bengal & Assam',
    family: 'Indo-Aryan',
    description: 'Spoken with distinct phonological features reflecting centuries of heritage at the intersection of Bengal and Assam.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CRajbangshi%5CIISc_VaaniProject_S_WestBengal_Purulia_64518_9583211_BHGJTO_192503_12058_15323.wav',
    transcription: '"আর লাল রঙ্গিক করে নিয়ে রেখেছে..."',
  },
  {
    name: 'Angika',
    region: 'Bihar & Jharkhand',
    family: 'Eastern Indo-Aryan',
    description: 'Shares similarities with Maithili but carries its own vocabulary and grammatical structures from the Anga region.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CAngika%5CIISc_VaaniProject_M_BR_Bhagalpur_lucy3753480_0330040000_TGKCS_44913_9892_15985.wav',
    transcription: '"देखइ पूरा उठाइ के लगै छे ना..."',
  },
];

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

/* Mini waveform that animates when playing */
function PlayingWaveform() {
  return (
    <div className="flex items-end gap-[2px] h-4" aria-hidden="true">
      {[0.6, 1, 0.4, 0.8, 0.5, 1, 0.3].map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full bg-[#42A5F5] soundwave-bar"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

export default function LanguageSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const [isPlaying, setIsPlaying] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const audioRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const slides = [];
  for (let i = 0; i < languageData.length; i += itemsPerSlide) {
    slides.push(languageData.slice(i, i + itemsPerSlide));
  }

  const goToSlide = (next, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(next);
      setAnimating(false);
    }, 300);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length, 'right');
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length, 'left');

  const toggleAudio = (audioUrl, index) => {
    if (audioRef.current && isPlaying === index) {
      audioRef.current.pause();
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const newAudio = new Audio(audioUrl);
      audioRef.current = newAudio;
      setIsPlaying(index);
      newAudio.play();
      newAudio.onended = () => setIsPlaying(null);
    }
  };

  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === 'right' ? 'translateX(-24px)' : 'translateX(24px)'
              : 'translateX(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {slides[currentSlide]?.map((language, index) => (
            <div
              key={language.name}
              className="group bg-[#FFFFFF] border border-[rgba(0,50,120,0.08)] rounded-2xl overflow-hidden hover:bg-[#F0F6FF] transition-all duration-300 shadow-[0_4px_24px_rgba(0,50,120,0.04)] hover:shadow-[0_8px_32px_rgba(0,50,120,0.08)]"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#42A5F5] via-[#64B5F6] to-[#42A5F5]" />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[#0A1628] text-lg leading-tight">
                      {language.name}
                    </h3>
                    <p className="text-xs text-[#3D5A80] mt-0.5">{language.region}</p>
                  </div>
                  <span className="text-xs font-mono text-[#42A5F5] bg-[rgba(66, 165, 245,0.1)] px-2.5 py-1 rounded-full flex-shrink-0 ml-2">
                    {language.family.split('(')[0].trim()}
                  </span>
                </div>

                <p className="text-sm text-[#3D5A80] leading-relaxed flex-1 mb-5">
                  {language.description}
                </p>

                {/* Transcription sample */}
                <div className="rounded-xl p-3 mb-4 text-xs italic leading-relaxed bg-[#F0F6FF] border border-[rgba(0,50,120,0.08)]">
                  <span className="not-italic font-semibold text-[#8DA9C4] block mb-1 text-[10px] uppercase tracking-wider font-mono">
                    Sample transcription
                  </span>
                  <span className="text-[#0A1628]">{language.transcription}</span>
                </div>

                {/* Play button */}
                <button
                  onClick={() => toggleAudio(language.audioUrl, index)}
                  className={`w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isPlaying === index
                      ? 'bg-[rgba(66, 165, 245,0.1)] text-[#42A5F5] border border-[rgba(66, 165, 245,0.3)]'
                      : 'bg-[#F0F6FF] text-[#3D5A80] border border-[rgba(0,50,120,0.08)] hover:text-[#0A1628] hover:bg-[#E4EFFF]'
                    }`}
                >
                  {isPlaying === index ? (
                    <>
                      <PlayingWaveform />
                      Pause audio
                    </>
                  ) : (
                    <>
                      <PlayIcon />
                      Play audio sample
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-[#3D5A80]">
          Showing{' '}
          <span className="font-semibold text-[#0A1628]">
            {currentSlide * itemsPerSlide + 1} - {Math.min((currentSlide + 1) * itemsPerSlide, languageData.length)}
          </span>{' '}
          of <span className="font-semibold text-[#0A1628]">{languageData.length}</span> languages
        </p>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i, i > currentSlide ? 'right' : 'left')}
                className="transition-all duration-200"
                style={{
                  width: i === currentSlide ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: i === currentSlide ? '#42A5F5' : 'rgba(0,50,120,0.15)',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={prevSlide}
              disabled={animating}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[rgba(0,50,120,0.15)] text-[#3D5A80] hover:border-[rgba(66, 165, 245,0.4)] hover:text-[#42A5F5] transition-all duration-200 disabled:opacity-40"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              disabled={animating}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[rgba(0,50,120,0.15)] text-[#3D5A80] hover:border-[rgba(66, 165, 245,0.4)] hover:text-[#42A5F5] transition-all duration-200 disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
