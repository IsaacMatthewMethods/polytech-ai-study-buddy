
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Trophy, MessageCircle, ClipboardCheck, BarChart3, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Brain },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
    { id: 'quiz', label: 'Quizzes', icon: Trophy },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'assessment', label: 'Assessment', icon: ClipboardCheck },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kadpoly AI
              </h1>
              <p className="text-xs text-gray-600">Study Buddy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Achievement Badge */}
          <div className="hidden md:flex items-center space-x-3">
            <Badge variant="secondary" className="animate-bounce">
              <Trophy className="w-3 h-3 mr-1" />
              Level 1
            </Badge>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 animate-slide-in-right">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={`justify-start transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : ''
                    }`}
                    onClick={() => {
                      onSectionChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
