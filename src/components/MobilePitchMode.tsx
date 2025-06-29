import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Pause,
  RotateCcw,
  Share2,
  Volume2,
  VolumeX,
  Maximize,
  Minimize
} from 'lucide-react';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

interface Slide {
  id: string;
  title: string;
  content: string;
}

interface MobilePitchModeProps {
  slides: Slide[];
  isOpen: boolean;
  onClose: () => void;
  selectedTheme: string;
}

export const MobilePitchMode: React.FC<MobilePitchModeProps> = ({
  slides,
  isOpen,
  onClose,
  selectedTheme
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playingVoiceover, setPlayingVoiceover] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setIsAutoPlay(false);
            toast.info('📱 Presentation finished');
            return prev;
          }
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isAutoPlay, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen, currentSlide]);

  // Touch/swipe handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      toast.success(`📱 Slide ${currentSlide + 2}`);
    } else {
      toast.info('📱 Last slide reached');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      toast.success(`📱 Slide ${currentSlide}`);
    } else {
      toast.info('📱 First slide reached');
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    toast.success(isAutoPlay ? '⏸️ Auto-play stopped' : '▶️ Auto-play started');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      toast.success('📱 Entered fullscreen mode');
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
      toast.success('📱 Exited fullscreen mode');
    }
  };

  const handleVoiceover = () => {
    if (playingVoiceover) {
      setPlayingVoiceover(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      toast.success('🔇 Voiceover stopped');
    } else {
      setPlayingVoiceover(true);
      toast.success('🔊 Playing voiceover...');
      
      if ('speechSynthesis' in window) {
        const slide = slides[currentSlide];
        const utterance = new SpeechSynthesisUtterance(`${slide.title}. ${slide.content}`);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        
        utterance.onend = () => {
          setPlayingVoiceover(false);
          toast.info('🎤 Voiceover finished');
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => {
          setPlayingVoiceover(false);
          toast.info('🎤 Voiceover finished');
        }, 3000);
      }
    }
  };

  const resetPresentation = () => {
    setCurrentSlide(0);
    setIsAutoPlay(false);
    setPlayingVoiceover(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    toast.success('📱 Presentation reset');
  };

  const sharePresentation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my pitch deck!',
        text: 'Created with PitchForge.dev - AI-powered pitch deck generator',
        url: 'https://pitchforge.dev'
      });
    } else {
      navigator.clipboard.writeText('Check out my AI-generated pitch deck! 🚀 https://pitchforge.dev');
      toast.success('📱 Share link copied to clipboard!');
    }
  };

  const getThemeStyles = () => {
    const themes = {
      modern: {
        background: 'bg-gradient-to-br from-blue-500 to-purple-600',
        text: 'text-white',
        accent: 'text-blue-200'
      },
      corporate: {
        background: 'bg-gradient-to-br from-gray-700 to-blue-800',
        text: 'text-white',
        accent: 'text-blue-200'
      },
      minimal: {
        background: 'bg-gradient-to-br from-gray-100 to-gray-300',
        text: 'text-gray-800',
        accent: 'text-gray-600'
      }
    };
    
    return themes[selectedTheme] || themes.modern;
  };

  if (!isOpen || slides.length === 0) return null;

  const currentSlideData = slides[currentSlide];
  const themeStyles = getThemeStyles();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="text-white text-sm font-medium">
              📱 Mobile Pitch Mode
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Slide Area */}
      <div 
        className="flex-1 flex items-center justify-center p-8 pt-20 pb-24"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideData.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-4xl ${themeStyles.background} rounded-3xl p-8 md:p-12 relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
            </div>

            <div className="relative z-10">
              <motion.h1
                className={`text-3xl md:text-5xl lg:text-6xl font-bold ${themeStyles.text} mb-6 md:mb-8`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentSlideData.title}
              </motion.h1>
              
              <motion.div
                className={`text-lg md:text-xl lg:text-2xl ${themeStyles.text} leading-relaxed`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentSlideData.content.split('\n').map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                ))}
              </motion.div>
            </div>

            {/* Auto-play indicator */}
            {isAutoPlay && (
              <div className="absolute top-6 left-6 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white flex items-center space-x-1">
                <Play className="w-3 h-3" />
                <span>Auto-play</span>
              </div>
            )}

            {/* Voiceover indicator */}
            {playingVoiceover && (
              <div className="absolute top-6 right-6 bg-blue-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white flex items-center space-x-1">
                <Volume2 className="w-3 h-3 animate-pulse" />
                <span>Speaking</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="text-white hover:bg-white/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceover}
              className={`text-white hover:bg-white/20 ${playingVoiceover ? 'bg-blue-500/50' : ''}`}
            >
              {playingVoiceover ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAutoPlay}
              className={`text-white hover:bg-white/20 ${isAutoPlay ? 'bg-green-500/50' : ''}`}
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={resetPresentation}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={sharePresentation}
              className="text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <div className="text-center mt-2">
          <p className="text-white/70 text-xs">
            👆 Swipe left/right or use arrow keys to navigate
          </p>
        </div>
      </div>
    </motion.div>
  );
};