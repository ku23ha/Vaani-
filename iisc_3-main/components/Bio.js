import Image from 'next/image';
import PrashantaImage from '../assets/Prasanta_Kumar_Ghosh.jpg';
import RaghuramdImage from '../assets/raghuramd.png';
import NiharImage from '../assets/Nihar6.png';
import { useInView } from '../hooks/useInView';

const bioData = [
  {
    id: "1",
    name: "Dr. Prasanta Kumar Ghosh",
    image: PrashantaImage,
    title: "Associate Professor, EE Dept, IISc Bangalore",
    bio: "Leading the technical architecture of Vaani's speech corpus and AI pipeline. His research in human-centered signal processing drives the project's data collection and quality standards.",
  },
  {
    id: "2",
    name: "Raghu Dharmaraju",
    image: RaghuramdImage,
    title: "CEO, ARTPARK",
    bio: "Scaling AI innovations from lab to national impact across healthcare, agriculture, and language. He has raised $19M from the Gates Foundation, USAID, and Google.org.",
  },
  {
    id: "3",
    name: "Nihar Desai",
    image: NiharImage,
    title: "Program Lead",
    bio: "Managing large-scale data operations across 773 districts with a decade of strategy and operations experience. He bridges technology and ground-level execution.",
  },
];

function BioCard({ item, index }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className="glass rounded-2xl overflow-hidden hover:bg-[#111111] transition-colors duration-300 group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        background: '#0A0A0A',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="flex flex-col items-center text-center p-8">
        {/* Circular photo with blue glow */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 ring-2 ring-[#4285F4]/30 group-hover:ring-[#4285F4]/60 transition-all duration-300">
          <Image
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
          />
          <div className="absolute inset-0 rounded-full shadow-inner" style={{ boxShadow: 'inset 0 0 20px rgba(66, 133, 244,0.3)' }} />
        </div>

        {/* Name & Title */}
        <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
        <p className="text-sm text-[#4285F4] font-medium mb-4">{item.title}</p>

        {/* Short bio */}
        <p className="text-sm text-white/70 leading-relaxed max-w-xs">{item.bio}</p>
      </div>
    </div>
  );
}

function Bio() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {bioData.map((item, index) => (
        <BioCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

export default Bio;
