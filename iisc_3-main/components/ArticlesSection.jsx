import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';
import { useInView } from '../hooks/useInView';

import article1 from '../images/articles/article1.webp';
import article3 from '../images/articles/article3.webp';
import article5 from '../images/articles/article5.jpg';
import article8 from '../images/articles/image8.jpg';
import article10 from '../images/articles/article10.jpg';
import article1a from '../images/articles/article1.webp';

const articles = [
  {
    authorName: 'RAFI KO TECH',
    href: "https://newsbytes.ph/2025/08/14/google-partners-with-ai-projects-to-bridge-asian-language-barriers/",
    articleTitle: "Google partners with AI projects to bridge Asian language barriers",
    date: "14 Aug 2025",
    articleImage: article10,
  },
  {
    authorName: 'ISHA RAUTELA',
    href: "https://www.thehindubusinessline.com/news/variety/project-vaani-scales-decibels-as-it-maps-language-landscape-of-india/article66304920.ece",
    articleTitle: "Project Vaani scales decibels as it maps language landscape of India",
    date: "December 25, 2022",
    articleImage: article3,
  },
  {
    authorName: 'VIKAS SN',
    href: "https://www.moneycontrol.com/technology/google-woos-indias-booming-ai-developer-community-with-new-tools-access-to-latest-models-article-12770940.html?classic=true",
    articleTitle: "Google woos India's booming AI developer community with new tools",
    date: "17 Jul 2024",
    articleImage: article5,
  },
  {
    authorName: 'Milin Stanly',
    href: "https://indiaai.gov.in/article/india-turns-to-ai-to-capture-its-121-languages-for-digital-services",
    articleTitle: "IISc/ARTPARK's project Vaani  enabling speech technologies in Indian languages",
    date: "Dec 20, 2023",
    articleImage: article8,
  },
  {
    authorName: 'Suraksha P',
    href: "https://economictimes.indiatimes.com/tech/technology/under-bhashini-iisc-to-open-source-16000-hours-of-speech-data/articleshow/111639325.cms",
    articleTitle: "Under Bhashini, IISc to open source 16,000 hours of speech data",
    date: "11 Jul 2024",
    articleImage: article3,
  },
  {
    authorName: 'Sohini Bagchi',
    href: "https://www.livemint.com/technology/tech-news/artparkiisc-google-to-bring-innovation-to-india-s-diverse-languages-11671445526332.html",
    articleTitle: "Artpark-IISc, Google to bring innovation to India's diverse languages",
    date: "19 Dec 2022",
    articleImage: article1a,
  },
];

function ArticleCard({ article, index, inView, featured = false }) {
  return (
    <Link href={article.href} target="_blank">
      <div
        style={{
          transitionDelay: `${index * 120}ms`,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
          transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          background: '#0A0A0A',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
        className={`group rounded-2xl overflow-hidden hover:bg-[#111111] transition-all duration-400 flex flex-col h-full ${featured ? 'row-span-2' : ''}`}
      >
        <div className={`relative ${featured ? 'h-64' : 'h-44'} overflow-hidden`}>
          <Image
            src={article.articleImage}
            alt={article.articleTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent opacity-60" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <p className="text-xs font-mono text-[#4285F4] tracking-wider mb-3">
            {article.date}
          </p>
          <h3 className={`${featured ? 'text-lg' : 'text-base'} font-semibold text-white leading-snug flex-1 group-hover:text-[#4285F4] transition-colors`}>
            {article.articleTitle}
          </h3>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/70">By {article.authorName}</span>
            <span className="text-xs font-semibold text-[#4285F4] group-hover:gap-2 flex items-center gap-1 transition-all">
              Read
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ArticlesSection() {
  const [headRef, headInView] = useInView();
  const [gridRef, gridInView] = useInView();

  return (
    <section id="Media" aria-label="Media & Articles" className="py-24 sm:py-32" style={{ background: 'transparent' }}>
      <Container>
        <div
          ref={headRef}
          style={{
            opacity: headInView ? 1 : 0,
            transform: headInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
              In The News
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Vaani in the Press
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4285F4] border border-[#4285F4]/30 px-5 py-2.5 rounded-full hover:bg-[#4285F4] hover:text-[#FFFFFF] transition-colors flex-shrink-0"
          >
            View all coverage
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={i} article={article} index={i} inView={gridInView} featured={i === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
