
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { ChatBot } from '@/components/ChatBot';
import { QuizSection } from '@/components/QuizSection';
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
        return <QuizSection />;
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
