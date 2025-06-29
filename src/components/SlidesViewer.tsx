import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Play, 
  Download, 
  FileText, 
  Video, 
  Image,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Rocket,
  Share2,
  Eye,
  Pause,
  RotateCcw,
  Sparkles,
  Copy,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  CheckCircle,
  MessageCircle,
  Heart,
  Users,
  Smartphone,
  Lightbulb
} from 'lucide-react';
import { Button } from './ui/Button';
import { MobilePitchMode } from './MobilePitchMode';
import { PitchCoachAssistant } from './PitchCoachAssistant';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import toast from 'react-hot-toast';

interface Slide {
  id: string;
  title: string;
  content: string;
}

export const SlidesViewer: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playingVoiceover, setPlayingVoiceover] = useState<string | null>(null);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [idea, setIdea] = useState('');
  const [useCase, setUseCase] = useState('startup');
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMobilePitch, setShowMobilePitch] = useState(false);
  const [showPitchCoach, setShowPitchCoach] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load slides and preferences from localStorage
    const storedSlides = localStorage.getItem('pitchforge_slides');
    const storedIdea = localStorage.getItem('pitchforge_idea');
    const storedUseCase = localStorage.getItem('pitchforge_usecase');
    const storedTheme = localStorage.getItem('pitchforge_theme');
    
    if (storedSlides) {
      setSlides(JSON.parse(storedSlides));
    } else {
      // Redirect to form if no slides found
      navigate('/create');
    }
    
    if (storedIdea) setIdea(storedIdea);
    if (storedUseCase) setUseCase(storedUseCase);
    if (storedTheme) setSelectedTheme(storedTheme);
  }, [navigate]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < slides.length - 1) {
            return prev + 1;
          } else {
            setAutoPlay(false);
            toast.info('Presentation finished');
            return prev;
          }
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [autoPlay, slides.length]);

  const handlePlayVoiceover = (slideId: string) => {
    if (playingVoiceover === slideId) {
      // Stop voiceover
      setPlayingVoiceover(null);
      toast.success('🔇 Voiceover stopped');
      
      // Stop speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      // Start voiceover simulation
      setPlayingVoiceover(slideId);
      toast.success('🔊 Playing voiceover...');
      
      // Use Web Speech API for actual voiceover
      if ('speechSynthesis' in window) {
        const slide = slides.find(s => s.id === slideId);
        if (slide) {
          const utterance = new SpeechSynthesisUtterance(`${slide.title}. ${slide.content}`);
          utterance.rate = 0.8;
          utterance.pitch = 1;
          utterance.volume = 0.8;
          
          utterance.onend = () => {
            setPlayingVoiceover(null);
            toast.info('🎤 Voiceover finished');
          };
          
          utterance.onerror = () => {
            setPlayingVoiceover(null);
            toast.error('❌ Voiceover failed');
          };
          
          window.speechSynthesis.speak(utterance);
        }
      } else {
        // Fallback simulation
        setTimeout(() => {
          setPlayingVoiceover(null);
          toast.info('🎤 Voiceover finished');
        }, 5000);
      }
    }
  };

  const handleVideoPreview = () => {
    setShowVideoPreview(true);
    toast.success('🎬 Generating video preview...');
    
    // Simulate video generation
    setTimeout(() => {
      toast.success('✨ Video preview ready!');
    }, 2000);
  };

  const handleMobilePitch = () => {
    setShowMobilePitch(true);
    toast.success('📱 Entering Mobile Pitch Mode...');
  };

  const handlePitchCoach = () => {
    setShowPitchCoach(true);
    toast.success('💡 Opening Pitch Coach Assistant...');
  };

  const handleExport = (format: 'pdf' | 'pptx' | 'mp4' | 'image') => {
    const formatNames = {
      pdf: 'PDF',
      pptx: 'PowerPoint',
      mp4: 'Video',
      image: 'Images'
    };
    
    const formatEmojis = {
      pdf: '📄',
      pptx: '📊',
      mp4: '🎥',
      image: '🖼️'
    };
    
    toast.loading(`${formatEmojis[format]} Exporting as ${formatNames[format]}...`, { id: 'export' });
    
    // Simulate export with actual download
    setTimeout(() => {
      // Create a comprehensive export file
      const content = `PitchForge.dev - Generated Pitch Deck
Original Idea: ${idea}
Use Case: ${useCase}
Theme: ${selectedTheme}

${slides.map((slide, index) => 
        `Slide ${index + 1}: ${slide.title}
${slide.content}

---`
      ).join('\n\n')}

Generated by PitchForge.dev - AI-Powered Pitch Deck Generator
Visit: https://pitchforge.dev`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pitchforge-deck-${format}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success(`${formatEmojis[format]} ${formatNames[format]} exported successfully!`, { id: 'export' });
    }, 2000);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
    if (!autoPlay) {
      toast.success('▶️ Auto-play started');
    } else {
      toast.info('⏸️ Auto-play stopped');
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      const shareText = `Check out my AI-generated pitch deck created with PitchForge.dev! 🚀\n\nIdea: ${idea.substring(0, 100)}...\n\nhttps://pitchforge.dev`;
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('🔗 Pitch deck link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleSocialShare = (platform: string) => {
    const shareText = `Check out my AI-generated pitch deck! Created with PitchForge.dev 🚀`;
    const shareUrl = "https://pitchforge.dev";
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Check out my pitch deck!')}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
      toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
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

  if (slides.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your pitch deck...</p>
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];
  const themeStyles = getThemeStyles();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/create')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                New Pitch
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PitchForge.dev
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Sparkles className="w-4 h-4" />
                <span>Slide {currentSlide + 1} of {slides.length}</span>
                <span className="text-gray-400">•</span>
                <span className="capitalize">{selectedTheme} theme</span>
                <span className="text-gray-400">•</span>
                <span className="capitalize">{useCase}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobilePitch}
                className="hidden md:flex"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                📱 Mobile Pitch
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handlePitchCoach}
                className="hidden md:flex"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                💡 Coach
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAutoPlay}
                className={autoPlay ? 'text-green-600' : ''}
              >
                {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden flex flex-col space-y-2 z-40">
        <Button
          onClick={handleMobilePitch}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
          size="sm"
        >
          <Smartphone className="w-4 h-4" />
        </Button>
        <Button
          onClick={handlePitchCoach}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
          size="sm"
        >
          <Lightbulb className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Slide Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  📋 Slides
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentSlide(0)}
                  className="text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {slides.map((slide, index) => (
                  <motion.button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentSlide
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 shadow-md'
                        : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        index === currentSlide 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {slide.title}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 ml-6">
                      {slide.content.substring(0, 60)}...
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Slide Display */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-2xl overflow-hidden">
              {/* Slide Content */}
              <div className="aspect-video p-8 md:p-12 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideData.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`relative z-10 ${themeStyles.background} rounded-2xl p-8 md:p-12 overflow-hidden`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
                      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
                    </div>

                    <div className="relative z-10">
                      <motion.h1
                        className={`text-3xl md:text-5xl font-bold ${themeStyles.text} mb-6 md:mb-8`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {currentSlideData.title}
                      </motion.h1>
                      
                      <motion.div
                        className={`text-lg md:text-xl ${themeStyles.text} leading-relaxed`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentSlideData.content.split('\n').map((line, index) => (
                          <p key={index} className="mb-3">
                            {line}
                          </p>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slide Number Badge */}
                <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentSlide + 1} / {slides.length}
                </div>

                {/* Theme Badge */}
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {selectedTheme} • {useCase}
                </div>

                {/* Auto-play indicator */}
                {autoPlay && (
                  <div className="absolute bottom-20 left-6 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Auto-play</span>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex space-x-1">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide 
                            ? 'bg-blue-500 w-6' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Slide Controls */}
              <div className="bg-white dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => handlePlayVoiceover(currentSlideData.id)}
                      variant={playingVoiceover === currentSlideData.id ? 'danger' : 'secondary'}
                      className="flex items-center space-x-2"
                    >
                      {playingVoiceover === currentSlideData.id ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                      <span>
                        {playingVoiceover === currentSlideData.id ? 'Stop' : '🔊 Play'} Voiceover
                      </span>
                    </Button>

                    <Button
                      onClick={handleVideoPreview}
                      variant="secondary"
                      className="flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>🎬 Preview Video</span>
                    </Button>

                    <Button
                      onClick={toggleAutoPlay}
                      variant={autoPlay ? 'primary' : 'ghost'}
                      className="flex items-center space-x-2"
                    >
                      {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{autoPlay ? 'Stop' : 'Auto'} Play</span>
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    {playingVoiceover === currentSlideData.id && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span>Playing voiceover...</span>
                      </div>
                    )}
                    {autoPlay && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Auto-playing slides...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile Pitch Mode */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-blue-500" />
                  📱 Mobile Pitch Mode
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Present your slides full-screen with swipe navigation, perfect for mobile presentations and demos.
                </p>
                <Button
                  onClick={handleMobilePitch}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Enter Mobile Mode
                </Button>
              </div>

              {/* Pitch Coach */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  💡 Pitch Coach Assistant
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Get AI-powered tips and suggestions to improve your pitch deck and make it investor-ready.
                </p>
                <Button
                  onClick={handlePitchCoach}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Open Coach Assistant
                </Button>
              </div>
            </div>

            {/* Video Preview Modal */}
            <AnimatePresence>
              {showVideoPreview && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowVideoPreview(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Video className="w-6 h-6 mr-2" />
                      🎬 Video Demo Preview
                    </h3>
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          🎥 Your AI-generated video will appear here
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Featuring smooth transitions, voiceovers, and professional animations
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button variant="ghost" onClick={() => setShowVideoPreview(false)}>
                        Close
                      </Button>
                      <Button onClick={() => handleExport('mp4')}>
                        🎞️ Export Video
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Export Options */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                📤 Export Your Pitch Deck
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => handleExport('pdf')}
                  variant="secondary"
                  className="flex flex-col items-center space-y-2 h-auto py-4 btn-hover-lift"
                >
                  <FileText className="w-6 h-6" />
                  <span>📄 Export PDF</span>
                </Button>
                
                <Button
                  onClick={() => handleExport('pptx')}
                  variant="secondary"
                  className="flex flex-col items-center space-y-2 h-auto py-4 btn-hover-lift"
                >
                  <FileText className="w-6 h-6" />
                  <span>📊 Export PPTX</span>
                </Button>
                
                <Button
                  onClick={() => handleExport('mp4')}
                  variant="secondary"
                  className="flex flex-col items-center space-y-2 h-auto py-4 btn-hover-lift"
                >
                  <Video className="w-6 h-6" />
                  <span>🎥 Export Video</span>
                </Button>
                
                <Button
                  onClick={() => handleExport('image')}
                  variant="secondary"
                  className="flex flex-col items-center space-y-2 h-auto py-4 btn-hover-lift"
                >
                  <Image className="w-6 h-6" />
                  <span>🖼️ Export Images</span>
                </Button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      🚀 Ready to pitch like a pro?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your AI-generated pitch deck is ready for investors. Export in your preferred format and start raising funds!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Share Section */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                📢 Share This Deck
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Share with your co-founders or investors and show them what's possible with AI-powered pitch decks!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button
                  onClick={() => handleSocialShare('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center space-x-2"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Share on Twitter</span>
                </Button>
                
                <Button
                  onClick={() => handleSocialShare('linkedin')}
                  className="bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center space-x-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Share on LinkedIn</span>
                </Button>
                
                <Button
                  onClick={() => handleSocialShare('email')}
                  variant="secondary"
                  className="flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Share via Email</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleShare}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  📱 More Share Options
                </Button>
                <Button
                  onClick={() => navigate('/create')}
                  variant="secondary"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Another Deck
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Pitch Mode */}
      <MobilePitchMode
        slides={slides}
        isOpen={showMobilePitch}
        onClose={() => setShowMobilePitch(false)}
        selectedTheme={selectedTheme}
      />

      {/* Pitch Coach Assistant */}
      <PitchCoachAssistant
        isOpen={showPitchCoach}
        onClose={() => setShowPitchCoach(false)}
        currentSlide={currentSlideData?.title}
        slideContent={currentSlideData?.content}
      />

      {/* Enhanced Share Modal */}
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowShareModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Share2 className="w-6 h-6 mr-2" />
              📢 Share This Deck
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Share with your co-founders or investors and help them discover the power of AI-generated pitch decks!
            </p>

            {/* Social Share Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                onClick={() => handleSocialShare('twitter')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Share on Twitter
              </Button>
              
              <Button
                onClick={() => handleSocialShare('linkedin')}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </Button>
              
              <Button
                onClick={() => handleSocialShare('email')}
                variant="secondary"
                className="w-full"
              >
                <Mail className="w-4 h-4 mr-2" />
                Share via Email
              </Button>
            </div>

            {/* Copy Link */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Copy link to share:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="Check out my AI-generated pitch deck! 🚀 https://pitchforge.dev"
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyLink}
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Join 50,000+ entrepreneurs
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Who've raised $500M+ using PitchForge.dev
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="ghost" onClick={() => setShowShareModal(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};