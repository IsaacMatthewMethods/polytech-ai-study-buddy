
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { ChatBot } from '@/components/ChatBot';
import { QuizSection } from '@/components/QuizSection';
import { QuizSimulator } from '@/components/QuizSimulator';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import { AssessmentHub } from '@/components/AssessmentHub';
import { ProgressTracker } from '@/components/ProgressTracker';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatBot />;
      case 'quiz':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Interactive Quiz
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Test your knowledge and earn XP!
                </p>
                <QuizSimulator />
              </div>
            </div>
          </div>
        );
      case 'knowledge':
        return <KnowledgeBase />;
      case 'assessment':
        return <AssessmentHub />;
      case 'progress':
        return <ProgressTracker />;
      default:
        return (
          <>
            <Hero />
            <Features onSectionSelect={setActiveSection} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="animate-fade-in">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
