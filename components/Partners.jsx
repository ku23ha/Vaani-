import Image from 'next/image';
import { Container } from './Container';
import { useInView } from '../hooks/useInView';
import Logo1 from '../assets/ShaipLogo.png';
import Logo2 from '../assets/Megdaplogo.png';
import Logo3 from '../assets/Karya-Logo.png';
import Logo4 from '../assets/GcsLogo.png';
import Logo7 from '../assets/GtsLogo.png';
import MeityLogo from '../assets/Meity.png';
import NewronLogo from '../assets/newron-logo2x.png';

const partners = [
  { src: Logo4, alt: "GCS", width: 110 },
  { src: Logo2, alt: "Megdap", width: 120 },
  { src: Logo3, alt: "Karya", width: 110 },
  { src: Logo1, alt: "Shaip", width: 100 },
  { src: Logo7, alt: "GTS", width: 110 },
  { src: MeityLogo, alt: "MeitY", width: 110 },
  { src: NewronLogo, alt: "Newron", width: 120 },
];

const doubledPartners = [...partners, ...partners];

export function Partners() {
  const [headRef, headInView] = useInView();
  const [marqueeRef, marqueeInView] = useInView();

  return (
    <section id="partners" className="bg-[#FAFAFA] py-20 border-t border-gray-100">
      <Container>
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#212191] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#212191] inline-block" />
            Partners
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Built Together with India
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-base">
            A collaborative effort across organizations committed to advancing Indian language AI.
          </p>
        </div>

        <div
          ref={marqueeRef}
          className="relative overflow-hidden"
          style={{
            opacity: marqueeInView ? 1 : 0,
            transition: 'opacity 0.9s ease 0.2s',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #FAFAFA, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #FAFAFA, transparent)' }}
          />
          <div className="partner-marquee py-4">
            {doubledPartners.map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-10 flex items-center justify-center opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-400"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={56}
                  className="object-contain h-12 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
