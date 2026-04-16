"use client";

import Link from "next/link";
import { Container } from "./Container";
import { useInView } from "../hooks/useInView";
import WaveformDivider from './WaveformDivider';

const NAV_LINKS = [
  { label: "About", href: "#About" },
  { label: "Data", href: "#Data" },
  { label: "Team", href: "#Team" },
  { label: "Media", href: "#Media" },
];

const MailIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export function Footer() {
  const [topRef, topInView] = useInView();
  const [bottomRef, bottomInView] = useInView();

  return (
    <footer className="relative overflow-hidden bg-black py-20 border-t border-white/10">
      <Container className="relative">
        <div
          ref={topRef}
          style={{
            opacity: topInView ? 1 : 0,
            transform: topInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-16 border-b border-white/5"
        >
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <span className="text-3xl font-black text-white tracking-widest uppercase group-hover:text-[#4285F4] transition-colors">VAANI</span>
            </Link>
            <p className="text-sm font-medium text-white/50 leading-relaxed max-w-xs mb-8">
              Empowering India through linguistic sovereignty and open speech intelligence.
            </p>
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-8 bg-[#4285F4]/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4285F4]">Open Dataset</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Navigation</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Collaborators</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://iisc.ac.in" target="_blank" className="text-sm font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                  IISc Bangalore
                </a>
              </li>
              <li>
                <a href="https://artpark.in" target="_blank" className="text-sm font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                  ARTPARK
                </a>
              </li>
              <li>
                <a href="https://google.com" target="_blank" className="text-sm font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                  Google Cloud
                </a>
              </li>
            </ul>
          </div>

          {/* Download */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-10">Access Data</h3>
            <a
              href="https://huggingface.co/datasets/ARTPARK-IISc/VAANI"
              target="_blank"
              className="inline-block bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Hugging Face
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          style={{ opacity: bottomInView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}
          className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/20">
            © {new Date().getFullYear()} VAANI · SPIRE Lab · IISc & ARTPARK.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#4285F4]/60 bg-[#4285F4]/5 px-3 py-1 rounded border border-[#4285F4]/10">
              CC BY 4.0
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
