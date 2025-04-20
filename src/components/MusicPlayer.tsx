
import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
}

const warSongs: Song[] = [
  {
    id: 1,
    title: "Катюша",
    artist: "М. Блантер, М. Исаковский",
    src: "https://example.com/songs/katyusha.mp3" // Заглушка URL
  },
  {
    id: 2,
    title: "День Победы",
    artist: "Д. Тухманов, В. Харитонов",
    src: "https://example.com/songs/den-pobedy.mp3" // Заглушка URL
  },
  {
    id: 3,
    title: "Синий платочек",
    artist: "Е. Петерсбурский, Я. Галицкий",
    src: "https://example.com/songs/siniy-platochek.mp3" // Заглушка URL
  }
];

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState<Song>(warSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
      setDuration(audioRef.current?.duration || 0);
    };
    
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      setIsPlaying(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener('canplay', handleCanPlay);
      audioRef.current.removeEventListener('error', handleError);
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setHasError(true);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    if (hasError) return;
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) {
      setIsMuted(false);
    }
  };
  
  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };
  
  const nextSong = () => {
    const currentIndex = warSongs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % warSongs.length;
    setCurrentSong(warSongs[nextIndex]);
    setIsLoading(true);
    setHasError(false);
  };
  
  const prevSong = () => {
    const currentIndex = warSongs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + warSongs.length) % warSongs.length;
    setCurrentSong(warSongs[prevIndex]);
    setIsLoading(true);
    setHasError(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold line-clamp-1">{currentSong.title}</h3>
              <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMute} 
                className="h-8 w-8"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="w-20">
                <Slider 
                  value={[isMuted ? 0 : volume]} 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleVolumeChange} 
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <Slider 
              value={[currentTime]} 
              min={0} 
              max={duration || 100} 
              step={0.1} 
              onValueChange={handleProgressChange} 
              disabled={isLoading || hasError}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevSong} 
              className="h-8 w-8"
              disabled={isLoading}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant={hasError ? "destructive" : "default"} 
              size="icon" 
              onClick={togglePlay} 
              disabled={isLoading || hasError}
              className="h-10 w-10 rounded-full"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : hasError ? (
                "❌"
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextSong} 
              className="h-8 w-8"
              disabled={isLoading}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          {hasError && (
            <p className="text-xs text-center text-destructive">
              Не удалось загрузить аудио. Проверьте подключение к интернету.
            </p>
          )}
        </div>
        
        <audio 
          ref={audioRef} 
          src={currentSong.src} 
          preload="auto"
          style={{ display: 'none' }}
        />
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
