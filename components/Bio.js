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
    subBio: "Associate Professor, Dept of Electrical Engineering, IISc Bangalore",
    bio: "Prasanta Kumar Ghosh received his Ph.D. in Electrical Engineering from University of Southern California (USC), Los Angeles, USA in 2011. During 2011-2012 he was with IBM India Research Lab (IRL) as a researcher. He was awarded the INSPIRE faculty fellowship from Department of Science and Technology (DST), Govt. of India in 2012. His research interests are in human centered signal processing with applications to education and health care.",
  },
  {
    id: "2",
    name: "Raghu Dharmaraju",
    image: RaghuramdImage,
    subBio: "CEO, Artpark",
    bio: "A highly experienced innovator with over two decades of experience conceiving and scaling pioneering institutions and innovations. He has launched a portfolio of eight AI innovations, including TRACE-TB, a major national initiative. He has raised $19 million from the Gates Foundation, USAID, and Google.org. He holds a B.Tech from IIT Madras, an M.S. from the University of Massachusetts, Amherst, and an M.B.A. from Cornell.",
  },
  {
    id: "3",
    name: "Nihar Desai",
    image: NiharImage,
    subBio: "Program Lead",
    bio: "Nihar comes with a decade of experience spanning strategy, operations & program management. A seasoned management generalist, he has a knack for understanding technology and is passionate for its applications for creating societal impact. Having been an entrepreneur for half a decade, he has led strategy, product and technology operations at large startups. He finished his B.Tech from NIT Surat and earned his MBA from ISB.",
  },
];

function BioCard({ item, index }) {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.75s ease ${index * 120}ms, transform 0.75s ease ${index * 120}ms`,
      }}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-400 overflow-hidden"
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
        <div className="md:w-64 lg:w-72 flex-shrink-0">
          <div className="relative h-72 md:h-full w-full overflow-hidden">
            <Image
              className="object-cover w-full h-full"
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 768px) 18rem, 100vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.15))' }} />
          </div>
        </div>

        <div className="flex-1 p-8 lg:p-10 flex flex-col justify-center">
          <div className="mb-1">
            <span className="text-xs font-semibold text-[#212191] uppercase tracking-widest">Project Vaani</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1 mb-1">
            {item.name}
          </h3>
          <p className="text-sm font-semibold text-gray-500 mb-5">{item.subBio}</p>
          <div className="w-10 h-px bg-[#212191] mb-5 opacity-40" />
          <p className="text-gray-600 leading-relaxed text-base">{item.bio}</p>
        </div>
      </div>
    </div>
  );
}

function Bio() {
  return (
    <div className="space-y-6">
      {bioData.map((item, index) => (
        <BioCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

export default Bio;
