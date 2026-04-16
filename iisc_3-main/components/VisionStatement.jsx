'use client';

import { Container } from './Container';

export function VisionStatement() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[#4285F4]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 leading-relaxed mb-8">
            Project Vaani is one of the largest datasets of Indian dialects ever to exist. 
            <span className="block mt-4 text-[#4285F4]">
              Upon completion, it will contain more than 150,000 hours of audio across all districts in India.
            </span>
          </h2>
          <div className="flex justify-center gap-4 mt-12 opacity-30">
             <div className="h-1 w-1 rounded-full bg-white" />
             <div className="h-1 w-1 rounded-full bg-white" />
             <div className="h-1 w-1 rounded-full bg-white" />
          </div>
        </div>
      </Container>
    </section>
  );
}
