import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Palette, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  skills: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 'atharv',
    name: 'Atharv Mulik',
    title: 'Founder & Full-Stack Developer',
    bio: 'Visionary behind PitchForge.dev. Specializes in AI-driven interfaces, frontend engineering, and no-code development. Built and launched the full product solo in just days using Bolt.new and Gemini AI.',
    avatar: '👨‍💻',
    skills: ['React', 'TypeScript', 'AI Integration', 'Product Strategy'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    id: 'ajinkya',
    name: 'Ajinkya Sangale',
    title: 'AI & Product Strategy Lead',
    bio: 'Expert in prompt engineering, product flow design, and creative AI applications. Drives ideation and optimization of slide generation logic using real-world startup dynamics.',
    avatar: '🧠',
    skills: ['Prompt Engineering', 'Product Design', 'AI Strategy', 'UX Research'],
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 'piyush',
    name: 'Piyush Dangare',
    title: 'Head of Design',
    bio: 'Crafts intuitive, modern UI with precision and user empathy. Focused on clean layouts, mobile responsiveness, and startup-grade visual polish.',
    avatar: '🎨',
    skills: ['UI/UX Design', 'Responsive Design', 'Design Systems', 'User Research'],
    social: {
      linkedin: '#',
      twitter: '#'
    }
  }
];

export const TeamExpertise: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Code className="w-4 h-4" />
            <span>👥 Team & Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            A world-class team with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> deep expertise</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A world-class team with deep expertise in AI, product design, and startup execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Header with gradient background */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-100 font-medium">{member.title}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    🛠️ Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                {member.social && (
                  <div className="flex items-center space-x-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Philosophy Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-6">💭</div>
            <blockquote className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 italic leading-relaxed">
              "A solo-led dream team built from focused expertise — proving that with the right mindset, AI, and tools, one person can ship startup-quality software faster than ever before."
            </blockquote>
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>AI-Powered Development</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center space-x-1">
                <Code className="w-4 h-4" />
                <span>Modern Tech Stack</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center space-x-1">
                <Palette className="w-4 h-4" />
                <span>Design Excellence</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Days to Build</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solo Developer</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">6</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Core Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Frontend Only</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};