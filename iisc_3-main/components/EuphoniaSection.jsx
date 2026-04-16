'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { Container } from './Container';

// Assets
import GoogleLogo from '../assets/GoogleLogo.png';

export default function EuphoniaSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4285F4] rounded-full blur-[160px] opacity-[0.03] pointer-events-none"></div>

      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          
          {/* Left Side: Content */}
          <div className="flex-1 text-left">
            <ScrollReveal variant="fadeUp">
              <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
                Speech Accessibility
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                Beyond Language: <br /><span className="text-white/60">Speech Diversity</span>
              </h2>
              <p className="text-xl text-[#8AB4F8] font-medium max-w-2xl mb-6 leading-relaxed">
                Extending Vaani's work to include speech that differs from typical patterns.
              </p>
              <p className="text-lg text-white/50 max-w-2xl mb-10 leading-relaxed">
                Introducing the Vaani Atypical Speech Corpus — a research dataset focused on speech from individuals with diverse speech patterns, including those shaped by neurological, developmental, and cognitive conditions. This effort builds on Vaani's nationwide data collection capabilities and collaborations with global initiatives such as Project Euphonia, with the aim of enabling more inclusive and robust speech technologies.
              </p>
              
              <Link 
                href="https://vaani.iisc.ac.in/atypical-speech" 
                target="_blank"
                className="inline-flex items-center px-8 py-4 bg-[#4285F4] hover:bg-[#1967D2] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#4285F4]/20 group"
              >
                <span>Learn More</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Side: Collaboration Card */}
          <div className="w-full lg:w-[450px]">
            <ScrollReveal variant="scaleUp" delay={0.2}>
              <div className="stat-card-premium p-10 relative group">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <svg className="w-12 h-12 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                   </svg>
                </div>

                <div className="text-center">
                  <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-8">
                    In Collaboration With
                  </span>
                  
                  <div className="flex justify-center mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-xl">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={GoogleLogo} 
                          alt="Google Logo" 
                          width={24} 
                          height={24} 
                          className="object-contain"
                        />
                        <span className="text-xl font-bold text-[#3c4043] font-display tracking-tight">Project Euphonia</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-8 px-4">
                    Project Euphonia is a Google Research initiative working to improve speech recognition for people with non-standard speech.
                  </p>

                  <Link 
                    href="https://sites.research.google/euphonia/about/" 
                    target="_blank"
                    className="text-[#4285F4] hover:text-[#8AB4F8] font-semibold flex items-center justify-center gap-2 transition-colors border-t border-white/5 pt-6 group"
                  >
                    <span>Learn about Project Euphonia</span>
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
