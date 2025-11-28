import { useState } from 'react';
import VideoFeed from '@/components/VideoFeed';
import BottomNav from '@/components/BottomNav';
import SearchPanel from '@/components/SearchPanel';
import ProfilePanel from '@/components/ProfilePanel';
import TrendsPanel from '@/components/TrendsPanel';
import NotificationsPanel from '@/components/NotificationsPanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'search':
        return <SearchPanel />;
      case 'trends':
        return <TrendsPanel />;
      case 'notifications':
        return <NotificationsPanel />;
      case 'profile':
        return <ProfilePanel />;
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="h-screen w-screen bg-background overflow-hidden relative">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
