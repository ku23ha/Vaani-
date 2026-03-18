"use client";

import { useState } from 'react';
import { Container } from './Container';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    question: 'Why is capturing the language landscape of India important?',
    answer: `Capturing India's diverse language landscape is vital for an inclusive Digital India, as only 10% of the population speaks English. Existing language AI models may not meet the linguistic diversity of India, where languages blend continuously. Initiatives like the National Language Translation Mission and Project Vaani aim to collect authentic language data, addressing the limitations of biased language models.`,
  },
  {
    question: 'Why is this data shown per district and not per language?',
    answer: "We believe that language in India is more like a fabric, with the color changing gradually as we move over it. Similarly, language changes as we move every few kilometers. With this school of thought, we are collecting a dataset that is representative of each district, which may contain multiple languages. Click on State > District to see which languages we have recorded to date.",
  },
  {
    question: 'Who can use this data?',
    answer: 'This dataset is open source and can be used by any individual or organization. Any startup is welcome to use this dataset. Feedback on the dataset is always welcome.',
  },
  {
    question: 'How can I contribute to Project Vaani?',
    answer: 'You can contribute by participating in data collection drives, partnering with us as an organization, or by providing feedback on our existing dataset. Reach out to us at vaanicontact@gmail.com to learn more about collaboration opportunities.',
  },
  {
    question: 'Under which license is the data available?',
    answer: 'The data from Project Vaani is available under the Creative Commons Attribution 4.0 International (CC-BY-4.0) license. This allows broad use of the data as long as proper attribution is given to Project Vaani.',
  },
  {
    question: 'Where can I download the dataset?',
    answer: 'The dataset is exclusively available on Hugging Face. Visit the ARTPARK-IISc/Vaani repository on Hugging Face to access and download the full multimodal dataset for seamless integration into your AI projects.',
  },
];

function FaqItem({ faq, index, inView }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-gray-900 group-hover:text-[#212191] transition-colors leading-snug">
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 group-hover:border-[#212191]/30 group-hover:bg-[#212191]/5 transition-all duration-200 mt-0.5"
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#212191] transition-all duration-300"
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
        <p className="pb-5 text-gray-500 leading-relaxed text-sm pr-10">
          {faq.answer}
        </p>
      </div>

      <div className="h-px bg-gray-100" />
    </div>
  );
}

export function Faqs() {
  const [headRef, headInView] = useInView();
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();

  const leftFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32 bg-[#FAFAFA]">
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
            FAQ
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2
                id="faq-title"
                className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight"
              >
                Frequently asked<br />questions
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed sm:text-right">
              Can't find what you're looking for?{' '}
              <a
                href="mailto:vaanicontact@gmail.com"
                className="text-[#212191] font-semibold hover:underline"
              >
                Email us
              </a>{' '}
              — we'll get back to you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          <div ref={leftRef} className="divide-y divide-gray-100 border-t border-gray-100">
            {leftFaqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} inView={leftInView} />
            ))}
          </div>
          <div ref={rightRef} className="divide-y divide-gray-100 border-t border-gray-100 mt-0 lg:mt-0">
            {rightFaqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} inView={rightInView} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
