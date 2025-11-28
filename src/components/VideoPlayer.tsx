import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
  filterEffect?: string | null;
}

const VideoPlayer = ({ videoUrl, isActive, filterEffect }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      startProgressTracking();
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      stopProgressTracking();
    }

    return () => {
      stopProgressTracking();
    };
  }, [isActive]);

  const startProgressTracking = () => {
    progressInterval.current = setInterval(() => {
      if (videoRef.current) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
        
        if (videoRef.current.ended) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        stopProgressTracking();
      } else {
        videoRef.current.play();
        startProgressTracking();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const filterClass = filterEffect ? `filter-${filterEffect}` : '';

  const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="relative w-full h-full" onClick={handleVideoClick}>
      <video
        ref={videoRef}
        src={videoUrl === '/placeholder.svg' ? sampleVideoUrl : videoUrl}
        loop
        muted={isMuted}
        playsInline
        className={`w-full h-full object-cover ${filterClass}`}
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        }}
      />

      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 animate-fade-in">
          <div className="p-6 bg-black/50 rounded-full backdrop-blur-sm">
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={48} 
              className="text-white"
            />
          </div>
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute bottom-32 right-4 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
      >
        <Icon 
          name={isMuted ? "VolumeX" : "Volume2"} 
          size={20} 
          className="text-white"
        />
      </button>

      <div className="absolute bottom-28 left-0 right-0 z-10 px-4">
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
