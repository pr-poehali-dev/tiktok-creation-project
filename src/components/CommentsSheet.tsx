import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { X } from 'lucide-react';

interface Comment {
  id: number;
  username: string;
  text: string;
  likes: number;
  time: string;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: number;
  commentsCount: number;
}

const mockComments: Comment[] = [
  {
    id: 1,
    username: '@dance_lover',
    text: 'Супер круто! 🔥 Как ты это делаешь?',
    likes: 234,
    time: '2ч',
    isLiked: false,
    replies: [
      {
        id: 11,
        username: '@creative_soul',
        text: 'Спасибо! Это много практики 😊',
        likes: 45,
        time: '1ч',
        isLiked: false
      },
      {
        id: 12,
        username: '@dance_lover',
        text: 'Буду тренироваться! 💪',
        likes: 12,
        time: '1ч',
        isLiked: false
      }
    ]
  },
  {
    id: 2,
    username: '@music_fan',
    text: 'Какой трек играет? 🎵',
    likes: 189,
    time: '3ч',
    isLiked: true
  },
  {
    id: 3,
    username: '@video_master',
    text: 'Монтаж просто огонь 🎬',
    likes: 456,
    time: '5ч',
    isLiked: false,
    replies: [
      {
        id: 31,
        username: '@creative_soul',
        text: 'Благодарю! ❤️',
        likes: 23,
        time: '4ч',
        isLiked: false
      }
    ]
  },
  {
    id: 4,
    username: '@newbie_user',
    text: 'Это лучшее видео, что я видел сегодня! 😍',
    likes: 98,
    time: '6ч',
    isLiked: false
  }
];

const CommentsSheet = ({ isOpen, onClose, commentsCount }: CommentsSheetProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map(reply =>
              reply.id === commentId
                ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
                : reply
            )
          };
        }
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      })
    );
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now(),
      username: '@my_username',
      text: newComment,
      likes: 0,
      time: 'только что',
      isLiked: false
    };

    if (replyingTo) {
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === replyingTo
            ? {
                ...comment,
                replies: [...(comment.replies || []), newCommentObj]
              }
            : comment
        )
      );
      setReplyingTo(null);
    } else {
      setComments([newCommentObj, ...comments]);
    }

    setNewComment('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl max-h-[80vh] flex flex-col animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-bold">
            {commentsCount} комментариев
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  
                  <p className="text-sm mb-2">{comment.text}</p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <Icon
                        name="Heart"
                        size={14}
                        className={comment.isLiked ? 'fill-primary text-primary' : ''}
                      />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                    
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Ответить
                    </button>
                  </div>
                </div>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 space-y-3 border-l-2 border-muted pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex-shrink-0" />
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{reply.username}</span>
                          <span className="text-xs text-muted-foreground">{reply.time}</span>
                        </div>
                        
                        <p className="text-sm mb-2">{reply.text}</p>
                        
                        <button
                          onClick={() => handleLike(reply.id, true, comment.id)}
                          className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
                        >
                          <Icon
                            name="Heart"
                            size={14}
                            className={reply.isLiked ? 'fill-primary text-primary' : ''}
                          />
                          {reply.likes > 0 && <span>{reply.likes}</span>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          {replyingTo && (
            <div className="flex items-center gap-2 mb-2 text-sm">
              <span className="text-muted-foreground">
                Ответ на {comments.find(c => c.id === replyingTo)?.username}
              </span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-primary hover:text-primary/80"
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
            
            <div className="flex-1 flex items-center gap-2 bg-background rounded-full px-4 py-2 border border-border">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder={replyingTo ? 'Напишите ответ...' : 'Добавить комментарий...'}
                className="flex-1 bg-transparent outline-none text-sm"
              />
              
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Smile" size={20} />
              </button>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="text-primary hover:text-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-bold"
            >
              <Icon name="Send" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSheet;
