'use client';
import React, { useState, useEffect } from 'react';
import NeuralThinking from './NeuralThinking';
import WaveformVisualizer from './WaveformVisualizer';

const DEMO_PROMPTS = [
  "Hey Vaani, can you translate this audio to fluent Hindi?",
  "Read this script with a highly energetic and excited tone.",
  "Analyze this audio for emotional distress markers.",
];

export default function AIPlayground() {
  // 'idle', 'generating', 'playing', 'ready'
  const [status, setStatus] = useState('idle');
  const [inputText, setInputText] = useState('');
  const [streamedOutput, setStreamedOutput] = useState('');
  
  // Streaming simulation
  useEffect(() => {
    if (status === 'generating') {
      const texts = [
        "Initializing voice cloning model...",
        "Analyzing emotional context: 'Neutral' -> 'Energetic'",
        "Synthesizing speech frames (0% -> 45%)",
        "Synthesizing speech frames (45% -> 80%)",
        "Finalizing audio waveform...",
        "Generation complete."
      ];
      
      let step = 0;
      setStreamedOutput('');
      
      const interval = setInterval(() => {
        if (step < texts.length) {
          setStreamedOutput(prev => prev + (prev ? '\\n' : '') + texts[step]);
          step++;
        } else {
          clearInterval(interval);
          setStatus('ready');
        }
      }, 700); // 700ms between "streamed" logs
      
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setStatus('generating');
  };

  const handlePlay = () => {
    setStatus('playing');
    // Simulate playing for 4 seconds
    setTimeout(() => {
      setStatus('ready');
    }, 4000);
  };

  const handleRemix = () => {
    setStatus('idle');
    setStreamedOutput('');
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'transparent' }}>
      {/* Background glow specific to the playground */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4285F4] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase text-[#4285F4] mb-4">
            Interactive Demo
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
            Experience the Magic
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Test the capabilities of models built on Vaani's open dataset. Generate, stream, and interact in real-time.
          </p>
        </div>

        {/* Playground Container */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl shadow-[#4285F4]/5 bg-[#0A0A0A]/80 backdrop-blur-xl">
          
          {/* Input Area (Visible when idle) */}
          <div className={`transition-all duration-500 ease-in-out ${status === 'idle' ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-white/80 mb-2 font-mono uppercase tracking-wider">
                Prompt Editor
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a script, or try a demo prompt below..."
                className="w-full h-32 bg-[#111111] border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-[#4285F4]/50 focus:ring-1 focus:ring-[#4285F4]/50 transition-all resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {DEMO_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(prompt)}
                  className="text-xs text-[#4285F4] bg-[#4285F4]/10 border border-[#4285F4]/20 hover:bg-[#4285F4]/20 px-3 py-1.5 rounded-full transition-colors"
                >
                  {prompt.substring(0, 30)}...
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!inputText.trim()}
              className="w-full sm:w-auto px-8 py-3 bg-[#4285F4] hover:bg-[#1967D2] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Generate Audio</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>

          {/* Processing / Streaming Area */}
          <div className={`transition-all duration-500 delay-300 ease-in-out ${status === 'generating' ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <NeuralThinking />
            <div className="bg-[#050505] border border-white/5 rounded-lg p-5 mt-6 font-mono text-sm text-[#8AB4F8] min-h-[160px] whitespace-pre-wrap leading-relaxed shadow-inner">
              <div className="flex items-center gap-3 mb-4 text-xs tracking-widest uppercase text-white/40 border-b border-white/5 pb-2">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse"></span>
                Streaming AI Output
              </div>
              {streamedOutput}
              <span className="inline-block w-2 bg-[#4285F4] ml-1 animate-pulse h-4 align-middle"></span>
            </div>
          </div>

          {/* Result / Playback Area */}
          <div className={`transition-all duration-500 ease-in-out ${status === 'ready' || status === 'playing' ? 'opacity-100 max-h-[500px] mt-4' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-semibold mb-6">
                Generation Success
              </span>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto italic">
                "{inputText}"
              </p>
              
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:px-10 flex flex-col items-center">
                <WaveformVisualizer isPlaying={status === 'playing'} />
                
                <div className="flex items-center gap-4 mt-8">
                  <button 
                    onClick={status === 'playing' ? () => setStatus('ready') : handlePlay}
                    className="w-12 h-12 bg-[#4285F4] hover:bg-[#1967D2] text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-[#4285F4]/30"
                  >
                    {status === 'playing' ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                      <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </button>
                  <div className="text-xs text-white/50 font-mono">
                    {status === 'playing' ? '0:02 / 0:04' : '0:00 / 0:04'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 border-t border-white/10 pt-6">
              <button 
                onClick={handleRemix}
                className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Remix Prompt
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
