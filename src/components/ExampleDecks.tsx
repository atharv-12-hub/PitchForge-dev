import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Heart, Rocket, Play, Users, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

interface ExampleDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  slides: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  stats: {
    funding: string;
    users: string;
    growth: string;
  };
}

const exampleDecks: ExampleDeck[] = [
  {
    id: 'ai-fitness',
    title: 'FitAI - AI Personal Trainer',
    description: 'AI-powered fitness app that creates personalized workout plans',
    category: 'AI & Health',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    stats: {
      funding: '$2.5M Series A',
      users: '100K+ Users',
      growth: '300% YoY'
    },
    slides: [
      {
        id: 'problem',
        title: 'Problem',
        content: 'Personal trainers cost $100+ per session and aren\'t available 24/7. 73% of gym members quit within 6 months due to lack of personalized guidance. Generic fitness apps have 85% churn rates because they don\'t adapt to individual progress and preferences.'
      },
      {
        id: 'solution',
        title: 'Solution',
        content: 'FitAI provides AI-powered personal training through computer vision and machine learning. Our app analyzes form in real-time, adapts workouts based on performance, and provides personalized nutrition guidance. Users get expert-level coaching at 1/10th the cost of human trainers.'
      },
      {
        id: 'market',
        title: 'Market',
        content: 'The global fitness app market is $4.4B and growing 14% annually. With 184M fitness app users worldwide and increasing health consciousness post-pandemic, our addressable market exceeds $15B. Premium fitness subscriptions show 90% higher retention than free alternatives.'
      },
      {
        id: 'product',
        title: 'Product',
        content: 'Our AI trainer uses computer vision to analyze workout form, provides real-time feedback, and adapts difficulty based on performance. Features include personalized meal planning, progress tracking, social challenges, and integration with wearables. Available on iOS and Android with offline capabilities.'
      },
      {
        id: 'team',
        title: 'Team',
        content: 'Founded by former Google AI researchers and certified personal trainers. Our team includes machine learning experts from DeepMind, fitness industry veterans, and mobile app developers with 50M+ downloads. Advised by Olympic coaches and sports medicine professionals.'
      }
    ]
  },
  {
    id: 'crypto-wallet',
    title: 'SafeVault - Crypto Wallet',
    description: 'Ultra-secure cryptocurrency wallet with social recovery',
    category: 'Fintech & Crypto',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    stats: {
      funding: '$5M Seed',
      users: '250K+ Wallets',
      growth: '500% YoY'
    },
    slides: [
      {
        id: 'problem',
        title: 'Problem',
        content: '$3.8B in cryptocurrency is lost annually due to forgotten passwords and lost private keys. Current wallets are either too complex for mainstream users or lack enterprise-grade security. 60% of crypto holders worry about losing access to their funds permanently.'
      },
      {
        id: 'solution',
        title: 'Solution',
        content: 'SafeVault combines military-grade security with social recovery mechanisms. Users can recover wallets through trusted contacts without compromising security. Our multi-signature architecture and biometric authentication provide bank-level security with consumer-friendly usability.'
      },
      {
        id: 'market',
        title: 'Market',
        content: 'The crypto wallet market is projected to reach $24.8B by 2026, growing at 24% CAGR. With 106M crypto users globally and institutional adoption accelerating, secure wallet solutions represent a massive opportunity. Enterprise crypto adoption is growing 300% annually.'
      },
      {
        id: 'product',
        title: 'Product',
        content: 'Features include social recovery, multi-signature security, DeFi integration, NFT gallery, and cross-chain compatibility. Our wallet supports 500+ cryptocurrencies with built-in staking, lending, and trading capabilities. Available as mobile app and browser extension.'
      },
      {
        id: 'team',
        title: 'Team',
        content: 'Led by former Coinbase security engineers and blockchain researchers from MIT. Our team includes cryptography experts, fintech veterans from Goldman Sachs, and product leaders from successful crypto startups. Advised by Ethereum Foundation members and crypto fund partners.'
      }
    ]
  },
  {
    id: 'pet-tracker',
    title: 'PawTrack - Smart Pet Monitor',
    description: 'IoT device and app for comprehensive pet health tracking',
    category: 'IoT & Pets',
    icon: Heart,
    color: 'from-green-500 to-emerald-500',
    stats: {
      funding: '$1.8M Pre-Series A',
      users: '75K+ Pet Parents',
      growth: '250% YoY'
    },
    slides: [
      {
        id: 'problem',
        title: 'Problem',
        content: 'Pet owners spend $1,480 annually on veterinary care, often for preventable conditions. 67% of pets are overweight, and early health issues go undetected until expensive emergency visits. Current pet monitors only track location, missing critical health indicators.'
      },
      {
        id: 'solution',
        title: 'Solution',
        content: 'PawTrack combines smart collar sensors with AI health analysis to monitor activity, sleep, eating patterns, and vital signs. Our app provides early health alerts, connects with veterinarians, and offers personalized care recommendations to prevent costly health issues.'
      },
      {
        id: 'market',
        title: 'Market',
        content: 'The pet tech market is $8.1B and growing 22% annually. With 90M pet-owning households in the US spending $136B annually on pets, smart pet devices represent a $2.5B opportunity. Pet insurance adoption is growing 25% yearly, indicating increased health focus.'
      },
      {
        id: 'product',
        title: 'Product',
        content: 'Our smart collar tracks GPS location, activity levels, sleep quality, heart rate, and temperature. The companion app provides health insights, vet chat, medication reminders, and social features. Waterproof design with 30-day battery life and real-time alerts.'
      },
      {
        id: 'team',
        title: 'Team',
        content: 'Founded by veterinarians and IoT engineers from Fitbit. Our team includes animal health experts, hardware engineers from Apple, and pet industry veterans. Advised by veterinary colleges, pet insurance companies, and successful pet tech entrepreneurs.'
      }
    ]
  }
];

