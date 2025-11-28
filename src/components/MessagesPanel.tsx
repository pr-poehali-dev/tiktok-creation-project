import { useState } from 'react';
import Icon from '@/components/ui/icon';
import ChatWindow from './ChatWindow';

interface Chat {
  id: number;
  username: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    username: '@dance_lover',
    lastMessage: 'Привет! Как делаешь такие видео?',
    time: '5м',
    unread: 2,
    online: true
  },
  {
    id: 2,
    username: '@music_fan',
    lastMessage: 'Спасибо за совет! 🔥',
    time: '1ч',
    unread: 0,
    online: true
  },
  {
    id: 3,
    username: '@creative_soul',
    lastMessage: 'Пришли ссылку на трек',
    time: '2ч',
    unread: 1,
    online: false
  },
  {
    id: 4,
    username: '@video_master',
    lastMessage: 'Давай коллаб сделаем?',
    time: '5ч',
    unread: 0,
    online: false
  },
  {
    id: 5,
    username: '@art_creator',
    lastMessage: 'Отлично получилось!',
    time: '1д',
    unread: 0,
    online: false
  }
];

const MessagesPanel = () => {
  const [chats] = useState<Chat[]>(mockChats);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-background overflow-y-auto pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-heading font-bold">Сообщения</h1>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="PenSquare" size={24} />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск чатов..."
            className="w-full bg-card text-foreground px-4 py-3 pl-12 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className="w-full flex items-center gap-3 p-3 bg-card hover:bg-muted rounded-xl transition-all group"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary" />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                )}
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{chat.username}</h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <div className="ml-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Чаты не найдены</p>
          </div>
        )}
      </div>

      {selectedChat && (
        <ChatWindow
          chatId={selectedChat}
          username={chats.find(c => c.id === selectedChat)?.username || ''}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
};

export default MessagesPanel;
