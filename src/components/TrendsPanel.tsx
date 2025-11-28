import Icon from '@/components/ui/icon';

const trendingTopics = [
  { id: 1, name: '#DanceChallenge2024', views: '45.2M', videos: '892K', icon: 'Flame' },
  { id: 2, name: '#CookingHacks', views: '32.8M', videos: '654K', icon: 'Flame' },
  { id: 3, name: '#ArtTutorial', views: '28.4M', videos: '423K', icon: 'TrendingUp' },
  { id: 4, name: '#FitnessMotivation', views: '21.7M', videos: '389K', icon: 'TrendingUp' },
  { id: 5, name: '#TravelVlog', views: '19.3M', videos: '276K', icon: 'Sparkles' },
  { id: 6, name: '#ComedySketch', views: '17.9M', videos: '198K', icon: 'Sparkles' }
];

const TrendsPanel = () => {
  return (
    <div className="h-full w-full bg-background overflow-y-auto pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-heading font-bold mb-6">🔥 Тренды</h1>

        <div className="space-y-3">
          {trendingTopics.map((trend, index) => (
            <div
              key={trend.id}
              className="bg-card rounded-xl p-4 border border-border hover:border-primary transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg text-muted-foreground font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors">
                        {trend.name}
                      </h3>
                      <Icon 
                        name={trend.icon as any} 
                        size={20} 
                        className="text-primary"
                      />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={16} />
                        {trend.views} просмотров
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Play" size={16} />
                        {trend.videos} видео
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-all">
                  Смотреть
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-primary/30">
          <h2 className="text-lg font-heading font-bold mb-2">✨ Челлендж недели</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Присоединяйся к #DanceChallenge2024 и выигрывай призы!
          </p>
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-all">
            Участвовать
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendsPanel;
