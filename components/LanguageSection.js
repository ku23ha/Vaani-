import { useState, useEffect, useRef } from "react";

const languageData = [
  {
    name: 'Tulu',
    region: 'Coastal Karnataka & Kerala',
    family: 'Dravidian',
    description: 'Tulu has a rich oral tradition and distinct phonetic features that set it apart from other Dravidian languages, reflecting the unique cultural identity of the Tulu-speaking community.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Karnataka_DakshinKannada_Vais35676_1007110000_DakshinKannada-SPECIFIC_00770_19713_25078.wav',
    transcription: '"ಮಾತಲ ಐನ್ ಉಲಯಿ ಉಪ್ಪುಂಡು ಉಂಡು ಪಂಡ್ ದು ನೆಟ್ಟ್ ತೋಜು ಪೋಪುಂಡು ಮಸ್ತ್ ಜನ ಉಪ್ಪುವೆರ್ ನೆಟ್ಟ್."',
    color: '#E8F4FF',
    accent: '#2563EB',
  },
  {
    name: 'Bearybashe',
    region: 'Coastal Karnataka',
    family: 'Mixed (Kannada · Tulu · Urdu)',
    description: 'Bearybashe incorporates elements from Kannada, Tulu, and Urdu, making it a unique linguistic blend that reflects the diverse cultural influences in coastal Karnataka.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CBearybashe%5CIISc_VaaniProject_M_KA_DakshinKannada_Moha99609_0821160000_KTCMMAO_136341_589_4854.wav',
    transcription: '"ಇದೊರ್‌ ತಾಲ್ಲೂಕ್‌ ಆಪಿಸ್‌ ಆಯಿಟಿಕ್ಕ್‌ರ್‌ ನಂಗ ಎಂದ್ರೆ ರೇಷನ್‌ ಕಾರ್ಡ್‌ ಎಲ್ಲ ಆಧಾರ್‌ ಕಾರ್ಡ್‌ ಎಲ್ಲ ಆಕನೆಂಗ್ ಇವ್ಡೆಗೇ ಪೋಂಡೆ."',
    color: '#FFF4E8',
    accent: '#D97706',
  },
  {
    name: 'Konkani',
    region: 'Goa, Karnataka, Maharashtra',
    family: 'Indo-Aryan',
    description: 'Konkani is written in multiple scripts — Devanagari, Roman, Kannada, and Malayalam — and has a rich literary tradition with vibrant folk music and dance forms.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/Goa_NorthSouthGoa_45021854_1310240000_NorthSouthGoa-SPECIFIC_00768_17749_20736.wav',
    transcription: '"आणि ते पुतळ्यान हातींन एक खयचे बुक धर्ला."',
    color: '#F0FFF4',
    accent: '#16A34A',
  },
  {
    name: 'Malvani',
    region: 'Coastal Maharashtra',
    family: 'Indo-Aryan (Konkani-adjacent)',
    description: 'Often classified as a Konkani dialect, Malvani has distinct vocabulary and pronunciation that set it apart from both standard Marathi and Konkani, with deep cultural significance.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CMalwani%5CMalwani.wav',
    transcription: '"व छोटी मोठी झाडे शोभेसाठी ठेवलेली असत."',
    color: '#FFF0F6',
    accent: '#DB2777',
  },
  {
    name: 'Duruwa',
    region: 'Koraput (Odisha), Bastar (CG)',
    family: 'Central Dravidian',
    description: 'A Central Dravidian language spoken by the Duruwa people, with approximately 18,000 speakers in Odisha — a vital thread in the linguistic tapestry of tribal India.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CDuruwa%5CCG_Sukma_Bhun26589_0718250000_TGKTES_53632_13888_19797.wav',
    transcription: '"<noise> और सेठ होंदे न बिकट नेनर <PAUSE> माझ लेसुर खच लर </noise>"',
    color: '#F5F3FF',
    accent: '#7C3AED',
  },
  {
    name: 'Jaipuri',
    region: 'Jaipur, Rajasthan',
    family: 'Rajasthani (Indo-Aryan)',
    description: 'A dialect of Rajasthani spoken mainly around Jaipur, with distinct phonetic and lexical characteristics that highlight its cultural identity within the desert state.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CJaipuri%5CIISc_VaaniProject_S_Rajasthan_Nagaur_128325_12246613_RJNGWP_372059_8962_13085.wav',
    transcription: '"व अंडी के अन-अ-में हरी घास भी जमी हुई है बादल सफ़ेद है।"',
    color: '#FFFBEB',
    accent: '#D97706',
  },
  {
    name: 'Kurumuli',
    region: 'Karnataka & Kerala',
    family: 'Dravidian',
    description: 'Spoken by the Kuruma community, Kurumali has distinct phonological and grammatical features that showcase this community\'s unique cultural heritage.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CKurumuli%5Ckurumuli-audio.wav',
    transcription: '"आगु ई हां एक, एक टा पिछु में हीया एक, ईक टी सीसा दिखाई देह रेला एक, एकटा पोल हाय।"',
    color: '#F0FFF4',
    accent: '#059669',
  },
  {
    name: 'Kudukh',
    region: 'Jharkhand & neighbouring states',
    family: 'Munda (Dravidian)',
    description: 'Primarily spoken by the Oraon tribe, Kudukh contributes a unique grammatical and tonal structure to the Munda language family of eastern India.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CKudukh%5CIISc_VaaniProject_S_Chhattisgarh_Jashpur_114037_11795263_BHVSFA_338512_78_7200.wav',
    transcription: '"पता के हाइड्रोलिक मशीन हे के, ए हाइड्रोलिक मशीन से हमें बेठीला खाइल पिल सब परिल"',
    color: '#FFF4E8',
    accent: '#C2410C',
  },
  {
    name: 'Bajjika',
    region: 'Vaishali & Muzaffarpur, Bihar',
    family: 'Bhojpuri-adjacent (Indo-Aryan)',
    description: 'A dialect of Bhojpuri with distinct phonetic characteristics and vocabulary that reflect deep local cultural nuances of northern Bihar.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CBajjika%5CIISc_VaaniProject_S_Bihar_Vaishali_114301_11798763_TGKEV_134649_7746_14852.wav',
    transcription: '"<baby_crying> निच्चा जग हई, जग में बहुत सारा फूल हई, कुर्सी हई, फाइबर वाला। </baby_crying>"',
    color: '#E8F4FF',
    accent: '#1D4ED8',
  },
  {
    name: 'Halbi',
    region: 'Chhattisgarh & Maharashtra',
    family: 'Indo-Aryan',
    description: 'Halbi exhibits characteristics distinguishing it from standard Hindi and showcases influences from neighboring languages, occupying a unique space between tribal and mainstream speech.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CHalbi%5Cdownload.wav',
    transcription: '"बड़े मा बोर्ड लगलिसे, ए गोटोक बायले उबली से हुन बाटे लोग मन उबला सोत सब बीजी आसोत।"',
    color: '#F5F3FF',
    accent: '#6D28D9',
  },
  {
    name: 'Rajbangshi',
    region: 'West Bengal & Assam',
    family: 'Indo-Aryan',
    description: 'Spoken by the Rajbangshi community with distinct phonological and lexical features that reflect centuries of cultural heritage at the intersection of Bengal and Assam.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CRajbangshi%5CIISc_VaaniProject_S_WestBengal_Purulia_64518_9583211_BHGJTO_192503_12058_15323.wav',
    transcription: '"আর লাল রঙ্গিক করে নিয়ে রেখেছে। সেই জন্য ভালো লাগ--"',
    color: '#FFF0F6',
    accent: '#BE185D',
  },
  {
    name: 'Angika',
    region: 'Bihar & Jharkhand',
    family: 'Eastern Indo-Aryan',
    description: 'Angika shares similarities with Maithili but carries its own vocabulary and grammatical structures that reflect local traditions of the Anga region.',
    audioUrl: 'https://storage.googleapis.com/vaani-website-sample-files/C%3A%5CProject%5Cgcs%20Upload%20Code%5Cgcs_upload_separate%5CData%5CAngika%5CIISc_VaaniProject_M_BR_Bhagalpur_lucy3753480_0330040000_TGKCS_44913_9892_15985.wav',
    transcription: '"<Bird_Sound> देखइ पूरा उठाइ के लगै छे ना एकरो सर्विसिंग करी रहलो छे। </Bird_Sound>"',
    color: '#F0FFF4',
    accent: '#15803D',
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

  const nextSlide = () =>
    goToSlide((currentSlide + 1) % slides.length, 'right');

  const prevSlide = () =>
    goToSlide((currentSlide - 1 + slides.length) % slides.length, 'left');

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
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div
                className="h-1.5 w-full"
                style={{ background: language.accent }}
              />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      {language.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{language.region}</p>
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                    style={{ backgroundColor: language.color, color: language.accent }}
                  >
                    {language.family.split('(')[0].trim()}
                  </span>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                  {language.description}
                </p>

                <div
                  className="rounded-xl p-3 mb-4 text-xs italic leading-relaxed"
                  style={{ backgroundColor: language.color, color: '#374151' }}
                >
                  <span className="not-italic font-semibold text-gray-400 block mb-1 text-[10px] uppercase tracking-wider">
                    Sample transcription
                  </span>
                  {language.transcription}
                </div>

                <button
                  onClick={() => toggleAudio(language.audioUrl, index)}
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: isPlaying === index ? '#FEE2E2' : language.color,
                    color: isPlaying === index ? '#DC2626' : language.accent,
                    border: `1.5px solid ${isPlaying === index ? '#FECACA' : 'transparent'}`,
                  }}
                >
                  {isPlaying === index ? <PauseIcon /> : <PlayIcon />}
                  {isPlaying === index ? 'Pause audio' : 'Play audio sample'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-600">
            {currentSlide * itemsPerSlide + 1}–{Math.min((currentSlide + 1) * itemsPerSlide, languageData.length)}
          </span>{' '}
          of <span className="font-semibold text-gray-600">{languageData.length}</span> languages
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
                  backgroundColor: i === currentSlide ? '#212191' : '#D1D5DB',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={prevSlide}
              disabled={animating}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[#212191] hover:text-[#212191] hover:bg-[#212191]/5 transition-all duration-200 disabled:opacity-40"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              disabled={animating}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:border-[#212191] hover:text-[#212191] hover:bg-[#212191]/5 transition-all duration-200 disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
