'use client';

import Link from 'next/link';
import { Container } from './Container';
import Model2 from './Model2';
import { useMyContext } from '../contexts/MyContext';
import { useInView } from '../hooks/useInView';

export function DownloadSection() {
  const { popup } = useMyContext();
  const [sectionRef, sectionInView] = useInView();
  const [cardRef, cardInView] = useInView();

  return (
    <section id="Data" className="py-24 sm:py-32 bg-white overflow-hidden">
      {popup && <Model2 />}
      <Container>
        <div
          ref={sectionRef}
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#212191] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#212191] inline-block" />
            Data
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight max-w-xl leading-tight">
            Unleash the Power of our Data!
          </h2>
        </div>

        <div
          ref={cardRef}
          className="relative rounded-3xl overflow-hidden"
          style={{
            opacity: cardInView ? 1 : 0,
            transform: cardInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
          }}
        >
          <div
            className="relative px-8 py-16 sm:px-16 sm:py-20 text-center"
            style={{
              background: 'linear-gradient(135deg, #212191 0%, #11115B 50%, #1a1a8c 100%)',
            }}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
              <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #9B99E8 0%, transparent 70%)' }} />
            </div>

            <div className="relative max-w-2xl mx-auto">
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
                Our comprehensive multimodal dataset for Indian languages is{' '}
                <span className="font-bold text-white">now exclusively available on Hugging Face</span>! Access and download the dataset directly for seamless integration and ease of use in your AI projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#212191] font-semibold bg-white px-7 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg text-base"
                >
                  <img
                    src="https://img.icons8.com/fluency/48/hugging-face_app.png"
                    alt="Hugging Face"
                    className="h-5 w-5"
                  />
                  Download Data
                </Link>
              </div>

              <p className="mt-8 text-sm text-blue-200">
                Available under license:{' '}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-blue-100 transition-colors"
                >
                  CC-BY-4.0
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
