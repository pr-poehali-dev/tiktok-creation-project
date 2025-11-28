import Icon from '@/components/ui/icon';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navItems = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'search', icon: 'Search', label: 'Поиск' },
    { id: 'create', icon: 'PlusSquare', label: 'Создать' },
    { id: 'notifications', icon: 'Bell', label: 'Уведомления' },
    { id: 'profile', icon: 'User', label: 'Профиль' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-30">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name={item.icon as any} 
              size={24}
              className={activeTab === item.id ? 'scale-110' : ''}
            />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
