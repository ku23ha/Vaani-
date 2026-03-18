'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

// Global scroll reveal animation hook
export function useScrollReveal() {
  useEffect(() => {
    // Wait for DOM to be ready
    const ctx = gsap.context(() => {
      // Animate all sections
      gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
        // Section headline - word by word reveal
        const heading = section.querySelector('h2, h3');
        if (heading && heading.textContent) {
          const words = heading.textContent.split(' ');
          heading.innerHTML = words
            .map(
              (word) =>
                `<span style="display:inline-block;overflow:hidden;margin-right:0.25em;"><span style="display:inline-block;transform:translateY(110%)">${word}</span></span>`
            )
            .join(' ');

          gsap.to(heading.querySelectorAll('span > span'), {
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.06,
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // Animate children elements
        const children = section.querySelectorAll(
          'p, .card, img, button, a.cta, .stat-card, .team-card, .faq-item, .partner-logo, .news-card, .gem-card, .tech-card'
        );
        
        if (children.length > 0) {
          gsap.from(children, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          });
        }
      });

      // Parallax effect for background elements
      gsap.utils.toArray<HTMLElement>('.parallax-slow').forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}

// Hero load sequence animation
export function useHeroAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from('.nav', { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('.hero-label', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
        .from(
          '.hero-headline span > span',
          { y: '110%', duration: 0.7, stagger: 0.06, ease: 'power3.out' },
          '-=0.2'
        )
        .from('.hero-carousel', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
        .from('.hero-subheadline', { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from(
          '.hero-partners img',
          { opacity: 0, y: 10, stagger: 0.05, duration: 0.4 },
          '-=0.2'
        )
        .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.1');
    });

    return () => ctx.revert();
  }, []);
}

// Counter animation for stats
export function useCounterAnimation(
  elementRef: React.RefObject<HTMLElement>,
  target: number,
  duration: number = 2.5
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: duration,
        ease: 'power3.out',
        onUpdate: () => {
          element.textContent = Math.round(obj.val).toLocaleString('en-IN');
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [elementRef, target, duration]);
}

// Stat cards stagger animation
export function useStatCardsAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// About section asymmetric entrance
export function useAboutAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headings word-by-word reveal (if split)
      const aboutHeading = document.querySelector('.about-text h2');
      if (aboutHeading) {
        gsap.from(aboutHeading, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
          },
        });

        // Parallax scroll effect
        gsap.to(aboutHeading, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Left column text
      gsap.from('.about-text p', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 70%',
        },
      });

      // Right column visual
      gsap.from('.about-visual', {
        y: 100,
        opacity: 0,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 70%',
        },
      });

      // Parallax for the visual
      gsap.to('.about-visual', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Tech cards with spring
      gsap.from('.tech-card', {
        y: 40,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.tech-cards',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// India map stroke drawing animation
export function useMapAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const statePaths = document.querySelectorAll('.india-map path');

      statePaths.forEach((path, i) => {
        const pathElement = path as SVGPathElement;
        const length = pathElement.getTotalLength();

        // Initial state
        pathElement.style.strokeDasharray = `${length}`;
        pathElement.style.strokeDashoffset = `${length}`;

        // Draw stroke
        gsap.to(pathElement, {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: i * 0.03,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.map-section',
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });

        // Fill fades in after stroke
        const fillColor = pathElement.dataset.color || 'rgba(66,165,245,0.3)';
        gsap.to(pathElement, {
          fill: fillColor,
          duration: 0.5,
          delay: i * 0.03 + 1.2,
          scrollTrigger: {
            trigger: '.map-section',
            start: 'top 60%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}

// Linguistic Gems horizontal scroll pinning
export function useGemsAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const gemsSection = document.querySelector('.gems-section');
      const gemsTrack = document.querySelector('.gems-track');

      if (gemsSection && gemsTrack) {
        const totalScroll =
          (gemsTrack as HTMLElement).scrollWidth - window.innerWidth;

        // Horizontal scroll
        gsap.to(gemsTrack, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: gemsSection,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => '+=' + totalScroll,
            invalidateOnRefresh: true,
          },
        });

        // Card entrance animations
        gsap.utils
          .toArray<HTMLElement>('.gem-card')
          .forEach((card, i) => {
            gsap.from(card, {
              opacity: 0.3,
              scale: 0.92,
              duration: 0.5,
              scrollTrigger: {
                trigger: card,
                start: 'left 80%',
                end: 'left 50%',
                scrub: true,
                horizontal: true,
              },
            });
          });
      }
    });

    return () => ctx.revert();
  }, []);
}

// Team cards stagger rise
export function useTeamAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.team-card', {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.team-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// Partners fade-in wave
export function usePartnersAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-logo', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.partners-section',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// Data Access CTA dramatic scale-in
export function useCtaAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-section .cta-content', {
        scale: 0.85,
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.code-snippet', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// News/Media masonry stagger
export function useNewsAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.news-card-large', {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.news-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.news-card-small', {
        x: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.news-section',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// FAQ accordion animation
export function toggleFaq(item: HTMLElement) {
  const content = item.querySelector('.faq-content') as HTMLElement;
  const icon = item.querySelector('.faq-icon') as HTMLElement;
  const isOpen = item.classList.contains('open');

  if (isOpen) {
    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
    gsap.to(icon, { rotation: 0, duration: 0.3 });
    item.classList.remove('open');
  } else {
    // Close all others first
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      toggleFaq(openItem as HTMLElement);
    });

    gsap.set(content, { height: 'auto' });
    const fullHeight = content.offsetHeight;
    gsap.fromTo(
      content,
      { height: 0, opacity: 0 },
      { height: fullHeight, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    gsap.to(icon, { rotation: 45, duration: 0.3 });
    item.classList.add('open');
  }
}

// Footer subtle rise
export function useFooterAnimation() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

// Scroll indicator fade-out
export function useScrollIndicator() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.scroll-indicator', {
        opacity: 0,
        y: -10,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);
}
