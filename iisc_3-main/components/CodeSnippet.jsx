"use client";

import { useState } from 'react';

export default function CodeSnippet() {
  const [copied, setCopied] = useState(false);
  const code = `from datasets import load_dataset\ndataset = load_dataset("ARTPARK-IISc/Vaani")`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-12 animate-fade-in">
      <div className="relative group rounded-xl bg-[#0F1117] border border-white/5 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Python</span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[11px] font-medium text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span className="text-[11px] font-medium text-white/60">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto scroller-hidden">
          <pre className="text-white selection:bg-[#4285F4]/30">
            <span className="text-blue-400">from</span> <span>datasets</span> <span className="text-blue-400">import</span> <span>load_dataset</span>{"\n"}
            <span>dataset</span> = <span>load_dataset</span>(<span className="text-emerald-400">"ARTPARK-IISc/Vaani"</span>)
          </pre>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#4285F4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
      
      <p className="mt-4 text-[12px] text-white/40 font-medium tracking-wide">
        Instantly load 31,000+ hours of speech via Hugging Face Datasets
      </p>

      <style jsx>{`
        .scroller-hidden::-webkit-scrollbar {
          display: none;
        }
        .scroller-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
