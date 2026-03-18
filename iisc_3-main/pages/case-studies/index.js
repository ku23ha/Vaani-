import { CaseStudiesHeader } from "../../components/CaseStudiesHeader";
import { CaseStudiesFooter } from "../../components/CaseStudiesFooter";
import { CaseStudiesSection } from "../../components/CaseStudiesSection";
import { TestimonialsSection } from "../../components/TestimonialsSection";
import { Container } from "../../components/Container";
import { useState, useEffect } from "react";

export default function CaseStudies() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-slate-50">
      {isClient && <CaseStudiesHeader />}
      <main>
        {/* Hero Banner Section */}
        <section className="bg-blue-600 py-10 sm:py-20">
          <Container>
            <div className="text-center">
              <h1 className="font-display text-2xl tracking-tight text-white sm:text-3xl md:text-3xl font-bold">
                How Startups Are Building on Vaani
              </h1>
              <p className="mt-6 text-lg tracking-tight text-blue-100 max-w-3xl mx-auto">
                Discover how innovators are leveraging the Vaani dataset to solve real-world problems in speech, AI, and beyond.
              </p>
            </div>
          </Container>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Case Studies Section */}
        <CaseStudiesSection />

        {/* Call to Action Section */}
        <section className="bg-blue-600 py-10 sm:py-8">
          <Container>
            <div className="text-center">
              <h2 className="font-display text-2xl tracking-tight text-white sm:text-3xl md:text-3xl mb-8 font-bold">
                Want to Build with the Vaani Dataset?
              </h2>
              <a 
                href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold bg-white text-blue-600 hover:bg-blue-50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Access
              </a>
            </div>
          </Container>
        </section>
      </main>
      <CaseStudiesFooter />
    </div>
  );
}
