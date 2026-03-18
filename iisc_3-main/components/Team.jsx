import { Container } from './Container';
import Bio from './Bio';
import { useInView } from '../hooks/useInView';

export function Team() {
  const [headRef, headInView] = useInView();

  return (
    <section id="Team" aria-label="Our Team" className="py-24 sm:py-32" style={{ background: 'transparent' }}>
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
            Team
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            The People Behind the Voices
          </h2>
        </div>
        <Bio />
      </Container>
    </section>
  );
}
