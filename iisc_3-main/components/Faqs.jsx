"use client";

import { useState } from 'react';
import { Container } from './Container';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    question: 'Why is capturing the language landscape of India important?',
    answer: `India's billion+ citizens speak hundreds of languages, yet most language AI is trained on English and a few major tongues. Project Vaani bridges this gap by collecting authentic, diverse speech data to power inclusive AI technologies.`,
  },
  {
    question: 'Why is this data organized by district, not by language?',
    answer: "Language in India is like a fabric the color changes gradually as you move every few kilometers. We collect data district by district to capture this natural linguistic diversity, including the beautiful overlaps and blends that census-based approaches miss.",
  },
  {
    question: 'Who can use this data?',
    answer: 'The dataset is open source under CC-BY-4.0. Anyone  researchers, startups, enterprises, or individual developers  can use it to build speech recognition, translation, or any language AI application.',
  },
  {
    question: 'How can I contribute to Project Vaani?',
    answer: 'You can contribute by participating in data collection, partnering with us as an organization, or providing feedback on the dataset. Reach out at vaanicontact@gmail.com.',
  },
];

function FaqItem({ faq, index, inView }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        transitionDelay: `${index * 140}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className={`text-base font-semibold transition-colors leading-snug ${open ? 'text-[#4285F4]' : 'text-white/70 group-hover:text-white'}`}>
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 mt-0.5 ${open ? 'bg-[rgba(66, 133, 244,0.1)] border-[#4285F4]/30' : 'border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(255,255,255,0.2)]'}`}
          style={{ border: '1px solid' }}
          aria-hidden="true"
        >
          <svg
            className={`w-3.5 h-3.5 transition-all duration-300 ${open ? 'text-[#4285F4]' : 'text-white/40 group-hover:text-white/70'}`}
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
          </svg>
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? '400px' : '0',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
        }}
      >
        <p className="pb-5 text-white/70 leading-relaxed text-sm pr-10">
          {faq.answer}
        </p>
      </div>

      <div className="h-px bg-[rgba(255,255,255,0.06)]" />
    </div>
  );
}

export function Faqs() {
  const [headRef, headInView] = useInView();
  const [listRef, listInView] = useInView();

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32" style={{ background: 'transparent' }}>
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
          <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
            FAQ
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h2
              id="faq-title"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
            >
              Frequently Asked<br />Questions
            </h2>
            <p className="text-white/70 max-w-xs text-sm leading-relaxed sm:text-right">
              Can't find what you're looking for?{' '}
              <a href="mailto:vaanicontact@gmail.com" className="text-[#4285F4] font-semibold hover:underline">
                Email us
              </a>
              {' '}we'll get back to you.
            </p>
          </div>
        </div>

        <div ref={listRef} className="max-w-3xl">
          <div className="border-t border-[rgba(255,255,255,0.06)]">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} inView={listInView} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
