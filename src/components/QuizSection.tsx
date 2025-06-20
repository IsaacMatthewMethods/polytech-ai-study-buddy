
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Clock, ChevronRight, Code, Database, Globe, Shield } from 'lucide-react';

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  icon: any;
  color: string;
  estimatedTime: string;
}

const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'Programming Fundamentals',
    description: 'Test your knowledge of basic programming concepts, variables, and control structures.',
    questions: 20,
    difficulty: 'Beginner',
    category: 'Programming',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    estimatedTime: '15 min',
  },
  {
    id: '2',
    title: 'Database Management Systems',
    description: 'Assess your understanding of SQL, database design, and relational concepts.',
    questions: 25,
    difficulty: 'Intermediate',
    category: 'Database',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    estimatedTime: '20 min',
  },
  {
    id: '3',
    title: 'Web Development Basics',
    description: 'Challenge yourself with HTML, CSS, and JavaScript fundamentals.',
    questions: 18,
    difficulty: 'Beginner',
    category: 'Web Dev',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    estimatedTime: '12 min',
  },
  {
    id: '4',
    title: 'Network Security',
    description: 'Test your knowledge of cybersecurity principles and network protection.',
    questions: 22,
    difficulty: 'Advanced',
    category: 'Security',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    estimatedTime: '18 min',
  },
];

export const QuizSection = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const sampleQuestions = [
    {
      question: "What is the primary purpose of a variable in programming?",
      options: [
        "To store data that can be used later",
        "To display output to the user",
        "To execute loops",
        "To define functions"
      ],
      correct: 0
    },
    {
      question: "Which data structure follows the LIFO (Last In First Out) principle?",
      options: [
        "Queue",
        "Stack",
        "Array",
        "Linked List"
      ],
      correct: 1
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Simple Query Language",
        "Structured Query Language",
        "Standard Query Language",
        "System Query Language"
      ],
      correct: 1
    }
  ];

  const handleQuizStart = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showResults) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <p className="text-gray-600">Great job on completing the quiz!</p>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-2">{score}/{sampleQuestions.length}</div>
              <div className="text-2xl font-semibold text-green-600 mb-4">{percentage}%</div>
              <Progress value={percentage} className="h-3 mb-4" />
              <p className="text-gray-600">
                {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                Back to Quizzes
              </Button>
              <Button onClick={() => handleQuizStart(selectedQuiz!)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Retake Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
    const question = sampleQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="px-3 py-1">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedQuiz.estimatedTime}
                </div>
              </div>
              <Progress value={progress} className="h-2 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{question.question}</h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                  onClick={() => handleAnswer(index)}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    {option}
                  </div>
                </Button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <Button variant="ghost" onClick={resetQuiz} className="text-gray-600">
                ← Back to Quizzes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Gamified Quizzes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your knowledge and earn points with our interactive Computer Science quizzes
          </p>
        </div>

        {/* Achievement Banner */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                <p className="text-gray-600">Level 1 • 0/100 XP to next level</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Beginner
            </Badge>
          </div>
        </Card>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const Icon = quiz.icon;
            return (
              <Card
                key={quiz.id}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white/80 backdrop-blur-lg border-0 group"
                onClick={() => handleQuizStart(quiz)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${quiz.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {quiz.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{quiz.questions} questions</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {quiz.estimatedTime}
                  </span>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group-hover:shadow-lg transition-all duration-300"
                >
                  Start Quiz
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
