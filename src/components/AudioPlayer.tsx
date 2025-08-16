import { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  duration?: number; // in seconds
}

export const AudioPlayer = ({ isPlaying, duration = 32 }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
      
      // Stop audio after specified duration (32 seconds = 0.32 minutes)
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }, duration * 1000);
      
      return () => clearTimeout(timer);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, duration]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      loop={false}
      style={{ display: 'none' }}
    >
      {/* Note: YouTube URLs cannot be used directly as audio sources */}
      {/* You would need to upload the audio file or use a different hosting service */}
    </audio>
  );
};