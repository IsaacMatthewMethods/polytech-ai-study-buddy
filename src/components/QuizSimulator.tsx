
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/contexts/ProgressContext';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What does OOP stand for?",
    options: ["Object-Oriented Programming", "Only One Program", "Open Office Program", "Optional Output Parameter"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which of the following is NOT a programming paradigm?",
    options: ["Functional", "Object-Oriented", "Procedural", "Mechanical"],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What is the primary key in a database?",
    options: ["A duplicate record", "A unique identifier for records", "A password", "A backup key"],
    correctAnswer: 1
  }
];

export const QuizSimulator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const { completeQuiz, updateCourseProgress } = useProgress();
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz complete
      const finalScore = score + (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer ? 1 : 0);
      const percentage = Math.round((finalScore / sampleQuestions.length) * 100);
      
      setIsQuizComplete(true);
      
      // Update progress
      completeQuiz('Programming Fundamentals', percentage);
      updateCourseProgress('Programming Fundamentals', Math.min(100, percentage + 20), percentage);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${percentage}% and earned XP!`,
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizComplete(false);
    setAnswers([]);
  };

  if (isQuizComplete) {
    const finalScore = Math.round((score / sampleQuestions.length) * 100);
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 max-w-2xl mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Quiz Complete! 🎉</h3>
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{finalScore}%</div>
            <p className="text-gray-600">You answered {score} out of {sampleQuestions.length} questions correctly</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>XP Earned:</span>
              <span className="font-bold text-green-600">+{Math.floor(finalScore / 10) * 2} XP</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Course Progress Updated:</span>
              <span className="font-bold text-blue-600">Programming Fundamentals</span>
            </div>
          </div>
          
          <Button onClick={resetQuiz} className="w-full">
            Take Quiz Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-lg border-0 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Programming Fundamentals Quiz</h3>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {sampleQuestions.length}
          </span>
        </div>
        <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} className="h-2" />
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-medium text-gray-900 mb-4">
          {sampleQuestions[currentQuestion].question}
        </h4>
        
        <div className="space-y-3">
          {sampleQuestions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full text-left justify-start p-4 h-auto ${
                selectedAnswer === index ? 'bg-blue-600 text-white' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
              {option}
            </Button>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleNextQuestion} 
        disabled={selectedAnswer === null}
        className="w-full"
      >
        {currentQuestion === sampleQuestions.length - 1 ? 'Complete Quiz' : 'Next Question'}
      </Button>
    </Card>
  );
};
