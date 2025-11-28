import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { X } from 'lucide-react';

interface CameraRecorderProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoRecorded: (videoBlob: Blob) => void;
}

const CameraRecorder = ({ isOpen, onClose, onVideoRecorded }: CameraRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraReady(true);
      }
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      alert('Не удалось получить доступ к камере. Проверьте разрешения.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCameraReady(false);
    setIsRecording(false);
    setRecordingTime(0);
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9'
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      onVideoRecorded(blob);
      onClose();
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);

    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 60) {
          stopRecording();
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const togglePause = () => {
    if (!mediaRecorderRef.current) return;

    if (isPaused) {
      mediaRecorderRef.current.resume();
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      mediaRecorderRef.current.pause();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    setIsPaused(!isPaused);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (isRecording) {
      stopRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      <div className="relative h-full w-full flex flex-col">
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (isRecording) stopRecording();
                onClose();
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={28} className="text-white" />
            </button>

            <div className="flex items-center gap-3">
              {isRecording && (
                <div className="flex items-center gap-2 bg-primary px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-white">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            <button
              onClick={switchCamera}
              disabled={isRecording}
              className="p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
            >
              <Icon name="RefreshCw" size={24} className="text-white" />
            </button>
          </div>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="flex-1 w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => {}}
              className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
            >
              <Icon name="Sparkles" size={28} className="text-white" />
            </button>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!cameraReady}
              className={`relative w-20 h-20 rounded-full transition-all disabled:opacity-50 ${
                isRecording
                  ? 'bg-primary animate-pulse-scale'
                  : 'bg-white hover:scale-110'
              }`}
            >
              {isRecording ? (
                <div className="absolute inset-3 bg-white rounded-sm" />
              ) : (
                <div className="absolute inset-2 bg-primary rounded-full" />
              )}
            </button>

            {isRecording && (
              <button
                onClick={togglePause}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
              >
                <Icon name={isPaused ? "Play" : "Pause"} size={28} className="text-white" />
              </button>
            )}

            {!isRecording && (
              <button
                onClick={() => {}}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
              >
                <Icon name="Music" size={28} className="text-white" />
              </button>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-white text-sm">
            <button className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              15с
            </button>
            <button className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              60с
            </button>
            <button className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              3 мин
            </button>
          </div>
        </div>

        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <Icon name="Camera" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Загрузка камеры...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraRecorder;
