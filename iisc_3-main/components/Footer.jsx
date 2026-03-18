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
    <footer className="relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Waveform top border */}
      <WaveformDivider color="spectral" height={24} />

      <Container className="relative">
        <div
          ref={topRef}
          style={{
            opacity: topInView ? 1 : 0,
            transform: topInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
          className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10"
        >
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-[#4285F4]" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>वाणी</span>
              <span className="text-lg font-bold tracking-wider text-white/90">VAANI</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Mapping India's linguistic diversity for an inclusive digital future.
            </p>
            <div className="mt-6">
              <a
                href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#4285F4]/20"
                style={{ background: 'linear-gradient(135deg, #1967D2, #4285F4, #8AB4F8)', color: '#FFFFFF' }}
              >
                🤗 Explore on Hugging Face
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest font-mono mb-5">Navigation</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-[#4285F4] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/case-studies" className="text-sm text-white/60 hover:text-[#4285F4] transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest font-mono mb-5">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:vaanicontact@gmail.com"
                className="flex items-start gap-2.5 text-sm text-white/60 hover:text-[#4285F4] transition-colors group"
              >
                <MailIcon />
                <span>vaanicontact@gmail.com</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/50">
                <BuildingIcon />
                <address className="not-italic leading-relaxed">
                  SPIRE LAB, EE Dept<br />
                  IISc Bangalore 560012
                </address>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-[#4285F4] uppercase tracking-widest font-mono mb-5">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: 'HuggingFace Dataset', href: 'https://huggingface.co/datasets/ARTPARK-IISc/VAANI' },
                { label: 'Research Paper', href: '#' },
                { label: 'GitHub', href: '#' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-[#4285F4] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-[#4285F4] bg-[rgba(66, 133, 244,0.1)] px-3 py-1 rounded-full hover:bg-[rgba(66, 133, 244,0.2)] transition-colors mt-1">
                  CC-BY-4.0 License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          style={{ opacity: bottomInView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}
          className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Project VAANI · IISc & ARTPARK. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-[#4285F4] transition-colors">
              Data licensed under CC-BY-4.0
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
