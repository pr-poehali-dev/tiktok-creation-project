import { useState } from 'react';
import Icon from '@/components/ui/icon';
import CameraRecorder from './CameraRecorder';
import { toast } from 'sonner';

const CreatePanel = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState<{ id: number; blob: Blob; thumbnail: string }[]>([]);

  const handleVideoRecorded = (videoBlob: Blob) => {
    const video = {
      id: Date.now(),
      blob: videoBlob,
      thumbnail: URL.createObjectURL(videoBlob)
    };
    
    setRecordedVideos(prev => [video, ...prev]);
    toast.success('Видео записано! 🎥', {
      description: 'Готово к публикации'
    });
  };

  const createOptions = [
    {
      id: 'camera',
      icon: 'Camera',
      title: 'Камера',
      description: 'Записать новое видео',
      gradient: 'from-primary to-pink-600',
      action: () => setShowCamera(true)
    },
    {
      id: 'upload',
      icon: 'Upload',
      title: 'Загрузить',
      description: 'Выбрать из галереи',
      gradient: 'from-secondary to-blue-600',
      action: () => toast.info('Функция загрузки видео скоро появится')
    },
    {
      id: 'template',
      icon: 'Sparkles',
      title: 'Шаблоны',
      description: 'Использовать готовый шаблон',
      gradient: 'from-purple-600 to-indigo-600',
      action: () => toast.info('Библиотека шаблонов скоро появится')
    },
    {
      id: 'live',
      icon: 'Radio',
      title: 'Прямой эфир',
      description: 'Начать трансляцию',
      gradient: 'from-red-600 to-orange-600',
      action: () => toast.info('Функция стриминга скоро появится')
    }
  ];

  return (
    <div className="h-full w-full bg-background overflow-y-auto pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-heading font-bold mb-6">Создать</h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {createOptions.map((option) => (
            <button
              key={option.id}
              onClick={option.action}
              className="relative aspect-square rounded-2xl overflow-hidden group hover:scale-95 transition-transform"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <Icon name={option.icon as any} size={48} className="mb-3" />
                <h3 className="font-heading font-bold text-lg mb-1">{option.title}</h3>
                <p className="text-xs opacity-90 text-center">{option.description}</p>
              </div>
            </button>
          ))}
        </div>

        {recordedVideos.length > 0 && (
          <div>
            <h2 className="text-lg font-heading font-bold mb-4">Черновики</h2>
            <div className="grid grid-cols-3 gap-2">
              {recordedVideos.map((video) => (
                <div key={video.id} className="relative aspect-[9/16] bg-card rounded-xl overflow-hidden group cursor-pointer">
                  <video
                    src={video.thumbnail}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Play" size={32} className="text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 p-1 bg-black/70 rounded-full">
                    <Icon name="Edit" size={16} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-card rounded-xl border border-border">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-primary/20 rounded-full">
              <Icon name="Lightbulb" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Советы для создания</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Снимайте вертикально для лучшего просмотра</li>
                <li>• Используйте хорошее освещение</li>
                <li>• Добавьте трендовую музыку</li>
                <li>• Первые 3 секунды самые важные!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CameraRecorder
        isOpen={showCamera}
        onClose={() => setShowCamera(false)}
        onVideoRecorded={handleVideoRecorded}
      />
    </div>
  );
};

export default CreatePanel;
