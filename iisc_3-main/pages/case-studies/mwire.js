import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CaseStudy } from '../../components/CaseStudy';
import { mwireCaseStudyData } from '../../src/data/mwireCaseStudyData';
import { CaseStudiesHeader } from '../../components/CaseStudiesHeader';
import { CaseStudiesFooter } from '../../components/CaseStudiesFooter';

export default function MWireCaseStudyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { metadata, header } = mwireCaseStudyData;

  return (
    <>
      <Head>
        <title>{`${header.mainTitle} - ${metadata.companyName} Case Study | Vaani Dataset`}</title>
        <meta 
          name="description" 
          content={`Learn how ${metadata.companyName} built production-grade Garo ASR using the Vaani dataset. ${header.subtitle}`}
        />
        <meta name="keywords" content="ASR, Garo speech recognition, Vaani dataset, MWire Labs, speech AI, machine learning" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${header.mainTitle} - ${metadata.companyName}`} />
        <meta property="og:description" content={header.subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={metadata.companyLogo} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${header.mainTitle} - ${metadata.companyName}`} />
        <meta name="twitter:description" content={header.subtitle} />
      </Head>

      <div className="bg-slate-50">
        {isClient && <CaseStudiesHeader />}
        <CaseStudy caseStudyData={mwireCaseStudyData} />
        <CaseStudiesFooter />
      </div>
    </>
  );
}
