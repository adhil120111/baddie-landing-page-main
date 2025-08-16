import { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  isPlaying: boolean;
  audioUrl: string;
  duration?: number; // in seconds
}

export const AudioPlayer = ({ isPlaying, audioUrl, duration = 32 }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
      
      // Stop audio after specified duration
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
      <source src={audioUrl} type="audio/mpeg" />
    </audio>
  );
};