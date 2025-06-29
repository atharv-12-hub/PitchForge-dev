import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Wand2, Rocket, Moon, Sun, Brain, Zap, Clock, Lightbulb, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { UseCaseSelector } from './UseCaseSelector';
import { TemplateThemeSelector } from './TemplateThemeSelector';
import { PitchCoachAssistant } from './PitchCoachAssistant';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { generateSlides } from '../utils/slideGenerator';
import toast from 'react-hot-toast';

export const IdeaForm: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState('startup');
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [showPitchCoach, setShowPitchCoach] = useState(false);

  const exampleIdeas = [
    "A mobile app that uses AI to help people learn new languages through personalized conversations with virtual tutors. The app adapts to each user's learning style and provides real-time feedback.",
    "A SaaS platform for small businesses that automates inventory management using computer vision and predictive analytics to prevent stockouts and reduce waste.",
    "A fintech solution that helps gig workers manage their finances by automatically categorizing income, tracking expenses, and providing personalized savings recommendations.",
    "A healthcare platform that connects patients with specialists through AI-powered symptom analysis and virtual consultations, reducing wait times and improving access to care."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) {
      toast.error('Please enter your startup or project idea');
      return;
    }

    if (idea.trim().length < 50) {
      toast.error('Please provide more details about your idea (at least 50 characters)');
      return;
    }

    // Check for Gemini API key
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      toast.error('🔑 Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
      return;
    }

    setLoading(true);
    
    try {
      toast.loading('🧠 AI is analyzing your idea...', { id: 'generate' });
      
      // Update loading messages with realistic timing
      setTimeout(() => {
        toast.loading('🤖 Calling Gemini AI to generate content...', { id: 'generate' });
      }, 1000);
      
      setTimeout(() => {
        toast.loading('📝 Generating compelling slide content...', { id: 'generate' });
      }, 2500);
      
      setTimeout(() => {
        toast.loading('🎨 Applying professional design...', { id: 'generate' });
      }, 4000);
      
      // Generate slides using real Gemini API
      const slides = await generateSlides(idea, selectedUseCase, selectedTheme);
      
      // Store slides and preferences in localStorage for the viewer
      localStorage.setItem('pitchforge_slides', JSON.stringify(slides));
      localStorage.setItem('pitchforge_idea', idea);
      localStorage.setItem('pitchforge_usecase', selectedUseCase);
      localStorage.setItem('pitchforge_theme', selectedTheme);
      
      toast.success('🚀 AI-powered pitch deck generated successfully!', { id: 'generate' });
      
      // Navigate to slides viewer
      navigate('/slides');
      
    } catch (error) {
      console.error('Error generating slides:', error);
      
      if (error.message.includes('API key')) {
        toast.error('🔑 Please configure your Gemini API key in environment variables', { id: 'generate' });
      } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
        toast.error('⏰ API rate limit reached. Please try again in a moment.', { id: 'generate' });
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        toast.error('🌐 Network error. Please check your connection and try again.', { id: 'generate' });
      } else {
        toast.error('❌ Failed to generate pitch deck. Please try again.', { id: 'generate' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setIdea(example);
    toast.success('Example idea loaded! Feel free to modify it.');
  };

  const handlePitchCoach = () => {
    setShowPitchCoach(true);
    toast.success('💡 Opening Pitch Coach Assistant...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PitchForge.dev
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePitchCoach}
                className="hidden md:flex"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                💡 Pitch Coach
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

      {/* API Key Warning */}
      {!import.meta.env.VITE_GEMINI_API_KEY && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                <strong>API Key Required:</strong> Add your Gemini API key to VITE_GEMINI_API_KEY environment variable to enable AI generation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pitch Coach Button */}
      <Button
        onClick={handlePitchCoach}
        className="fixed bottom-6 left-6 md:hidden bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg z-40"
        size="sm"
      >
        <Lightbulb className="w-4 h-4 mr-2" />
        💡 Coach
      </Button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Brain className="w-4 h-4" />
            <span>🤖 Powered by Google Gemini AI</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Describe your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> startup idea</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tell us about your startup or project idea, and our Gemini AI will generate a complete 
            pitch deck with professional slides, compelling content, and investor-ready design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Enter your startup or project idea
                </label>
                <Textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Example: A mobile app that uses AI to help people learn new languages through personalized conversations with virtual tutors. The app adapts to each user's learning style and provides real-time feedback on pronunciation and grammar. Our target market is busy professionals who want to learn languages efficiently..."
                  rows={10}
                  className="text-lg"
                  required
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Be as detailed as possible. Include problem, solution, target audience, and unique value.
                  </p>
                  <span className={`text-sm ${idea.length >= 50 ? 'text-green-600' : 'text-gray-400'}`}>
                    {idea.length}/50+ chars
                  </span>
                </div>
              </div>

              {/* Premium Feature: Use Case Selector */}
              <UseCaseSelector
                selectedUseCase={selectedUseCase}
                onSelect={setSelectedUseCase}
              />

              {/* Premium Feature: Template Theme Selector */}
              <TemplateThemeSelector
                selectedTheme={selectedTheme}
                onSelect={setSelectedTheme}
              />

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      🤖 What happens next?
                    </h3>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-1 text-sm">
                      <li>• Gemini AI analyzes your idea and generates 5 professional slides</li>
                      <li>• Content optimized for {selectedUseCase} presentations</li>
                      <li>• Applied {selectedTheme} theme with beautiful design</li>
                      <li>• 🔊 Automatic voiceover generation for each slide</li>
                      <li>• 🎬 Video preview with smooth transitions</li>
                      <li>• 📤 Export as PDF, PPTX, or MP4</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  loading={loading}
                  disabled={loading || idea.trim().length < 50 || !import.meta.env.VITE_GEMINI_API_KEY}
                  className="px-12 py-4 text-lg btn-hover-lift"
                >
                  {loading ? (
                    <>
                      <Brain className="w-5 h-5 mr-2 animate-pulse" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      🤖 Generate with Gemini AI
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  {loading ? 'Gemini AI is working its magic...' : 'Powered by Google Gemini AI'}
                </p>
              </div>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Example Ideas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                💡 Example Ideas
              </h3>
              <div className="space-y-3">
                {exampleIdeas.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    <div className="line-clamp-3 text-gray-700 dark:text-gray-300">
                      {example}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pitch Coach CTA */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                💡 Pitch Coach
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get AI-powered tips to make your pitch deck investor-ready with expert coaching advice.
              </p>
              <Button
                onClick={handlePitchCoach}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                <Brain className="w-4 h-4 mr-2" />
                Open Coach Assistant
              </Button>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-500" />
                ✨ Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Include the problem you're solving</li>
                <li>• Describe your unique solution</li>
                <li>• Mention your target audience</li>
                <li>• Add market size if known</li>
                <li>• Include competitive advantages</li>
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📊 Success Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Decks Generated</span>
                  <span className="font-semibold text-blue-600">100,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Funding Raised</span>
                  <span className="font-semibold text-green-600">$500M+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="font-semibold text-purple-600">98%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Brain,
              title: 'Gemini AI Content Generation',
              description: 'Professional slide content powered by Google\'s advanced Gemini AI model',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Wand2,
              title: 'Smart Design',
              description: 'Beautiful layouts with perfect typography and visual hierarchy',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: Rocket,
              title: 'Export Ready',
              description: 'Multiple formats including PDF, PPTX, and video for any presentation need',
              color: 'from-green-500 to-emerald-500'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pitch Coach Assistant Modal */}
      <PitchCoachAssistant
        isOpen={showPitchCoach}
        onClose={() => setShowPitchCoach(false)}
      />
    </div>
  );
};