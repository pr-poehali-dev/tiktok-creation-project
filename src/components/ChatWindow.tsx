import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  isRead: boolean;
}

interface ChatWindowProps {
  chatId: number;
  username: string;
  onClose: () => void;
}

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Привет! Как делаешь такие видео?',
    time: '14:23',
    isMine: false,
    isRead: true
  },
  {
    id: 2,
    text: 'Привет! Это много практики и хороший монтаж 😊',
    time: '14:25',
    isMine: true,
    isRead: true
  },
  {
    id: 3,
    text: 'Можешь рассказать подробнее?',
    time: '14:26',
    isMine: false,
    isRead: true
  },
  {
    id: 4,
    text: 'Конечно! Я использую несколько приложений для съёмки и монтажа',
    time: '14:28',
    isMine: true,
    isRead: true
  },
  {
    id: 5,
    text: 'Основное - это хорошее освещение и стабилизация камеры',
    time: '14:28',
    isMine: true,
    isRead: false
  }
];

const ChatWindow = ({ username, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      isRead: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-background animate-fade-in">
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
          
          <div className="flex-1">
            <h2 className="font-semibold">{username}</h2>
            <p className="text-xs text-muted-foreground">онлайн</p>
          </div>

          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="Phone" size={22} />
          </button>
          
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="Video" size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-scale-in`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.isMine
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-card text-foreground rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 text-xs ${
                  message.isMine ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  <span>{message.time}</span>
                  {message.isMine && (
                    <Icon
                      name={message.isRead ? "CheckCheck" : "Check"}
                      size={14}
                      className={message.isRead ? 'text-secondary' : ''}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4 bg-card">
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Plus" size={24} />
            </button>

            <div className="flex-1 flex items-center gap-2 bg-background rounded-full px-4 py-2 border border-border">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Напишите сообщение..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Smile" size={20} />
              </button>
            </div>

            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Mic" size={24} />
            </button>

            {newMessage.trim() && (
              <button
                onClick={handleSend}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all animate-scale-in"
              >
                <Icon name="Send" size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
