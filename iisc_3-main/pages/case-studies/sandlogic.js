import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CaseStudy } from '../../components/CaseStudy';
import { sandlogicCaseStudyData } from '../../src/data/sandlogicCaseStudyData';
import { CaseStudiesHeader } from '../../components/CaseStudiesHeader';
import { CaseStudiesFooter } from '../../components/CaseStudiesFooter';

export default function SandLogicCaseStudyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { metadata, header } = sandlogicCaseStudyData;

  return (
    <>
      <Head>
        <title>{`${header.mainTitle} - ${metadata.companyName} Case Study | Vaani Dataset`}</title>
        <meta 
          name="description" 
          content={`Learn how ${metadata.companyName} achieved breakthrough results in Hindi ASR using the Vaani dataset. ${header.subtitle}`}
        />
        <meta name="keywords" content="ASR, Hindi speech recognition, Vaani dataset, SandLogic, call analytics, machine learning" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${header.mainTitle} - ${metadata.companyName}`} />
        <meta property="og:description" content={header.subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={metadata.companyLogo} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${header.mainTitle} - ${metadata.companyName}`} />
        <meta name="twitter:description" content={header.subtitle} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": header.mainTitle,
              "description": header.subtitle,
              "author": {
                "@type": "Organization",
                "name": metadata.companyName
              },
              "publisher": {
                "@type": "Organization", 
                "name": "ARTPARK",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vaani.iisc.ac.in/assets/ARTPARK.png"
                }
              },
              "datePublished": metadata.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://vaani.iisc.ac.in/case-studies/${metadata.id}`
              }
            })
          }}
        />
      </Head>

      <div className="bg-slate-50">
        {isClient && <CaseStudiesHeader />}
        <CaseStudy caseStudyData={sandlogicCaseStudyData} />
        <CaseStudiesFooter />
      </div>
    </>
  );
}
