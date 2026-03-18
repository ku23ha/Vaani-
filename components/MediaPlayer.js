import React, { useEffect, useRef } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

const MediaPlayer = ({ url, options = {}, onReady }) => {
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  const isHtmlFile = url?.endsWith('.html');
  const isVideoFile = url?.endsWith('.mp4');

  useEffect(() => {
    if (isVideoFile && url) {
      // Create a <video> element dynamically for Video.js
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('video-js', 'vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      const player = videojs(videoElement, {
        ...options,
        controls: true,
        preload: 'auto',
        sources: [
          {
            src: url,
            type: 'video/mp4',
          },
        ],
      });

      playerRef.current = player;

      player.on('ready', () => {
        onReady && onReady(player);
      });

      player.on('error', (error) => {
        console.error('Video player error:', error);
      });

      return () => {
        playerRef.current?.dispose();
        playerRef.current = null;
      };
    }
  }, [url, options, onReady, isVideoFile]);

  if (!url) return null;

  // HTML file via iframe
  if (isHtmlFile) {
    return (
      <div className="aspect-w-16 aspect-h-9 w-full h-full">
        <iframe
          src={url}
          className="w-[560px] h-[400px] rounded-lg"
          frameBorder="0"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-popups"
        />
      </div>
    );
  }

  // MP4 video player
  if (isVideoFile) {
    return (
      <div className="aspect-w-16 aspect-h-9 w-full h-full">
        <div ref={videoRef} className="video-js-wrapper" />
      </div>
    );
  }

  // Fallback or unsupported format
  return (
    <div className="text-center text-red-500">
      Unsupported media type.
    </div>
  );
};

export default MediaPlayer;
