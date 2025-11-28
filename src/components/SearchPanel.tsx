import { useState } from 'react';
import Icon from '@/components/ui/icon';

const trendingSearches = [
  '#dance', '#cooking', '#art', '#music', '#comedy', '#travel',
  '#fitness', '#beauty', '#gaming', '#pets', '#diy', '#education'
];

const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-full w-full bg-background overflow-y-auto pb-20">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Искать видео, людей..."
            className="w-full bg-card text-foreground px-4 py-3 pl-12 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-heading font-bold mb-4">Популярные хэштеги</h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-card hover:bg-muted rounded-full text-sm font-medium border border-border transition-all hover:scale-105"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-heading font-bold mb-4">Рекомендуемые аккаунты</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <div>
                    <h3 className="font-semibold">@user_{i}</h3>
                    <p className="text-sm text-muted-foreground">1.2M подписчиков</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                  Подписаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
