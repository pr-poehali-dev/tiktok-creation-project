import Icon from '@/components/ui/icon';

const notifications = [
  {
    id: 1,
    type: 'like',
    user: '@user_123',
    action: 'оценил ваше видео',
    time: '5 мин назад',
    icon: 'Heart'
  },
  {
    id: 2,
    type: 'comment',
    user: '@creative_girl',
    action: 'прокомментировал: "Супер!"',
    time: '15 мин назад',
    icon: 'MessageCircle'
  },
  {
    id: 3,
    type: 'follow',
    user: '@dance_pro',
    action: 'подписался на вас',
    time: '1 час назад',
    icon: 'UserPlus'
  },
  {
    id: 4,
    type: 'mention',
    user: '@music_lover',
    action: 'упомянул вас в комментарии',
    time: '2 часа назад',
    icon: 'AtSign'
  },
  {
    id: 5,
    type: 'like',
    user: '@foodie_world',
    action: 'оценил ваше видео',
    time: '3 часа назад',
    icon: 'Heart'
  }
];

const NotificationsPanel = () => {
  return (
    <div className="h-full w-full bg-background overflow-y-auto pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-heading font-bold mb-6">Уведомления</h1>

        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-muted transition-all cursor-pointer group"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === 'like' ? 'bg-primary/20' :
                notification.type === 'comment' ? 'bg-secondary/20' :
                notification.type === 'follow' ? 'bg-accent/20' :
                'bg-muted'
              }`}>
                <Icon 
                  name={notification.icon as any} 
                  size={20} 
                  className={
                    notification.type === 'like' ? 'text-primary' :
                    notification.type === 'comment' ? 'text-secondary' :
                    notification.type === 'follow' ? 'text-accent' :
                    'text-foreground'
                  }
                />
              </div>

              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{notification.user}</span>
                  {' '}
                  <span className="text-muted-foreground">{notification.action}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>

              <div className="w-12 h-12 bg-muted rounded-lg" />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Загрузить ещё
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
