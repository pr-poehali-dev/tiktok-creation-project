import { useState } from 'react';
import VideoFeed from '@/components/VideoFeed';
import BottomNav from '@/components/BottomNav';
import SearchPanel from '@/components/SearchPanel';
import ProfilePanel from '@/components/ProfilePanel';
import TrendsPanel from '@/components/TrendsPanel';
import NotificationsPanel from '@/components/NotificationsPanel';
import MessagesPanel from '@/components/MessagesPanel';
import CreatePanel from '@/components/CreatePanel';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'search':
        return <SearchPanel />;
      case 'create':
        return <CreatePanel />;
      case 'messages':
        return <MessagesPanel />;
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