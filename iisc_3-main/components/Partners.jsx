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
import ConvozenLogo from '../assets/ConvozenLogo.png';
import MWireLogo from '../assets/MWireLogo.png';

// Keep the marquee focused on the primary partner brands larger and high-fidelity.
const partners = [
  { src: Logo4, alt: "Google Cloud", width: 160 },
  { src: Logo2, alt: "Megdap", width: 160 },
  { src: Logo3, alt: "Karya", width: 160 },
  { src: Logo1, alt: "Shaip", width: 160 },
  { src: Logo7, alt: "GTS", width: 160 },
  { src: ConvozenLogo, alt: "Convozen", width: 160 },
  { src: MWireLogo, alt: "MWire", width: 160 },
];

export function Partners() {
  const [headRef, headInView] = useInView();
  const [logosRef, logosInView] = useInView();

  return (
    <section id="partners" className="py-20" style={{ background: 'transparent' }}>
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
          <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
            Partners
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Built Together
          </h2>
        </div>

        <div
          ref={logosRef}
          className="relative overflow-hidden py-8"
          style={{
            opacity: logosInView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          <div className="marquee flex gap-12 sm:gap-16 items-center">
            {[...partners, ...partners].map((p, i) => (
              <div
                key={`${p.alt}-${i}`}
                className="flex items-center justify-center opacity-40 hover:opacity-100 brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-500"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={80}
                  className="object-contain h-16 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        .marquee {
          animation: marquee 25s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
