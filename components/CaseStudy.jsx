import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './Container';

// Content Block Components
// const ParagraphBlock = ({ text }) => (
//   <p className="text-slate-700 leading-relaxed mb-4 text-base">
//     {text.split('**').map((part, index) => 
//       index % 2 === 1 ? <strong key={index} className="font-semibold text-slate-900">{part}</strong> : part
//     )}
const ParagraphBlock = ({ text }) => {
  const parseLinks = (input) => {
    const regex = /\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        parts.push(input.slice(lastIndex, match.index));
      }

      parts.push(
        <a
          key={parts.length}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {match[1]}
        </a>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < input.length) {
      parts.push(input.slice(lastIndex));
    }

    return parts;
  };

  const parseBold = (nodes) => {
    return nodes.flatMap((node, index) => {
      if (typeof node !== "string") {
        return node;
      }

      const boldSplit = node.split("**");

      return boldSplit.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <strong
              key={`${index}-${i}`}
              className="font-semibold text-slate-900"
            >
              {part}
            </strong>
          );
        }
        return part;
      });
    });
  };

  const withLinks = parseLinks(text);   
  const withBold = parseBold(withLinks);

  return (
    <p className="text-slate-700 leading-relaxed mb-4 text-base">
      {withBold}
    </p>
  );
};

const BulletsBlock = ({ items }) => (
  <ul className="space-y-3 mb-6">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
        <span className="text-slate-700 leading-relaxed">
          {item.split('**').map((part, partIndex) => 
            partIndex % 2 === 1 ? <strong key={partIndex} className="font-semibold text-slate-900">{part}</strong> : part
          )}
        </span>
      </li>
    ))}
  </ul>
);

const SubheadingBlock = ({ text }) => (
  <h4 className="text-lg font-semibold text-slate-900 mt-8 mb-4 border-l-4 border-blue-600 pl-4">
    {text}
  </h4>
);

const TableBlock = ({ title, headers, rows, highlight = [] }) => (
  <div className="my-8">
    {title && (
      <h5 className="text-base font-semibold text-slate-900 mb-4 text-center">{title}</h5>
    )}
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 text-left text-sm font-semibold border-r border-blue-500 last:border-r-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50 transition-colors`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`px-6 py-4 text-sm border-b border-slate-200 border-r border-slate-200 last:border-r-0 ${
                  highlight.some(h => cell.includes(h)) 
                    ? 'font-bold text-blue-700 bg-blue-100' 
                    : 'text-slate-700'
                }`}>
                  {cell.includes('[') && cell.includes('](') ? (
                    <span>
                      {cell.split(/(\[.*?\]\(.*?\))/).map((part, partIndex) => {
                        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                        if (linkMatch) {
                          return (
                            <a
                              key={partIndex}
                              href={linkMatch[2]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {linkMatch[1]}
                            </a>
                          );
                        }
                        return part;
                      })}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Content Renderer
const ContentRenderer = ({ content }) => {
  return content.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return <ParagraphBlock key={index} text={block.text} />;
      case 'bullets':
        return <BulletsBlock key={index} items={block.items} />;
      case 'subheading':
        return <SubheadingBlock key={index} text={block.text} />;
      case 'table':
        return (
          <TableBlock 
            key={index} 
            title={block.title}
            headers={block.headers} 
            rows={block.rows}
            highlight={block.highlight}
          />
        );
      default:
        return null;
    }
  });
};

// Section Component
const Section = ({ section }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b-2 border-blue-600">
      {section.title}
    </h2>
    
    <div className="prose prose-slate max-w-none">
      <ContentRenderer content={section.content} />
      
      {section.subsections && section.subsections.map((subsection, index) => (
        <div key={index} className="mt-10">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded mr-3">
              {String.fromCharCode(65 + index)}
            </span>
            {subsection.title}
          </h3>
          <div className="ml-8">
            <ContentRenderer content={subsection.content} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Main CaseStudy Component
export function CaseStudy({ caseStudyData }) {
  const { metadata, header, sections } = caseStudyData;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Company Info */}
            <div className="flex items-center justify-center mb-8">
              {metadata.companyLogo && (
                <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                  <Image
                    src={metadata.companyLogo}
                    alt={`${metadata.companyName} logo`}
                    width={40}
                    height={40}
                    className="object-contain mr-3"
                  />
                  <span className="font-semibold text-slate-900">{metadata.companyName}</span>
                </div>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {header.mainTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
              {header.subtitle}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-center space-x-6 text-blue-200">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {metadata.date}
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {metadata.readTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Sections */}
      <main className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <Section key={section.id || index} section={section} />
            ))}
          </div>
        </Container>
      </main>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Interested in Building with the Vaani Dataset?
            </h3>
            <p className="text-slate-300 mb-8 text-lg">
              Discover how your organization can leverage India&apos;s largest speech dataset for breakthrough AI applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://huggingface.co/datasets/ARTPARK-IISc/Vaani"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-colors"
              >
                Access Dataset
              </a>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-slate-900 transition-colors"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default CaseStudy;
