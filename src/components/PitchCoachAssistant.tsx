import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  X, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  Star
} from 'lucide-react';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

interface PitchCoachAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide?: string;
  slideContent?: string;
}

const coachingTips = [
  {
    id: 'generic-terms',
    category: 'Content Quality',
    icon: AlertTriangle,
    color: 'text-orange-500',
    title: 'Avoid Generic Terms',
    tip: 'Replace vague words like "innovative," "revolutionary," or "game-changing" with specific, measurable benefits.',
    example: 'Instead of "innovative solution," say "reduces processing time by 75%"',
    priority: 'high'
  },
  {
    id: 'traction-data',
    category: 'Market Validation',
    icon: TrendingUp,
    color: 'text-green-500',
    title: 'Include Traction Metrics',
    tip: 'Add concrete numbers: user growth, revenue, partnerships, or pilot program results.',
    example: '10,000+ beta users, $50K MRR, or 3 Fortune 500 pilots',
    priority: 'high'
  },
  {
    id: 'bold-hook',
    category: 'Storytelling',
    icon: Zap,
    color: 'text-blue-500',
    title: 'Start with a Bold Hook',
    tip: 'Open with a surprising statistic, provocative question, or compelling story that grabs attention.',
    example: '"Every minute, companies lose $10,000 due to inefficient processes"',
    priority: 'medium'
  },
  {
    id: 'market-size',
    category: 'Market Analysis',
    icon: Target,
    color: 'text-purple-500',
    title: 'Quantify Market Opportunity',
    tip: 'Include TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market).',
    example: 'TAM: $50B, SAM: $5B, SOM: $500M over 5 years',
    priority: 'high'
  },
  {
    id: 'problem-urgency',
    category: 'Problem Definition',
    icon: AlertTriangle,
    color: 'text-red-500',
    title: 'Emphasize Problem Urgency',
    tip: 'Show why this problem needs to be solved NOW. Include cost of inaction or market timing.',
    example: 'Regulatory changes in 2025 will make current solutions obsolete',
    priority: 'medium'
  },
  {
    id: 'competitive-advantage',
    category: 'Differentiation',
    icon: Star,
    color: 'text-yellow-500',
    title: 'Highlight Unique Advantages',
    tip: 'Clearly articulate what makes you different and defensible against competitors.',
    example: 'Proprietary AI algorithm with 95% accuracy vs 70% industry standard',
    priority: 'high'
  },
  {
    id: 'team-credibility',
    category: 'Team Building',
    icon: Users,
    color: 'text-indigo-500',
    title: 'Establish Team Credibility',
    tip: 'Highlight relevant experience, previous exits, domain expertise, and advisory board.',
    example: 'Former Google AI lead, 2x successful exits, advised by industry veterans',
    priority: 'medium'
  },
  {
    id: 'financial-projections',
    category: 'Financials',
    icon: DollarSign,
    color: 'text-green-600',
    title: 'Realistic Financial Projections',
    tip: 'Base projections on comparable companies and bottom-up analysis. Show unit economics.',
    example: 'CAC: $50, LTV: $500, Payback period: 3 months',
    priority: 'high'
  },
  {
    id: 'call-to-action',
    category: 'Closing',
    icon: CheckCircle,
    color: 'text-emerald-500',
    title: 'Clear Call to Action',
    tip: 'End with specific next steps and what you need from investors.',
    example: 'Seeking $2M to achieve $10M ARR in 18 months. Let\'s schedule a follow-up.',
    priority: 'medium'
  },
  {
    id: 'visual-storytelling',
    category: 'Design',
    icon: Brain,
    color: 'text-pink-500',
    title: 'Use Visual Storytelling',
    tip: 'Replace text-heavy slides with charts, diagrams, and infographics that tell your story.',
    example: 'Show user journey with visual flow, not bullet points',
    priority: 'low'
  }
];

export const PitchCoachAssistant: React.FC<PitchCoachAssistantProps> = ({
  isOpen,
  onClose,
  currentSlide,
  slideContent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const categories = ['all', 'Content Quality', 'Market Validation', 'Storytelling', 'Market Analysis', 'Problem Definition', 'Differentiation', 'Team Building', 'Financials', 'Closing', 'Design'];

  const filteredTips = selectedCategory === 'all' 
    ? coachingTips 
    : coachingTips.filter(tip => tip.category === selectedCategory);

  const getContextualTips = () => {
    if (!currentSlide || !slideContent) return [];
    
    const slideType = currentSlide.toLowerCase();
    const content = slideContent.toLowerCase();
    
    const contextualTips = [];
    
    // Analyze content for generic terms
    const genericTerms = ['innovative', 'revolutionary', 'game-changing', 'cutting-edge', 'next-generation', 'disruptive'];
    if (genericTerms.some(term => content.includes(term))) {
      contextualTips.push(coachingTips.find(tip => tip.id === 'generic-terms'));
    }
    
    // Check for missing metrics
    const hasNumbers = /\d+/.test(content);
    if (!hasNumbers && (slideType.includes('market') || slideType.includes('traction'))) {
      contextualTips.push(coachingTips.find(tip => tip.id === 'traction-data'));
    }
    
    // Problem slide analysis
    if (slideType.includes('problem') && !content.includes('cost') && !content.includes('time')) {
      contextualTips.push(coachingTips.find(tip => tip.id === 'problem-urgency'));
    }
    
    return contextualTips.filter(Boolean);
  };

  const analyzeCurrentSlide = () => {
    setShowAnalysis(true);
    toast.success('🧠 Analyzing your slide content...');
    
    setTimeout(() => {
      const contextualTips = getContextualTips();
      if (contextualTips.length > 0) {
        toast.success(`💡 Found ${contextualTips.length} improvement suggestions!`);
      } else {
        toast.success('✅ Your slide looks great! No major issues found.');
      }
    }, 1500);
  };

  const applyTip = (tipId: string) => {
    toast.success('💡 Tip applied! Consider implementing this suggestion.');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  💡 Pitch Coach Assistant
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-powered tips to make your pitch deck investor-ready
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {currentSlide && (
                <Button
                  onClick={analyzeCurrentSlide}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze Slide
                </Button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? '🎯 All Tips' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Contextual Analysis */}
          {showAnalysis && currentSlide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700"
            >
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                🧠 Slide Analysis: {currentSlide}
              </h3>
              {getContextualTips().length > 0 ? (
                <div className="space-y-2">
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    Found {getContextualTips().length} specific improvement opportunities:
                  </p>
                  {getContextualTips().map((tip, index) => (
                    <div key={index} className="text-sm text-green-600 dark:text-green-400 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {tip?.title}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-700 dark:text-green-400 text-sm flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  ✅ Great job! Your slide follows best practices.
                </p>
              )}
            </motion.div>
          )}

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tip.color.replace('text-', 'bg-').replace('-500', '-100')} ${tip.color.replace('-500', '-600')}`}>
                    <tip.icon className={`w-4 h-4 ${tip.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {tip.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(tip.priority)}`}>
                        {tip.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {tip.category}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {tip.tip}
                </p>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3 border border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
                    💡 Example:
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                    "{tip.example}"
                  </p>
                </div>
                
                <Button
                  onClick={() => applyTip(tip.id)}
                  size="sm"
                  variant="ghost"
                  className="w-full text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Apply This Tip
                </Button>
              </motion.div>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No tips found for this category
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category or "All Tips"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              💡 {filteredTips.length} coaching tips available
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Powered by AI Coach
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};