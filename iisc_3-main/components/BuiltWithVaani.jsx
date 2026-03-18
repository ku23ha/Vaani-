'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';
import { useInView } from '../hooks/useInView';

const cases = [
  {
    logo: '/SandLogic.jpg',
    company: 'SandLogic',
    author: 'Dr. Kruthika K R',
    title: 'Founding Researcher',
    quote: 'Vaani enabled us to build production-grade ASR for Indian enterprises.',
    metric: '40% improvement in transcription accuracy',
    href: '/case-studies/sandlogic',
  },
  {
    logo: '/ShunyaLabs.png',
    company: 'ShunyaLabs',
    author: 'Founder',
    title: 'ShunyaLabs',
    quote: 'The diversity of Vaani data solved our accent coverage problem completely.',
    metric: 'Deployed across 12 Indian languages',
    href: '/case-studies/shunyalabs',
  },
  {
    logo: '/SpringLab.png',
    company: 'SpringLab',
    author: 'Founder',
    title: 'SpringLab',
    quote: 'Vaani is the foundation of our voice-first product for rural India.',
    metric: '500K+ users served',
    href: '/case-studies/springlab',
  },
  {
    logo: '/MWire.svg',
    company: 'MWire Labs',
    author: 'Badal Nyalang',
    title: 'Founder & Lead Researcher',
    quote: 'Project Vaani data enabled us to build a production-grade Garo ASR with under 9% WER, turning brittle research models into real-world edge deployments.',
    metric: 'Garo ASR with <9% WER (Whisper Small)',
    href: '/case-studies/mwirelabs',
  },
];

export function BuiltWithVaani() {
  const [headRef, headInView] = useInView();
  const [cardsRef, cardsInView] = useInView();

  return (
    <section className="py-24 sm:py-32 overflow-hidden" style={{ background: 'transparent' }}>
      <Container>
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
            Real World Impact
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Built With Vaani
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto text-base">
            Companies building the future of Indian language AI on Vaani's open dataset.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <div
              key={c.company}
              style={{
                opacity: cardsInView ? 1 : 0,
                transform: cardsInView ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.96)',
                transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 180}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 180}ms`,
              }}
              className="glass rounded-2xl p-7 flex flex-col gap-5 hover:bg-white/[0.08] transition-colors duration-300 min-h-[340px]"
            >
              <div className="h-10 flex items-center justify-center">
                <Image
                  src={c.logo}
                  alt={c.company}
                  width={140}
                  height={48}
                  className="object-contain h-10 w-auto opacity-90"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <p className="text-white/70 text-sm leading-relaxed italic flex-1 mb-4">"{c.quote}"</p>
                <div className="mb-4">
                  <p className="text-white font-semibold text-sm">{c.author}</p>
                  <p className="text-white/50 text-xs">{c.title}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 bg-[#4285F4]/10 rounded-full px-4 py-2 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4] flex-shrink-0" />
                  <span className="text-xs font-semibold text-[#4285F4]">{c.metric}</span>
                </div>
              </div>

              <Link href={c.href} className="text-sm font-semibold text-[#4285F4] hover:text-white transition-colors mt-6">
                Read Case Study →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
