import Icon from '@/components/ui/icon';

const userVideos = [
  { id: 1, views: '1.2M', likes: '234K' },
  { id: 2, views: '890K', likes: '156K' },
  { id: 3, views: '2.1M', likes: '478K' },
  { id: 4, views: '654K', likes: '98K' },
  { id: 5, views: '1.8M', likes: '312K' },
  { id: 6, views: '723K', likes: '142K' }
];

const ProfilePanel = () => {
  return (
    <div className="h-full w-full bg-background overflow-y-auto pb-20">
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-primary to-secondary" />
        
        <div className="px-4 -mt-16">
          <div className="flex items-end justify-between mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-muted" />
            </div>
            <button className="mb-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all">
              Редактировать
            </button>
          </div>

          <h1 className="text-2xl font-heading font-bold">@my_username</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Творю контент каждый день ✨
          </p>

          <div className="flex items-center gap-6 mt-4">
            <div className="text-center">
              <div className="font-bold text-lg">234</div>
              <div className="text-xs text-muted-foreground">Подписки</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">12.4K</div>
              <div className="text-xs text-muted-foreground">Подписчиков</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">2.8M</div>
              <div className="text-xs text-muted-foreground">Лайков</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6 border-b border-border">
            <button className="flex items-center gap-2 px-4 py-3 border-b-2 border-primary text-primary font-semibold">
              <Icon name="Grid3x3" size={20} />
              Видео
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Heart" size={20} />
              Понравилось
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-4">
            {userVideos.map((video) => (
              <div key={video.id} className="relative aspect-[9/16] bg-muted rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/30" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-bold">
                  <Icon name="Play" size={14} />
                  {video.views}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
