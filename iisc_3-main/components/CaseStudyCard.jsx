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
    <div className={`bg-white rounded-lg shadow-lg p-8 h-[500px] flex flex-col ${className}`}>
      <div className="flex items-center gap-4 mb-4 flex-shrink-0">
        {companyLogo && (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-slate-200">
              <Image
                src={companyLogo}
                alt={`${companyName} logo`}
                width={43}
                height={43}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-slate-600 text-sm uppercase tracking-wide">
            {companyName || "[Company Name]"}
          </h4>
        </div>
      </div>


      <h3 className="font-display text-xl font-bold text-blue-600 mb-4 flex-shrink-0">
        {title || "[Case Study Title]"}
      </h3>


      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {basicContent.map((item, index) => (
              item.content && (
                <div key={index}>
                  <h4 className="font-semibold text-slate-900 mb-2">{item.label}</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              )
            ))}
            
            {isExpanded && extendedContent.map((item, index) => (
              item.content && (
                <div key={index + basicContent.length}>
                  <h4 className="font-semibold text-slate-900 mb-2">{item.label}</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
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
            className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
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
