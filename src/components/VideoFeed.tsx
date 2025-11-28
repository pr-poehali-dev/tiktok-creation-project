import { useState } from 'react';
import VideoCard from './VideoCard';
import FilterPanel from './FilterPanel';

const mockVideos = [
  {
    id: 1,
    username: '@creative_soul',
    description: 'Танцую под новый трек 🔥 #dance #trending',
    likes: 234500,
    comments: 1204,
    shares: 892,
    videoUrl: '/placeholder.svg',
    avatarUrl: '/placeholder.svg',
    soundName: 'Original Sound - creative_soul'
  },
  {
    id: 2,
    username: '@art_master',
    description: 'Рисую портрет за 60 секунд ✨ #art #speedpaint',
    likes: 189200,
    comments: 956,
    shares: 743,
    videoUrl: '/placeholder.svg',
    avatarUrl: '/placeholder.svg',
    soundName: 'Chill Beats - LoFi Master'
  },
  {
    id: 3,
    username: '@food_lover',
    description: 'Готовлю идеальную пасту 🍝 #cooking #recipe',
    likes: 312000,
    comments: 1567,
    shares: 1023,
    videoUrl: '/placeholder.svg',
    avatarUrl: '/placeholder.svg',
    soundName: 'Kitchen Vibes - Chef Sound'
  }
];

const VideoFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < mockVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <VideoCard 
          video={mockVideos[currentIndex]} 
          onSwipe={handleSwipe}
          filterEffect={selectedFilter}
          isActive={true}
        />
      </div>
      
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-4 right-4 z-20 bg-card/80 backdrop-blur-sm text-foreground p-3 rounded-full hover:bg-card transition-all"
      >
        ✨
      </button>

      {showFilters && (
        <FilterPanel 
          onClose={() => setShowFilters(false)}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
        />
      )}
    </div>
  );
};

export default VideoFeed;