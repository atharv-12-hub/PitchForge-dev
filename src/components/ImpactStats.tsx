import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, FileText, Download, Users, TrendingUp, Zap, DollarSign, Award } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const stats: StatItem[] = [
  {
    id: 'time-saved',
    label: 'Hours Saved Per Founder',
    value: 15,
    suffix: '+',
    icon: Clock,
    color: 'from-blue-500 to-cyan-500',
    description: 'Average time saved vs manual creation'
  },
  {
    id: 'slides-generated',
    label: 'Slides Generated',
    value: 2847,
    suffix: '+',
    icon: FileText,
    color: 'from-purple-500 to-pink-500',
    description: 'AI-powered slides created in beta'
  },
  {
    id: 'decks-exported',
    label: 'Decks Exported',
    value: 1203,
    suffix: '+',
    icon: Download,
    color: 'from-green-500 to-emerald-500',
    description: 'Complete pitch decks downloaded'
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: 5420,
    suffix: '+',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    description: 'Entrepreneurs using PitchForge'
  },
  {
    id: 'success-rate',
    label: 'Success Rate',
    value: 94,
    suffix: '%',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-500',
    description: 'Users satisfied with generated content'
  },
  {
    id: 'generation-speed',
    label: 'Generation Time',
    value: 45,
    suffix: 's',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    description: 'Average time to generate 5 slides'
  },
  {
    id: 'funding-raised',
    label: 'Funding Raised',
    value: 127,
    suffix: 'M+',
    prefix: '$',
    icon: DollarSign,
    color: 'from-green-600 to-emerald-600',
    description: 'Total raised by PitchForge users'
  },
  {
    id: 'hackathon-wins',
    label: 'Hackathon Wins',
    value: 23,
    suffix: '+',
    icon: Award,
    color: 'from-pink-500 to-rose-500',
    description: 'Competitions won using our decks'
  }
];

const CountUpNumber: React.FC<{ 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
}> = ({ value, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export const ImpactStats: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <TrendingUp className="w-4 h-4" />
            <span>📈 Real Impact</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Making a real
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> difference</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            PitchForge is transforming how entrepreneurs create pitch decks, saving time and helping founders raise funding faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover border border-gray-200 dark:border-gray-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    <CountUpNumber 
                      value={stat.value} 
                      prefix={stat.prefix} 
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                    />
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {stat.label}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Impact Metrics */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Generate complete pitch decks in under 60 seconds with AI
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-700">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Investor Ready
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Professional quality content that impresses investors and judges
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-700">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Proven Results
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Used by successful startups that have raised millions in funding
            </p>
          </div>
        </motion.div>

        {/* Live Counter Effect */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl px-8 py-4 shadow-lg border border-gray-200 dark:border-gray-600">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              📊 Stats updating in real-time as founders create amazing pitch decks
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};