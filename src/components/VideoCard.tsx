import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CommentsSheet from './CommentsSheet';
import VideoPlayer from './VideoPlayer';

interface Video {
  id: number;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  avatarUrl: string;
  soundName: string;
}

interface VideoCardProps {
  video: Video;
  onSwipe: (direction: 'up' | 'down') => void;
  filterEffect?: string | null;
  isActive?: boolean;
}

const VideoCard = ({ video, onSwipe, filterEffect, isActive = true }: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      onSwipe(diff > 0 ? 'up' : 'down');
    }
    
    setTouchStart(null);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div 
      className="relative h-full w-full bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <VideoPlayer 
        videoUrl={video.videoUrl}
        isActive={isActive}
        filterEffect={filterEffect}
      />

      <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-10">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`transition-all ${isLiked ? 'animate-pulse-scale' : ''}`}
          >
            <Icon 
              name={isLiked ? "Heart" : "Heart"} 
              size={36} 
              className={isLiked ? 'fill-primary text-primary' : 'text-foreground'}
            />
          </button>
          <span className="text-xs font-medium">{formatNumber(video.likes + (isLiked ? 1 : 0))}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={() => setShowComments(true)}
            className="hover:scale-110 transition-transform"
          >
            <Icon name="MessageCircle" size={36} />
          </button>
          <span className="text-xs font-medium">{formatNumber(video.comments)}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="hover:scale-110 transition-transform">
            <Icon name="Share2" size={32} />
          </button>
          <span className="text-xs font-medium">{formatNumber(video.shares)}</span>
        </div>

        <button className="hover:scale-110 transition-transform">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary animate-spin-slow" />
        </button>
      </div>

      <div className="absolute bottom-24 left-4 right-20 z-10 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
            <div className="w-full h-full rounded-full bg-muted" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{video.username}</h3>
          </div>
          <button className="ml-2 px-4 py-1 border-2 border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary hover:text-foreground transition-all">
            Подписаться
          </button>
        </div>

        <p className="text-sm mb-2 line-clamp-2">{video.description}</p>
        
        <div className="flex items-center gap-2 text-xs">
          <Icon name="Music" size={16} />
          <span className="truncate">{video.soundName}</span>
        </div>
      </div>

      <div className="absolute top-4 right-16 z-10 flex gap-4">
        <button className="hover:scale-110 transition-transform">
          <Icon name="Search" size={24} />
        </button>
      </div>

      <CommentsSheet
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        videoId={video.id}
        commentsCount={video.comments}
      />
    </div>
  );
};

export default VideoCard;