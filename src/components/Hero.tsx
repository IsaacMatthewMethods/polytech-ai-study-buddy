
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Sparkles, Target, BookOpen } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-yellow-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600">AI-Powered Learning Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-scale-in">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              PolyTech AI
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Your intelligent study companion for Computer Science at Kaduna Polytechnic. 
            Master ND & HND courses with AI-powered quizzes, assessments, and personalized learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Brain className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-2 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
              <Target className="w-5 h-5 mr-2" />
              Take Assessment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: BookOpen, title: '50+ Courses', desc: 'Comprehensive curriculum coverage', color: 'from-blue-500 to-cyan-500' },
            { icon: Target, title: '1000+ Questions', desc: 'Interactive quizzes & assessments', color: 'from-purple-500 to-pink-500' },
            { icon: Brain, title: 'AI Assistant', desc: '24/7 personalized help', color: 'from-green-500 to-emerald-500' },
          ].map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in border-0 bg-white/70 backdrop-blur-sm">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.title}</h3>
              <p className="text-gray-600">{stat.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
