import React from 'react';
import { motion } from 'framer-motion';
import { Building, Smartphone, Trophy, Briefcase, CheckCircle } from 'lucide-react';

interface UseCaseSelectorProps {
  selectedUseCase: string;
  onSelect: (useCase: string) => void;
  className?: string;
}

const useCases = [
  {
    id: 'startup',
    label: 'Startup',
    description: 'Fundraising pitch for investors',
    icon: Building,
    color: 'from-blue-500 to-cyan-500',
    examples: ['Series A', 'Seed Round', 'Angel Investment']
  },
  {
    id: 'app',
    label: 'App Launch',
    description: 'Product launch presentation',
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    examples: ['App Store', 'Product Demo', 'Feature Release']
  },
  {
    id: 'hackathon',
    label: 'Hackathon',
    description: 'Competition presentation',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    examples: ['Demo Day', 'Judging Panel', 'Technical Showcase']
  },
  {
    id: 'agency',
    label: 'Agency Pitch',
    description: 'Client proposal presentation',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    examples: ['Client Proposal', 'Service Offering', 'Case Study']
  }
];

export const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({
  selectedUseCase,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
        🎯 Choose Your Use Case
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Select the type of presentation to personalize your pitch deck content and structure.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {useCases.map((useCase) => (
          <motion.button
            key={useCase.id}
            onClick={() => onSelect(useCase.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedUseCase === useCase.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedUseCase === useCase.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <useCase.icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {useCase.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {useCase.examples.map((example, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {selectedUseCase && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
        >
          <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            ✨ Content will be optimized for {useCases.find(u => u.id === selectedUseCase)?.label.toLowerCase()} presentations
          </p>
        </motion.div>
      )}
    </div>
  );
};