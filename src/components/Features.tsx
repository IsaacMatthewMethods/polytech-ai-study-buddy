
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Trophy, BookOpen, ClipboardCheck, BarChart3, Sparkles } from 'lucide-react';

interface FeaturesProps {
  onSectionSelect: (section: string) => void;
}

export const Features = ({ onSectionSelect }: FeaturesProps) => {
  const features = [
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'AI Study Assistant',
      description: 'Get instant help with your Computer Science questions from our intelligent chatbot powered by Gemini AI.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'quiz',
      icon: Trophy,
      title: 'Gamified Quizzes',
      description: 'Test your knowledge with fun, interactive quizzes. Earn points, unlock achievements, and climb the leaderboard.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'knowledge',
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Access comprehensive learning materials covering both ND and HND Computer Science curriculum.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 'assessment',
      icon: ClipboardCheck,
      title: 'Self Assessment',
      description: 'Evaluate your understanding with detailed assessments and get personalized feedback on your progress.',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'progress',
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics, performance insights, and achievement tracking.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-600">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover all the tools and resources designed to make your Computer Science journey engaging and successful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className={`p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer border-0 ${feature.bgColor} animate-fade-in group`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onSectionSelect(feature.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Button
                  variant="ghost"
                  className="w-full justify-center group-hover:bg-white/50 transition-all duration-300"
                >
                  Explore Feature
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
