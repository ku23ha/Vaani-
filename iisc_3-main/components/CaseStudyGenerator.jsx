import React, { useState } from 'react';
import { generateCaseStudyData } from '../src/utils/caseStudyParser';
import { CaseStudy } from './CaseStudy';

export function CaseStudyGenerator() {
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [rawContent, setRawContent] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    if (!companyName.trim() || !rawContent.trim()) {
      alert('Please provide both company name and content');
      return;
    }

    try {
      const data = generateCaseStudyData(rawContent, companyName, companyLogo || null);
      setGeneratedData(data);
      setShowPreview(true);
    } catch (error) {
      console.error('Error generating case study:', error);
      alert('Error generating case study. Please check your content format.');
    }
  };

  const handleDownloadData = () => {
    if (!generatedData) return;

    const dataStr = `// ${companyName} Case Study Data
// Generated automatically from content

import { generateCaseStudyData } from '../utils/caseStudyParser';

const rawContent = \`${rawContent}\`;

export const ${companyName.toLowerCase().replace(/\s+/g, '')}CaseStudyData = generateCaseStudyData(
  rawContent, 
  "${companyName}", 
  ${companyLogo ? `"${companyLogo}"` : 'null'}
);`;

    const blob = new Blob([dataStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyName.toLowerCase().replace(/\s+/g, '')}CaseStudyData.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPage = () => {
    if (!generatedData) return;

    const pageStr = `import { useState, useEffect } from 'react';
import Head from 'next/head';
import { CaseStudy } from '../../components/CaseStudy';
import { ${companyName.toLowerCase().replace(/\s+/g, '')}CaseStudyData } from '../../src/data/${companyName.toLowerCase().replace(/\s+/g, '')}CaseStudyData';
import { CaseStudiesHeader } from '../../components/CaseStudiesHeader';
import { CaseStudiesFooter } from '../../components/CaseStudiesFooter';

export default function ${companyName.replace(/\s+/g, '')}CaseStudyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { metadata, header } = ${companyName.toLowerCase().replace(/\s+/g, '')}CaseStudyData;

  return (
    <>
      <Head>
        <title>{\`\${header.mainTitle} - \${metadata.companyName} Case Study | Vaani Dataset\`}</title>
        <meta 
          name="description" 
          content={\`Learn how \${metadata.companyName} achieved breakthrough results using the Vaani dataset. \${header.subtitle}\`}
        />
      </Head>

      <div className="bg-slate-50">
        {isClient && <CaseStudiesHeader />}
        <CaseStudy caseStudyData={${companyName.toLowerCase().replace(/\s+/g, '')}CaseStudyData} />
        <CaseStudiesFooter />
      </div>
    </>
  );
}`;

    const blob = new Blob([pageStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedData.metadata.id}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (showPreview && generatedData) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Preview Header */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Case Study Preview</h1>
              <p className="text-slate-600">Preview for {companyName}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Back to Editor
              </button>
              <button
                onClick={handleDownloadData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Data File
              </button>
              <button
                onClick={handleDownloadPage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Download Page File
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <CaseStudy caseStudyData={generatedData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Case Study Generator</h1>
          <p className="text-slate-600 mb-8">
            Generate a professional case study page by pasting your content and specifying the company name.
          </p>

          {/* Company Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., SandLogic Technologies"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Logo Path (optional)
                </label>
                <input
                  type="text"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  placeholder="e.g., /logos/company.jpg"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Case Study Content</h2>
            <p className="text-sm text-slate-600 mb-3">
              Paste your case study content with numbered sections (1., 2., 3., etc.). 
              The system will automatically parse sections, subsections (A., B., C.), bullet points, and tables.
            </p>
            
            <textarea
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              placeholder={`1. Summary
Your summary content here...

2. The Challenge
Your challenge content here...
• Bullet point 1
• Bullet point 2

3. The Solution
Your solution content here...

A. Subsection A
Content for subsection A...

B. Subsection B
Content for subsection B...

4. Results
Your results content here...`}
              rows={20}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              disabled={!companyName.trim() || !rawContent.trim()}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Generate Case Study
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Structure your content with numbered sections (1., 2., 3., etc.)</li>
              <li>• Use subsections with letters (A., B., C., etc.) when needed</li>
              <li>• Add bullet points with • or - symbols</li>
              <li>• Tables will be auto-detected if formatted with columns</li>
              <li>• Percentages with ~ will be automatically highlighted</li>
              <li>• The URL will be: /case-studies/{companyName.toLowerCase().replace(/\s+/g, '-')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyGenerator;
