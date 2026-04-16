import Image from 'next/image';
import { Container } from './Container';
import { useInView } from '../hooks/useInView';
import Logo1 from '../assets/ShaipLogo.png';
import Logo2 from '../assets/Megdaplogo.png';
import Logo3 from '../assets/Karya-Logo.png';
import Logo4 from '../assets/GcsLogo.png';
import Logo7 from '../assets/GtsLogo.png';

const primaryPartners = [
  { src: Logo4, alt: "Google Cloud", width: 280 },
  { src: Logo2, alt: "Megdap", width: 220 },
  { src: Logo3, alt: "Karya", width: 240 },
  { src: Logo1, alt: "Shaip", width: 220 },
  { src: Logo7, alt: "GTS", width: 240 },
];

export function Partners() {
  const [headRef, headInView] = useInView();
  const [logosRef, logosInView] = useInView();

  return (
    <section id="partners" className="py-28" style={{ background: 'transparent' }}>
      <Container>
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-6">
            Our Ecosystem
          </span>
          <h2 className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
            Our Partners
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Collaboration across industries to build the future of voice AI in India.
          </p>
        </div>

        <div
          ref={logosRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 sm:gap-16 items-center justify-items-center"
          style={{
            opacity: logosInView ? 1 : 0,
            transform: logosInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
          }}
        >
          {primaryPartners.map((p, i) => (
            <div
              key={p.alt}
              className="flex items-center justify-center transition-all duration-500 hover:scale-110 group w-full px-4"
            >
              <div className="relative w-full aspect-[3/2] flex items-center justify-center">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={150}
                  className="object-contain max-h-24 sm:max-h-32 w-auto transition-all duration-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_30px_rgba(66,133,244,0.2)]"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
