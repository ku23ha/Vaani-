import Image from 'next/image'
import { Button } from './Button'
import { useState } from 'react'

export function CaseStudyCard({ 
  title, 
  companyName, 
  companyLogo, 
  problemStatement, 
  solution, 
  outcome, 
  businessImpact, 
  readMoreLink = "#",
  className = ""
}) {
  const [isExpanded, setIsExpanded] = useState(false)


  const basicContent = [
    { label: "Problem Statement:", content: problemStatement },
    { label: "Solution:", content: solution }
  ]

  const extendedContent = [
    { label: "Outcome:", content: outcome },
    { label: "Business Impact:", content: businessImpact }
  ]

  const allContent = [...basicContent, ...extendedContent]

  return (
    <div className={`bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 h-[600px] flex flex-col backdrop-blur-xl hover:border-[#4285F4]/30 transition-all duration-500 ${className}`}>
      <div className="flex flex-col items-center gap-6 mb-8 flex-shrink-0">
        {companyLogo && (
          <div className="flex-shrink-0 w-full flex justify-center">
            <div className="relative h-20 w-48 transition-transform duration-500 hover:scale-105">
              <Image
                src={companyLogo}
                alt={`${companyName} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
        <div className="text-center">
          <h4 className="font-black text-white/30 text-[10px] uppercase tracking-[0.4em]">
            {companyName || "[Company Name]"}
          </h4>
        </div>
      </div>


      <h3 className="font-display text-xl font-bold text-[#4285F4] mb-4 flex-shrink-0">
        {title || "[Case Study Title]"}
      </h3>


      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {basicContent.map((item, index) => (
              item.content && (
                <div key={index}>
                  <h4 className="font-semibold text-white/90 mb-2">{item.label}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )
            ))}
            
            {isExpanded && extendedContent.map((item, index) => (
              item.content && (
                <div key={index + basicContent.length}>
                  <h4 className="font-semibold text-white/90 mb-2">{item.label}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>


        <div className="mt-4 flex justify-center flex-shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#4285F4] text-sm hover:text-[#8AB4F8] transition-colors"
          >
            {isExpanded ? 'Show Less' : 'See More'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center flex-shrink-0">
        <Button 
          color="blue" 
          className="px-6 py-2 text-sm"
          href={readMoreLink}
          target={readMoreLink.startsWith('http') ? "_blank" : undefined}
          rel={readMoreLink.startsWith('http') ? "noopener noreferrer" : undefined}
        >
          Read Full Case Study
        </Button>
      </div>
    </div>
  )
}
