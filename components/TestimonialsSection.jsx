"use client";

import { useState, useEffect } from 'react'
import { Container } from './Container'

const testimonialsData = [
  {
    id: 1,
    quote: "Vaani's dataset, with its multiple languages, real-life scenarios, background noises, and multi-dialect conversations, is very well-suited for the speech models we train. We have seen good results from fine-tuning our models on these datasets. The work done by the Vaani team in gathering datasets to support real-life use cases for Bharat is truly commendable.",
    companyName: " Convozen.ai",
    personRole: "Zaher Abdul, Senior Director AI & ML"
  },
  {
    id: 2,
    quote: "The Vaani Datasets have been invaluable in improving our Speech Models. The quality is excellent, with a great balance of gender variation, detailed metadata, and highly accurate transcripts with precise noise tagging.",
    companyName: "Reverie Language Technology LTD",
    personRole: "Pranjal Nayak,  Head of R&D "
  },
  {
    id: 3,
    quote: "At SandLogic, we believe India’s AI future must be sovereign, inclusive, and representative of our people. The Vaani dataset captures the richness of Indian speech and has helped us benchmark and enhance our models for stronger performance in both research and enterprise use cases.",
    companyName: "SandLogic Technologies",
    personRole: "Dr. Kruthika K R, Founding Researcher"
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      )
    }, 16000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    )
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
  }

 
  const getCurrentTestimonials = () => {
    const testimonials = []
    const maxDisplay = Math.min(3, testimonialsData.length)
    
    for (let i = 0; i < maxDisplay; i++) {
      const index = (currentIndex + i) % testimonialsData.length
      testimonials.push(testimonialsData[index])
    }
    return testimonials
  }

  return (
    <section className="py-20 bg-white">
      <Container>
        <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl md:text-3xl text-center mb-16 font-bold">
          What Startups Are Saying
        </h2>
        
        <div className="relative">
          {testimonialsData.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Previous testimonials"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Next testimonials"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className={`grid gap-4 mb-8 max-w-6xl mx-auto ${
            getCurrentTestimonials().length === 1 ? 'grid-cols-1 max-w-md' :
            getCurrentTestimonials().length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' :
            'grid-cols-1 md:grid-cols-3'
          }`}>
            {getCurrentTestimonials().map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-lg shadow-lg p-4 border border-slate-200 min-h-[200px] flex flex-col justify-center items-center text-center transition-all duration-500 ease-in-out"
              >
                <blockquote className="text-sm italic text-slate-700 mb-4 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="text-center">
                  <p className="font-bold text-blue-600 text-sm mb-1">{testimonial.companyName}</p>
                  <p className="text-slate-600 text-xs">{testimonial.personRole}</p>
                </div>
              </div>
            ))}
          </div>

          {testimonialsData.length > 3 && (
            <div className="flex justify-center space-x-2 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-blue-600' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {testimonialsData.length > 3 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
              >
                {isAutoPlaying ? 'Pause' : 'Play'} Auto-slide
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