interface ExampleDecksProps {
  onSelectDeck: (slides: any[], title: string, useCase: string, theme: string) => void;
}

export const ExampleDecks: React.FC<ExampleDecksProps> = ({ onSelectDeck }) => {
  const handleTryExample = (deck: ExampleDeck) => {
    // Store the example deck data
    localStorage.setItem('pitchforge_slides', JSON.stringify(deck.slides));
    localStorage.setItem('pitchforge_idea', `${deck.title}: ${deck.description}`);
    localStorage.setItem('pitchforge_usecase', 'startup');
    localStorage.setItem('pitchforge_theme', 'modern');
    
    toast.success(`🚀 Loaded ${deck.title} example deck!`);
    
    // Call the callback to navigate or update state
    onSelectDeck(deck.slides, deck.title, 'startup', 'modern');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Play className="w-4 h-4" />
            <span>🎯 Try an Example</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            See PitchForge in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> action</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore pre-generated pitch decks from successful startups to see the quality and depth of AI-generated content.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exampleDecks.map((deck, index) => (
            <motion.div
              key={deck.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${deck.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <deck.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{deck.title}</h3>
                      <p className="text-sm opacity-90">{deck.category}</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {deck.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Funding</span>
                    <span className="font-semibold text-green-600">{deck.stats.funding}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Users</span>
                    <span className="font-semibold text-blue-600">{deck.stats.users}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Growth</span>
                    <span className="font-semibold text-purple-600">{deck.stats.growth}</span>
                  </div>
                </div>
              </div>

              {/* Slides Preview */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Rocket className="w-4 h-4 mr-2" />
                  📊 {deck.slides.length} Slides Included
                </h4>
                <div className="space-y-2 mb-6">
                  {deck.slides.map((slide, slideIndex) => (
                    <div key={slide.id} className="flex items-center space-x-2 text-sm">
                      <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium">
                        {slideIndex + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{slide.title}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleTryExample(deck)}
                  className={`w-full bg-gradient-to-r ${deck.color} text-white hover:shadow-lg btn-hover-lift`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  🎯 Try This Example
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🚀 Ready to create your own?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              These examples show the quality of AI-generated content. Your pitch deck will be uniquely tailored to your specific idea and industry.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>AI-Generated</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Investor-Ready</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};