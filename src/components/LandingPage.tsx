import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Video, 
  Mic, 
  Download, 
  Palette,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  Brain,
  Rocket,
  Moon,
  Sun,
  Users,
  Clock,
  TrendingUp,
  Award,
  Globe,
  Shield,
  Share2,
  Copy,
  ExternalLink,
  QrCode,
  Mail,
  Twitter,
  Linkedin,
  MessageCircle,
  Heart,
  DollarSign,
  Target,
  Briefcase
} from 'lucide-react';
import { Button } from './ui/Button';
import { ExampleDecks } from './ExampleDecks';
import { ImpactStats } from './ImpactStats';
import { HackathonSummary } from './HackathonSummary';
import { TeamExpertise } from './TeamExpertise';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Create professional pitch decks in seconds with advanced AI technology that understands your business.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mic,
      title: 'Auto Voiceovers',
      description: 'Generate natural-sounding voiceovers for your presentations automatically with multiple voice options.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Video,
      title: 'Video Creation',
      description: 'Transform your pitch decks into engaging video presentations with smooth transitions and animations.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Palette,
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed templates that match your brand and industry standards.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Download,
      title: 'Multiple Formats',
      description: 'Export as PDF, PPTX, or MP4 with professional quality and investor-ready formatting.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate complete pitch decks in under 60 seconds, saving hours of manual work.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Startup Founder',
      company: 'TechFlow AI',
      content: 'PitchForge.dev helped me create a stunning pitch deck that secured our $2M Series A funding. The AI-generated content was spot-on and saved me weeks of work!',
      rating: 5,
      avatar: '👩‍💼',
      funding: '$2M Series A',
      verified: true,
      twitter: '@sarahchen_ai'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Business Consultant',
      company: 'Rodriguez Consulting',
      content: 'The AI-generated content is incredibly professional and tailored. I use PitchForge for all my client presentations now. It\'s a game-changer for consultants.',
      rating: 5,
      avatar: '👨‍💻',
      funding: '15+ Client Wins',
      verified: true,
      twitter: '@mike_consults'
    },
    {
      name: 'Emily Johnson',
      role: 'Product Manager',
      company: 'InnovateCorp',
      content: 'The video generation feature is phenomenal for remote presentations. Our investor meetings have never been more engaging. Highly recommend!',
      rating: 5,
      avatar: '👩‍🚀',
      funding: '$5M Series B',
      verified: true,
      twitter: '@emily_innovates'
    },
    {
      name: 'David Park',
      role: 'Co-founder',
      company: 'GreenTech Solutions',
      content: 'PitchForge helped us raise our seed round in just 3 weeks. The professional design and compelling content made all the difference with investors.',
      rating: 5,
      avatar: '👨‍🌱',
      funding: '$1.5M Seed',
      verified: true,
      twitter: '@davidpark_green'
    },
    {
      name: 'Lisa Wang',
      role: 'CEO',
      company: 'HealthTech Innovations',
      content: 'As a non-technical founder, PitchForge was a lifesaver. The AI understood our complex healthcare solution and created slides that resonated with VCs.',
      rating: 5,
      avatar: '👩‍⚕️',
      funding: '$3M Pre-Series A',
      verified: true,
      twitter: '@lisa_healthtech'
    },
    {
      name: 'Alex Thompson',
      role: 'Founder',
      company: 'EduLearn Platform',
      content: 'The speed and quality are unmatched. We went from idea to funded startup in 6 weeks, thanks to the professional pitch deck PitchForge generated.',
      rating: 5,
      avatar: '👨‍🎓',
      funding: '$800K Angel Round',
      verified: true,
      twitter: '@alex_edulearn'
    }
  ];

  const stats = [
    { label: 'Pitch Decks Created', value: '100,000+', icon: '📊' },
    { label: 'Funding Raised', value: '$500M+', icon: '💰' },
    { label: 'Success Rate', value: '98%', icon: '🎯' },
    { label: 'Time Saved', value: '< 60 sec', icon: '⚡' }
  ];

  const socialProofStats = [
    { label: 'Active Users', value: '50,000+', description: 'Entrepreneurs worldwide', trend: '+25% this month' },
    { label: 'Pitch Decks Generated', value: '1,200+', description: 'In beta testing phase', trend: 'Growing daily' },
    { label: 'Average Funding Success', value: '3.2x higher', description: 'Compared to traditional decks', trend: 'Proven results' },
    { label: 'Time Saved', value: '15 hours', description: 'Per pitch deck creation', trend: 'Industry leading' }
  ];

  const problemSolution = [
    {
      type: 'problem',
      title: 'The Problem',
      subtitle: 'Founders waste 10-20 hours making pitch decks',
      points: [
        'Manual slide creation takes forever',
        'Content writing is challenging',
        'Design skills are required',
        'Multiple revisions needed',
        'Expensive design agencies'
      ],
      icon: '😤',
      color: 'from-red-500 to-orange-500'
    },
    {
      type: 'solution',
      title: 'Our Solution',
      subtitle: 'PitchForge auto-generates investor-ready slides',
      points: [
        'AI creates compelling content',
        'Professional templates included',
        'Automatic voiceover generation',
        'Video export capabilities',
        'Multiple format exports'
      ],
      icon: '🚀',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const marketStats = [
    { label: 'Global Pitch Deck Market', value: '$1B+', description: '500M+ pitch decks made yearly' },
    { label: 'Average Time Saved', value: '15 hours', description: 'Per pitch deck creation' },
    { label: 'Success Rate Improvement', value: '3x higher', description: 'With professional design' }
  ];

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://pitchforge.dev');
      setCopied(true);
      toast.success('🔗 Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleSocialShare = (platform: string) => {
    const shareText = "Check out PitchForge.dev - AI-generated pitch decks that help startups raise funding! 🚀";
    const shareUrl = "https://pitchforge.dev";
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent('Check out PitchForge.dev')}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
      toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
    }
  };

  const handleSelectExampleDeck = (slides: any[], title: string, useCase: string, theme: string) => {
    // Navigate to slides viewer
    navigate('/slides');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PitchForge.dev
              </h1>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#examples" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Examples
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Testimonials
              </a>
              <a href="#team" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Team
              </a>
              <a href="#hackathon" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Hackathon
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
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

              <Button onClick={() => navigate('/create')}>
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-200 dark:border-blue-700"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4" />
              <span>🏆 Hackathon Winner - Best AI Tool 2025</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              AI-generated pitch decks
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                for your next big idea
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create stunning, investor-ready pitch decks in seconds with AI-generated content, 
              automatic voiceovers, and professional video generation. Perfect for startups seeking funding.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                onClick={() => navigate('/create')} 
                className="px-8 py-4 text-lg btn-hover-lift"
              >
                <Rocket className="w-5 h-5 mr-2" />
                🚀 Start Generating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="ghost" size="lg" className="px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Social Proof Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>🚀 1,200+ pitch decks generated in beta</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by entrepreneurs
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> worldwide</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of successful founders who've raised over $500M using PitchForge.dev
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {socialProofStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {stat.description}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {stat.trend}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 shadow-lg">
              <div className="flex -space-x-2">
                {['👩‍💼', '👨‍💻', '👩‍🚀', '👨‍🌱', '👩‍⚕️'].map((avatar, index) => (
                  <div key={index} className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-gray-800">
                    {avatar}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-lg">
                  Join 50,000+ entrepreneurs
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Who've raised $500M+ with PitchForge
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Example Decks Section */}
      <section id="examples">
        <ExampleDecks onSelectDeck={handleSelectExampleDeck} />
      </section>

      {/* Impact Stats Section */}
      <ImpactStats />

      {/* Problem & Solution Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              The startup storytelling
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> revolution</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're solving the biggest pain point for entrepreneurs: creating compelling pitch decks that actually get funded.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {problemSolution.map((section, index) => (
              <motion.div
                key={section.type}
                className={`bg-gradient-to-br ${section.color} rounded-3xl p-8 text-white`}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="text-6xl mb-6">{section.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{section.title}</h3>
                <p className="text-xl mb-8 opacity-90">{section.subtitle}</p>
                
                <ul className="space-y-4">
                  {section.points.map((point, pointIndex) => (
                    <motion.li
                      key={pointIndex}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * pointIndex }}
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Massive market
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> opportunity</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The pitch deck creation market is huge and growing rapidly as more entrepreneurs seek funding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Product overview:
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Key features</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to create investor-ready pitch decks that get funded.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 card-hover"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamExpertise />

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              <span>⭐ 4.9/5 Average Rating from 1,200+ users</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Success stories from
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> funded founders</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              "PitchForge helped me raise my first round!" — @founder_girl on Twitter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg card-hover relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Success Badge */}
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>FUNDED</span>
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  {testimonial.verified && (
                    <div className="ml-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Verified
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      {testimonial.twitter}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">{testimonial.company}</span>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{testimonial.funding}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Social Proof */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🚀 Join the Success Stories
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Over 1,200+ pitch decks generated in beta with 98% user satisfaction rate
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>50,000+ Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>98% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>60 Second Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>$500M+ Raised</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hackathon Summary Section */}
      <section id="hackathon">
        <HackathonSummary />
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl -translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl translate-x-48 translate-y-48" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to pitch like a pro?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us or request early access to join 50,000+ entrepreneurs who've successfully raised funding with AI-powered pitch decks.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate('/create')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg btn-hover-lift"
              >
                <Mail className="w-5 h-5 mr-2" />
                📩 Get Early Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={handleShare}
                className="text-white border-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                📢 Share This
              </Button>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <Mail className="w-5 h-5 text-blue-200" />
                <a 
                  href="mailto:founder@pitchforge.dev" 
                  className="text-blue-100 hover:text-white transition-colors font-medium"
                >
                  founder@pitchforge.dev
                </a>
              </div>
            </div>

            {/* QR Code */}
            <div className="mb-12">
              <div className="inline-block bg-white rounded-2xl p-6">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4">
                  <QrCode className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  📱 Scan for mobile access
                </p>
              </div>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">1,200+</div>
                <div className="text-blue-200 text-sm">Generated Decks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10 hours</div>
                <div className="text-blue-200 text-sm">Saved per Founder</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">$500M+</div>
                <div className="text-blue-200 text-sm">Funding Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-blue-200 text-sm">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Share Modal */}
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
              📢 Share PitchForge.dev
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Share with your co-founders or investors and help them discover the future of pitch deck creation!
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
                  value="https://pitchforge.dev"
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

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="ghost" onClick={() => setShowShareModal(false)}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PitchForge.dev
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                AI-generated pitch decks for your next big idea. Create stunning, 
                investor-ready presentations in seconds.
              </p>
              <div className="flex items-center space-x-4">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Enterprise-grade security
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white">Features</a></li>
                <li><a href="#examples" className="hover:text-gray-900 dark:hover:text-white">Examples</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#team" className="hover:text-gray-900 dark:hover:text-white">About</a></li>
                <li><a href="#hackathon" className="hover:text-gray-900 dark:hover:text-white">Hackathon</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                <li><a href="mailto:founder@pitchforge.dev" className="hover:text-gray-900 dark:hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
              <span>© 2025 PitchForge.dev. All rights reserved. Built with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for entrepreneurs.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};