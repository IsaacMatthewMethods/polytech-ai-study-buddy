
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, BookOpen, Clock, TrendingUp, Award, Star, Calendar, Bot } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

export const ProgressTracker = () => {
  const { userProgress, courseProgress, achievements, weeklyActivity } = useProgress();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Trophy,
      Calendar,
      Star,
      TrendingUp,
      Bot,
    };
    return icons[iconName] || Trophy;
  };

  const totalStudyTime = weeklyActivity.reduce((sum, day) => sum + day.hours, 0);
  const totalQuizzes = weeklyActivity.reduce((sum, day) => sum + day.quizzes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Progress Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Overall Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Current Level</p>
                <p className="text-3xl font-bold">{userProgress.level}</p>
              </div>
              <Award className="w-8 h-8 text-blue-200" />
            </div>
            <div className="mt-4">
              <Progress value={(userProgress.xp / userProgress.totalXp) * 100} className="h-2 bg-blue-400" />
              <p className="text-xs text-blue-100 mt-1">{userProgress.xp}/{userProgress.totalXp} XP</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Courses Completed</p>
                <p className="text-3xl font-bold">{userProgress.coursesCompleted}/{userProgress.totalCourses}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-200" />
            </div>
            <div className="mt-4">
              <Progress value={(userProgress.coursesCompleted / userProgress.totalCourses) * 100} className="h-2 bg-green-400" />
              <p className="text-xs text-green-100 mt-1">{Math.round((userProgress.coursesCompleted / userProgress.totalCourses) * 100)}% Complete</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Average Score</p>
                <p className="text-3xl font-bold">{userProgress.averageScore}%</p>
              </div>
              <Target className="w-8 h-8 text-purple-200" />
            </div>
            <div className="mt-4">
              <Progress value={userProgress.averageScore} className="h-2 bg-purple-400" />
              <p className="text-xs text-purple-100 mt-1">
                {userProgress.averageScore >= 90 ? 'Excellent!' : userProgress.averageScore >= 70 ? 'Good!' : 'Keep practicing!'}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Study Streak</p>
                <p className="text-3xl font-bold">{userProgress.studyStreak}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-orange-100">
                {userProgress.studyStreak > 0 ? 'Days in a row! 🔥' : 'Start your streak today!'}
              </p>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Course Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Weekly Activity</TabsTrigger>
            <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h3>
              {courseProgress.map((course, index) => (
                <Card key={index} className="p-6 bg-white/80 backdrop-blur-lg border-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{course.name}</h4>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusText(course.status)}
                        </Badge>
                        {course.score && (
                          <span className="text-sm text-gray-600">Best Score: {course.score}%</span>
                        )}
                        <span className="text-sm text-gray-600">Quizzes: {course.quizzesCompleted}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{course.progress}%</div>
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Achievements ({achievements.length} unlocked)
              </h3>
              {achievements.length === 0 ? (
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0">
                  <p className="text-gray-600 text-center">
                    Start learning to unlock your first achievement! 🎯
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = getIconComponent(achievement.icon);
                    return (
                      <Card key={index} className="p-6 bg-white/80 backdrop-blur-lg border-0 hover:shadow-lg transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${achievement.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                            <p className="text-xs text-gray-500">
                              Unlocked: {achievement.unlockedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Activity</h3>
              <Card className="p-6 bg-white/80 backdrop-blur-lg border-0">
                <div className="grid grid-cols-7 gap-4">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                      <div className="space-y-2">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <div className="text-2xl font-bold text-blue-600">{day.hours.toFixed(1)}</div>
                          <div className="text-xs text-blue-600">hours</div>
                        </div>
                        <div className="bg-green-100 rounded-lg p-2">
                          <div className="text-lg font-bold text-green-600">{day.quizzes}</div>
                          <div className="text-xs text-green-600">quizzes</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <div className="grid gap-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Statistics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0">
                  <h4 className="font-semibold text-gray-900 mb-4">Learning Time</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-medium">{totalStudyTime.toFixed(1)} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">XP Earned</span>
                      <span className="font-medium">{userProgress.xp} XP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Level</span>
                      <span className="font-medium">Level {userProgress.level}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0">
                  <h4 className="font-semibold text-gray-900 mb-4">Quiz Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quizzes Taken</span>
                      <span className="font-medium">{totalQuizzes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Score</span>
                      <span className="font-medium">{userProgress.averageScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Achievements</span>
                      <span className="font-medium">{userProgress.achievements}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/80 backdrop-blur-lg border-0">
                  <h4 className="font-semibold text-gray-900 mb-4">Progress Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courses Started</span>
                      <span className="font-medium">
                        {courseProgress.filter(c => c.status !== 'not-started').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courses Completed</span>
                      <span className="font-medium text-green-600">{userProgress.coursesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Streak</span>
                      <span className="font-medium text-orange-600">{userProgress.studyStreak} days</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
