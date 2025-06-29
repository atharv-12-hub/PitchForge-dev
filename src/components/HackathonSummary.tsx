import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Zap, 
  Users, 
  Calendar, 
  Cpu, 
  Smartphone, 
  Download, 
  Mic,
  Trophy,
  Target,
  Rocket,
  Brain,
  Star,
  CheckCircle
} from 'lucide-react';

const techStack = [
  { name: 'React 18', icon: '⚛️', description: 'Modern React with hooks and concurrent features' },
  { name: 'TypeScript', icon: '📘', description: 'Type-safe development and better DX' },
  { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS for rapid UI development' },
  { name: 'Framer Motion', icon: '🎭', description: 'Smooth animations and micro-interactions' },
  { name: 'Gemini AI', icon: '🤖', description: 'Google\'s advanced AI for content generation' },
  { name: 'Vite', icon: '⚡', description: 'Lightning-fast build tool and dev server' }
];

const features = [
  { name: 'Real AI Generation', icon: Brain, status: '✅', description: 'Gemini API integration' },
  { name: 'Voiceover Synthesis', icon: Mic, status: '✅', description: 'Web Speech API' },
  { name: 'Multiple Export Formats', icon: Download, status: '✅', description: 'PDF, PPTX, MP4, Images' },
  { name: 'Mobile Pitch Mode', icon: Smartphone, status: '✅', description: 'Full-screen presentation' },
  { name: 'Pitch Coach Assistant', icon: Target, status: '✅', description: 'AI-powered tips' },
  { name: 'Responsive Design', icon: Smartphone, status: '✅', description: 'Works on all devices' }
];

const futureFeatures = [
  { name: 'Full Slide Editor', icon: '✏️', description: 'Drag-and-drop slide customization' },
  { name: 'Team Collaboration', icon: '👥', description: 'Real-time collaborative editing' },
  { name: 'GPT-4 Integration', icon: '🧠', description: 'Enhanced AI with multiple models' },
  { name: 'Video Generation', icon: '🎬', description: 'Automated video creation from slides' },
  { name: 'Analytics Dashboard', icon: '📊', description: 'Track pitch performance and engagement' },
  { name: 'Investor Network', icon: '💼', description: 'Connect directly with VCs and angels' }
];

const achievements = [
  { metric: '5 days', label: 'Development Time', icon: Calendar },
  { metric: '1 developer', label: 'Solo Built', icon: Users },
  { metric: '100%', label: 'Frontend Only', icon: Code },
  { metric: '6', label: 'Core Features', icon: Star }
];

export const HackathonSummary: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-300 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-yellow-400/30">
            <Trophy className="w-4 h-4" />
            <span>🏆 Built for the Hackathon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Achievement</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            A complete AI-powered pitch deck generator built from scratch in just 5 days, showcasing modern web development and AI integration.
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-8 h-8 text-gray-900" />
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {achievement.metric}
              </div>
              <div className="text-blue-200 text-sm">
                {achievement.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Code className="w-6 h-6 mr-3 text-yellow-400" />
              🛠️ Tech Stack
            </h3>
            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{tech.name}</h4>
                      <p className="text-blue-200 text-sm">{tech.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Rocket className="w-6 h-6 mr-3 text-yellow-400" />
              ✨ Features Delivered
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-yellow-400" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{feature.name}</h4>
                        <span className="text-green-400">{feature.status}</span>
                      </div>
                      <p className="text-blue-200 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Architecture Highlights */}
        <motion.div
          className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-yellow-400" />
            🏗️ Architecture Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Frontend-Only</h4>
              <p className="text-blue-200 text-sm">
                No backend required - everything runs in the browser with local storage and API calls
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">AI Integration</h4>
              <p className="text-blue-200 text-sm">
                Real Gemini API integration for intelligent content generation and personalization
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Mobile-First</h4>
              <p className="text-blue-200 text-sm">
                Responsive design with dedicated mobile pitch mode for presentations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Future Roadmap */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="w-6 h-6 mr-3 text-yellow-400" />
            🚀 Future Roadmap
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{feature.icon}</span>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{feature.name}</h4>
                    <p className="text-blue-200 text-xs">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              🏆 Ready to Judge?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              PitchForge demonstrates modern web development, AI integration, and user experience design. 
              A complete product built solo in just 5 days for the hackathon.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Production Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Real AI Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Solo Development</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>5 Day Build</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};