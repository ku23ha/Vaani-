"use client";

import Link from "next/link";
import { Container } from "./Container";
import { useInView } from "../hooks/useInView";

const NAV_LINKS = [
  { label: "Home", href: "#Home" },
  { label: "About", href: "#About" },
  { label: "Data", href: "#Data" },
  { label: "Team", href: "#Team" },
  { label: "Partners", href: "#partners" },
  { label: "Media", href: "#Media" },
  { label: "Case Studies", href: "/case-studies" },
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
    <footer className="bg-gray-950 text-white overflow-hidden">
      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, #0a0a2e 0%, #111134 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #9B99E8 0%, transparent 70%)' }}
          />
        </div>

        <Container className="relative">
          <div
            ref={topRef}
            style={{
              opacity: topInView ? 1 : 0,
              transform: topInView ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
            className="pt-20 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10"
          >
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-bold tracking-tight text-white">vaani</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Capturing the language landscape of India for an inclusive digital future.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#212191] bg-white px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <img src="https://img.icons8.com/fluency/48/hugging-face_app.png" alt="HF" className="h-4 w-4" />
                  Explore on Hugging Face
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Navigation</h3>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Contact Us</h3>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                We are always open to new ideas and collaborations. Feel free to reach out to us.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:vaanicontact@gmail.com"
                  className="flex items-start gap-2.5 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  <MailIcon />
                  <span className="group-hover:underline">vaanicontact@gmail.com</span>
                </a>
                <div className="flex items-start gap-2.5 text-sm text-gray-400">
                  <BuildingIcon />
                  <address className="not-italic leading-relaxed">
                    SPIRE LAB, Room No. EE C 326<br />
                    Dept. of Electrical Engineering<br />
                    IISc Bangalore – 560012
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={bottomRef}
            style={{
              opacity: bottomInView ? 1 : 0,
              transition: 'opacity 0.7s ease 0.2s',
            }}
            className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Project VAANI · IISc & ARTPARK. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                CC-BY-4.0 License
              </a>
              <span className="text-gray-700">·</span>
              <a
                href="mailto:vaanicontact@gmail.com"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
