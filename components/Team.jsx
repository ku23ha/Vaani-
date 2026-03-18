import { Container } from './Container';
import Bio from './Bio';
import { useInView } from '../hooks/useInView';

export function Team() {
  const [headRef, headInView] = useInView();

  return (
    <section id="Team" aria-label="Our Team" className="py-24 sm:py-32 bg-[#FAFAFA]">
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
            Team
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Our Team
          </h2>
        </div>
        <Bio />
      </Container>
    </section>
  );
}
