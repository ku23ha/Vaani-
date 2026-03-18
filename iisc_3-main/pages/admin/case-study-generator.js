import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CaseStudyGenerator } from '../../components/CaseStudyGenerator';

export default function CaseStudyGeneratorPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Case Study Generator | Vaani Dataset</title>
        <meta name="description" content="Generate professional case study pages automatically" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {isClient && <CaseStudyGenerator />}
    </>
  );
}
