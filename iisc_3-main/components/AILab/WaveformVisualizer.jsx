import React from 'react';

export default function WaveformVisualizer({ isPlaying }) {
  // Generate 40 bars for the waveform
  const bars = Array.from({ length: 40 });

  return (
    <div className="flex items-center gap-[2px] h-16 w-full max-w-md mx-auto justify-center overflow-hidden">
      {bars.map((_, i) => {
        // Create a pseudo-random looking wave by varying max height and animation delay
        const minHeight = 10;
        const randomBonus = (Math.sin(i * 0.5) * 0.5 + 0.5) * 40 + Math.random() * 20; // values between ~10 and 70
        const height = isPlaying ? minHeight + randomBonus : minHeight;
        
        // Closer to center = slightly louder/taller overall
        const distanceFromCenter = Math.abs(20 - i);
        const centerEmphasis = Math.max(0, 15 - distanceFromCenter) * 2;
        
        const finalHeight = isPlaying ? Math.min(100, height + centerEmphasis) : 4;
        
        return (
          <div
            key={i}
            className="w-1.5 rounded-full transition-all duration-150 ease-out"
            style={{
              height: `${finalHeight}%`,
              background: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
              opacity: isPlaying ? 0.7 + (Math.random() * 0.3) : 0.3,
              // Add CSS animation if playing
              animation: isPlaying ? `waveform-bounce ${0.4 + Math.random() * 0.4}s ease-in-out infinite alternate` : 'none',
              animationDelay: `${Math.random() * 0.5}s`
            }}
          />
        );
      })}
      
      <style jsx global>{`
        @keyframes waveform-bounce {
          0% { transform: scaleY(0.7); }
          100% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}
