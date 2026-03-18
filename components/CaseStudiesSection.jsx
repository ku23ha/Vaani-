"use client";

import { useState } from 'react'
import { CaseStudyCard } from './CaseStudyCard'
import { Container } from './Container'
import { caseStudiesData } from './caseStudiesData'

export function CaseStudiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= caseStudiesData.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 1 ? caseStudiesData.length - 1 : prevIndex - 1
    )
  }


  const currentCaseStudy = caseStudiesData[currentIndex]
  const nextCaseStudy = caseStudiesData.length > 1 ? caseStudiesData[(currentIndex + 1) % caseStudiesData.length] : null

  return (
    <section className="py-20">
      <Container>
        <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl md:text-3xl text-center mb-16 font-bold">
          Case Studies
        </h2>
        

        <div className="relative">
          {/* Navigation Arrows */}
          {caseStudiesData.length > 2 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Previous case study"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Next case study"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}


          <div className={`grid gap-6 mb-8 max-w-6xl mx-auto 'grid-cols-1 max-w-md'`}>
            <div className="transition-all duration-500 ease-in-out">
              <CaseStudyCard {...currentCaseStudy} />
            </div>
          </div>


          {caseStudiesData.length > 2 && (
            <div className="flex justify-center space-x-2 mt-8">
              {caseStudiesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-blue-600' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to case study ${index + 1}`}
                />
              ))}
            </div>
          )}


        </div>
      </Container>
    </section>
  )
}
