'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function VoiceSearchPrompt() {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  const startListening = () => {
    setIsListening(true);
    setIsTyping(false);
    setQuery('');
    
    // Simulate voice detection
    const sequence = [
      'Search for data in Karnataka districts...',
      'Looking for dialects in Bihar and Uttar Pradesh...',
      'Finalizing analysis of 109 languages...'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setQuery(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsListening(false);
          setIsProcessing(true);
          setTimeout(() => {
            setIsProcessing(true);
            setIsProcessing(false);
            setQuery('Showing 12 dialects found across 45 districts.');
          }, 1500);
        }, 1000);
      }
    }, 1500);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (!isTyping) setIsTyping(true);
    if (isListening) setIsListening(false);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 2000);
    }
  };

  return (
    <div className="voice-prompt-container premium-glass border-[#4285F4]/40 p-10 sm:p-16 relative z-10 shadow-2xl shadow-[#4285F4]/10">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: Enhanced Mic Button */}
        <div className="relative group">
          <button 
            onClick={startListening}
            className={`mic-button ${isListening ? 'active' : 'hover:scale-110'} transition-all duration-300 shadow-2xl`}
            title="Start Voice Search"
          >
            {isListening ? (
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-white/20 rounded-full animate-ping"></div>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                   <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </div>
            ) : (
              <svg className="w-8 h-8 text-white/80 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
            
            {/* Ambient Aura */}
            <div className={`absolute -inset-2 bg-[#4285F4]/20 rounded-full blur-xl transition-all duration-500 ${isListening ? 'opacity-100 scale-125' : 'opacity-0 scale-50'}`}></div>
          </button>
        </div>

        {/* Center: Interactive Input Area */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold text-[#4285F4] uppercase tracking-widest bg-[#4285F4]/10 px-3 py-1 rounded-full">
              {isListening ? 'Listening Ambient Voice...' : isProcessing ? 'Neural Processing...' : 'Dynamic Discovery'}
            </span>
          </div>

          <div className="relative group">
            <input 
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleSubmit}
              placeholder='Try "Tamil dialects in Chennai" or click the mic to speak...'
              className={`w-full bg-transparent border-b-2 transition-all duration-500 text-xl md:text-2xl font-medium outline-none pb-2 placeholder:text-white/20 ${isListening ? 'border-[#4285F4] text-[#4285F4]' : 'border-white/10 text-white focus:border-[#4285F4]'}`}
            />
            
            {/* Animated Cursor for Voice Mode */}
            {isListening && (
              <div className="absolute right-0 bottom-3 flex items-center gap-1">
                <div className="w-1 h-3 bg-[#4285F4] animate-bounce"></div>
                <div className="w-1 h-5 bg-[#4285F4] animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-1 h-3 bg-[#4285F4] animate-bounce [animation-delay:0.2s]"></div>
              </div>
            )}
          </div>

          {/* Languages Tags */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
             {[
               { name: 'English', color: 'bg-green-500' },
               { name: 'Hindi', color: 'bg-orange-500' },
               { name: 'Sanskrit', color: 'bg-yellow-500' },
               { name: '100+ Indic', color: 'bg-[#4285F4]' }
             ].map((lang) => (
               <div key={lang.name} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/50 uppercase hover:bg-white/10 transition-colors cursor-default">
                  <span className={`w-1.5 h-1.5 rounded-full ${lang.color}`}></span>
                  {lang.name}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Background Spectral Waves (Indic) */}
      <div className="absolute inset-x-0 bottom-0 h-1 overflow-hidden pointer-events-none opacity-30">
        <div className="flex items-end gap-[2px] w-full h-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 ${i % 3 === 0 ? 'bg-orange-500' : i % 3 === 1 ? 'bg-white' : 'bg-green-600'} transition-all`}
              style={{
                height: `${20 + Math.random() * 80}%`,
                animation: `indic-pulse ${1 + Math.random() * 2}s infinite alternate ease-in-out`,
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes indic-pulse {
          0% { height: 10%; opacity: 0.3; }
          100% { height: 100%; opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
