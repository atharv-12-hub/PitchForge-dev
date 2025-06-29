import React from 'react';
import { motion } from 'framer-motion';
import { Palette, CheckCircle, Sparkles } from 'lucide-react';

interface TemplateThemeSelectorProps {
  selectedTheme: string;
  onSelect: (theme: string) => void;
  className?: string;
}

const themes = [
  {
    id: 'modern',
    label: 'Modern',
    description: 'Clean lines, bold typography, vibrant colors',
    preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
    textColor: 'text-white',
    features: ['Gradient backgrounds', 'Sans-serif fonts', 'Minimal shadows'],
    style: {
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    }
  },
  {
    id: 'corporate',
    label: 'Corporate',
    description: 'Professional, trustworthy, business-focused',
    preview: 'bg-gradient-to-br from-gray-700 to-blue-800',
    textColor: 'text-white',
    features: ['Conservative colors', 'Professional fonts', 'Structured layout'],
    style: {
      fontFamily: 'Georgia, serif',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'Simple, elegant, focus on content',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-300',
    textColor: 'text-gray-800',
    features: ['White space', 'Simple typography', 'Subtle accents'],
    style: {
      fontFamily: 'system-ui, sans-serif',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }
  }
];

export const TemplateThemeSelector: React.FC<TemplateThemeSelectorProps> = ({
  selectedTheme,
  onSelect,
  className = ''
}) => {
  const selectedThemeData = themes.find(t => t.id === selectedTheme);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2 text-purple-500" />
        🎨 Slide Template Themes
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Choose a visual style that matches your presentation context and audience.
      </p>
      
      <div className="space-y-4">
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => onSelect(theme.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedTheme === theme.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={selectedTheme === theme.id ? theme.style : {}}
          >
            <div className="flex items-center space-x-4">
              {/* Theme Preview */}
              <div className="relative">
                <div className={`w-16 h-12 ${theme.preview} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                  <div className={`text-xs font-bold ${theme.textColor} text-center`}>
                    <div className="mb-1">Title</div>
                    <div className="text-xs opacity-75">• Content</div>
                  </div>
                  
                  {selectedTheme === theme.id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Theme Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {theme.label}
                  </h4>
                  {selectedTheme === theme.id && (
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {theme.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {theme.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {selectedThemeData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg"
        >
          <p className="text-sm text-purple-700 dark:text-purple-300 flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            🎨 Using {selectedThemeData.label} theme - {selectedThemeData.description.toLowerCase()}
          </p>
        </motion.div>
      )}
    </div>
  );
};