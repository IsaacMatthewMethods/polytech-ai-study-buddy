import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClipboardCheck, Clock, Star, TrendingUp, Award, Target, CheckCircle, AlertCircle } from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: number;
  timeLimit: number;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  category: string;
  completed: boolean;
  score?: number;
  attempts: number;
}

const assessments: Assessment[] = [
  {
    id: '1',
    title: 'Programming Fundamentals Assessment',
    description: 'Comprehensive evaluation of basic programming concepts and problem-solving skills.',
    questions: 30,
    timeLimit: 45,
    difficulty: 'Basic',
    category: 'Programming',
    completed: true,
    score: 85,
    attempts: 2,
  },
  {
    id: '2',
    title: 'Database Design Proficiency Test',
    description: 'Advanced assessment covering database design, normalization, and SQL optimization.',
    questions: 25,
    timeLimit: 40,
    difficulty: 'Advanced',
    category: 'Database',
    completed: false,
    attempts: 0,
  },
  {
    id: '3',
    title: 'Web Development Skills Evaluation',
    description: 'Practical assessment of frontend and backend web development capabilities.',
    questions: 35,
    timeLimit: 60,
    difficulty: 'Intermediate',
    category: 'Web Development',
    completed: true,
    score: 92,
    attempts: 1,
  },
  {
    id: '4',
    title: 'Network Security Assessment',
    description: 'Evaluation of cybersecurity knowledge and network protection strategies.',
    questions: 28,
    timeLimit: 50,
    difficulty: 'Advanced',
    category: 'Security',
    completed: false,
    attempts: 1,
  },
];

export const AssessmentHub = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const sampleQuestions = [
    {
      question: "Which of the following best describes the concept of abstraction in programming?",
      options: [
        "Hiding implementation details while showing only essential features",
        "Converting code from one language to another",
        "Optimizing code for better performance",
        "Creating backup copies of code"
      ],
      correct: 0,
      explanation: "Abstraction is a fundamental concept in programming that involves hiding complex implementation details while exposing only the necessary features to the user."
    },
    {
      question: "What is the time complexity of binary search algorithm?",
      options: [
        "O(n)",
        "O(log n)",
        "O(n log n)",
        "O(n²)"
      ],
      correct: 1,
      explanation: "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each iteration."
    },
    {
      question: "Which design pattern is used to create a single instance of a class?",
      options: [
        "Factory Pattern",
        "Observer Pattern",
        "Singleton Pattern",
        "Adapter Pattern"
      ],
      correct: 2,
      explanation: "The Singleton pattern ensures that a class has only one instance and provides a global point of access to it."
    }
  ];

  const completedAssessments = assessments.filter(a => a.completed);
  const averageScore = completedAssessments.length > 0 
    ? Math.round(completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length)
    : 0;

  const handleStartAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic':
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
    const score = answers.reduce((correct, answer, index) => {
      return correct + (answer === sampleQuestions[index].correct ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / sampleQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h2>
              <p className="text-gray-600">Here's your detailed performance report</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{score}/{sampleQuestions.length}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{percentage}%</div>
                <div className="text-sm text-gray-600">Overall Score</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : percentage >= 60 ? 'D' : 'F'}
                </div>
                <div className="text-sm text-gray-600">Grade</div>
              </Card>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Question Review</h3>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  {sampleQuestions.map((question, index) => {
                    const isCorrect = answers[index] === question.correct;
                    return (
                      <Card key={index} className={`p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-start space-x-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-2">
                              Question {index + 1}: {question.question}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              Your answer: {question.options[answers[index]]}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600 mb-2">
                                Correct answer: {question.options[question.correct]}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">{question.explanation}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetAssessment} variant="outline">
                Back to Assessments
              </Button>
              <Button onClick={() => handleStartAssessment(selectedAssessment!)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Retake Assessment
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
    const question = sampleQuestions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="px-3 py-1">
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedAssessment.timeLimit} minutes
                </div>
              </div>
              <Progress value={progress} className="h-2 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{question.question}</h2>
            </div>

            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto hover:bg-blue-50 transition-all duration-300"
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

            <div className="pt-6 border-t border-gray-200/50">
              <Button variant="ghost" onClick={resetAssessment} className="text-gray-600">
                ← Back to Assessments
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
            Assessment Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evaluate your knowledge with comprehensive assessments and track your progress
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">{completedAssessments.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-200" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Average Score</p>
                <p className="text-2xl font-bold">{averageScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Pending</p>
                <p className="text-2xl font-bold">{assessments.filter(a => !a.completed).length}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-200" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Achievements</p>
                <p className="text-2xl font-bold">{completedAssessments.filter(a => (a.score || 0) >= 90).length}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-200" />
            </div>
          </Card>
        </div>

        {/* Assessments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assessments.map((assessment) => (
            <Card
              key={assessment.id}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-lg border-0 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    assessment.completed 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    {assessment.completed ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <ClipboardCheck className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                </div>
                {assessment.completed && assessment.score && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{assessment.score}%</div>
                    <div className="text-xs text-gray-500">Best Score</div>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {assessment.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {assessment.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{assessment.questions} questions</span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {assessment.timeLimit} min
                </span>
                <span>Attempts: {assessment.attempts}</span>
              </div>

              <Button
                onClick={() => handleStartAssessment(assessment)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group-hover:shadow-lg transition-all duration-300"
              >
                {assessment.completed ? 'Retake Assessment' : 'Start Assessment'}
                <Target className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
