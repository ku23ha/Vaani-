import React from 'react';

export default function NeuralThinking() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-32 h-32">
        {/* Core glowing orb */}
        <div className="absolute inset-0 m-auto w-12 h-12 bg-[#4285F4] rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute inset-0 m-auto w-8 h-8 bg-gradient-to-tr from-[#1967D2] to-[#8AB4F8] rounded-full shadow-[0_0_20px_rgba(66,133,244,0.6)] animate-pulse"></div>

        {/* Orbiting nodes */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s', animationTimingFunction: 'linear' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#8AB4F8] rounded-full shadow-[0_0_10px_#8AB4F8]"></div>
        </div>
        
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse', animationTimingFunction: 'linear' }}>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#4285F4] rounded-full shadow-[0_0_10px_#4285F4]"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white opacity-70 rounded-full"></div>
        </div>

        {/* Neural connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full animate-pulse" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(66,133,244,0.3)" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 6" />
        </svg>
      </div>
    </div>
  );
}
