import { Head, Html, Main, NextScript } from 'next/document'
import setup from "../setup";

export default function Document() {
    return (
        <Html lang={"en"}>
            <Head>
                <meta name="description" content="Project Vaani — Capturing the true diversity of India's spoken languages. 31,000+ hours of audio, 156,000+ speakers, 109 languages. Open dataset by IISc Bangalore & ARTPARK." />
                <meta name="theme-color" content="#0A0E1A" />

                {/* Open Graph */}
                <meta property="og:title" content="Project Vaani — Every Voice in India, Heard." />
                <meta property="og:description" content="One of the world's largest open datasets of Indian speech — 31,000+ hours across 109 languages." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://vaani.iisc.ac.in" />
                <meta property="og:site_name" content="Project Vaani" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Project Vaani — Every Voice in India, Heard." />
                <meta name="twitter:description" content="Open dataset: 31,000+ hrs of Indian speech across 109 languages by IISc & ARTPARK." />

                {/* Canonical */}
                <link rel="canonical" href="https://vaani.iisc.ac.in" />

                {/* Fonts — preconnect */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />

                {/* Google Fonts: Playfair Display, DM Sans, JetBrains Mono, Noto Sans scripts for Indian languages */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans+Kannada:wght@400;700&family=Noto+Sans+Telugu:wght@400;700&family=Noto+Sans+Tamil:wght@400;700&family=Noto+Sans+Malayalam:wght@400;700&family=Noto+Sans+Gujarati:wght@400;700&family=Noto+Sans+Oriya:wght@400;700&family=Noto+Sans+Gurmukhi:wght@400;700&display=swap"
                    rel="stylesheet"
                />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ResearchProject",
                            "name": "Project Vaani",
                            "alternateName": "वाणी",
                            "description": "Capturing the true diversity of India's spoken languages to power inclusive language AI.",
                            "url": "https://vaani.iisc.ac.in",
                            "funder": { "@type": "Organization", "name": "Google" },
                            "parentOrganization": [
                                { "@type": "EducationalOrganization", "name": "Indian Institute of Science (IISc), Bangalore" },
                                { "@type": "Organization", "name": "ARTPARK" }
                            ],
                            "license": "https://creativecommons.org/licenses/by/4.0/"
                        })
                    }}
                />

                {/* Google Tag Manager */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-CHHQP1JHRW"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-CHHQP1JHRW');
                    `,
                    }}
                />
            </Head>
            <body className="min-h-screen bg-[#0A0E1A] text-[#F0ECE3]">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}