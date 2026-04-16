"use client";

import { Fragment } from 'react';
import Image from 'next/image';
import { Container } from './Container'

import ConvozenLogo from '../assets/Convozen-new.png';
import MWireLogo from '../assets/MWire-new.png';
import ReverieLogo from '../assets/reverie-logo.png';
const SandLogicLogo = '/SandLogic.jpg';

const testimonialsData = [
  {
    companyName: "CONVOZEN.AI",
    personName: "Zaher Abdul,",
    personRole: "Senior Director AI & ML",
    logo: ConvozenLogo,
    quote: "Vaani's dataset, with its multiple languages and real-life scenarios, is very well-suited for the speech models we train."
  },
  {
    companyName: "REVERIE LANGUAGE TECHNOLOGY",
    personName: "Pranjal Nayak,",
    personRole: "Head of R&D",
    logo: ReverieLogo,
    quote: "The Vaani Datasets have been invaluable in improving our Speech Models. The quality and balance are exceptional."
  },
  {
    companyName: "SANDLOGIC TECHNOLOGIES",
    personName: "Dr. Kruthika K R,",
    personRole: "Founding Researcher",
    logo: SandLogicLogo,
    quote: "Vaani enabled us to build production-grade ASR for Indian enterprises, capturing the true richness of Indian speech."
  },
  {
    companyName: "MWIRE LABS",
    personName: "Badal Nyalang,",
    personRole: "Founder & Lead Researcher",
    logo: MWireLogo,
    quote: "Project Vaani data enabled us to build a production-grade Garo ASR with under 9% WER, turning research into real-world deployments."
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-black border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Real World Impact
          </h2>
          <div className="w-24 h-1 bg-[#4285F4] mx-auto rounded-full opacity-80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center p-8 bg-white/5 border border-white/10 hover:border-[#4285F4]/50 rounded-2xl shadow-lg hover:shadow-[#4285F4]/20 hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] backdrop-blur-sm"
            >
              <div className="h-16 flex items-center justify-center mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                <Image
                  src={testimonial.logo}
                  alt={testimonial.companyName}
                  width={150}
                  height={50}
                  className="object-contain max-h-full"
                />
              </div>

              <div className="mb-6 text-center">
                <p className="text-[#4285F4] font-bold text-sm tracking-widest mb-1">
                  {testimonial.companyName}
                </p>
              </div>

              <div className="flex-grow mb-8 px-2">
                <p className="text-white/70 text-sm leading-relaxed italic text-center opacity-80 group-hover:opacity-100 transition-opacity">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="text-center pt-6 border-t border-white/10 w-full mt-auto">
                <p className="font-bold text-white/90 text-sm">
                  {testimonial.personName}
                </p>
                <p className="text-white/50 text-xs mt-1 font-medium">
                  {testimonial.personRole}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
