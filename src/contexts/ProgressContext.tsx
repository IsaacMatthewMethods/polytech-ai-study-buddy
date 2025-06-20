
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProgress {
  level: number;
  xp: number;
  xpToNext: number;
  totalXp: number;
  coursesCompleted: number;
  totalCourses: number;
  averageScore: number;
  studyStreak: number;
  achievements: number;
  lastStudyDate: string;
}

export interface CourseProgress {
  name: string;
  progress: number;
  score: number | null;
  status: 'completed' | 'in-progress' | 'not-started';
  timeSpent: number;
  quizzesCompleted: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt: Date;
}

export interface ProgressContextType {
  userProgress: UserProgress;
  courseProgress: CourseProgress[];
  achievements: Achievement[];
  weeklyActivity: { day: string; hours: number; quizzes: number }[];
  addXP: (amount: number) => void;
  updateCourseProgress: (courseName: string, progress: number, score?: number) => void;
  completeQuiz: (courseName: string, score: number) => void;
  addStudyTime: (minutes: number) => void;
  unlockAchievement: (achievementId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'kadpoly-ai-progress';

const defaultCourses: CourseProgress[] = [
  { name: 'Programming Fundamentals', progress: 0, score: null, status: 'not-started', timeSpent: 0, quizzesCompleted: 0 },
  { name: 'Database Management', progress: 0, score: null, status: 'not-started', timeSpent: 0, quizzesCompleted: 0 },
  { name: 'Web Development', progress: 0, score: null, status: 'not-started', timeSpent: 0, quizzesCompleted: 0 },
  { name: 'Computer Networks', progress: 0, score: null, status: 'not-started', timeSpent: 0, quizzesCompleted: 0 },
  { name: 'Cybersecurity', progress: 0, score: null, status: 'not-started', timeSpent: 0, quizzesCompleted: 0 },
  { name: 'Software Engineering', progress: 0, score: null, status: 'not-started', timeSpent: 0, quizzesCompleted: 0 },
];

const availableAchievements = [
  { id: 'first-quiz', title: 'First Steps', description: 'Completed your first quiz', icon: 'Trophy', color: 'text-blue-500' },
  { id: 'quiz-master', title: 'Quiz Master', description: 'Completed 10 quizzes with 90%+ score', icon: 'Trophy', color: 'text-yellow-500' },
  { id: 'study-streak-7', title: 'Study Streak', description: '7 days consecutive learning', icon: 'Calendar', color: 'text-blue-500' },
  { id: 'study-streak-15', title: 'Study Master', description: '15 days consecutive learning', icon: 'Calendar', color: 'text-purple-500' },
  { id: 'perfect-score', title: 'Perfect Score', description: 'Achieved 100% on a quiz', icon: 'Star', color: 'text-purple-500' },
  { id: 'fast-learner', title: 'Fast Learner', description: 'Completed 3 courses this month', icon: 'TrendingUp', color: 'text-green-500' },
  { id: 'chat-enthusiast', title: 'Chat Enthusiast', description: 'Asked 50 questions to AI assistant', icon: 'Bot', color: 'text-cyan-500' },
];

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    xp: 0,
    xpToNext: 100,
    totalXp: 100,
    coursesCompleted: 0,
    totalCourses: 6,
    averageScore: 0,
    studyStreak: 0,
    achievements: 0,
    lastStudyDate: new Date().toISOString().split('T')[0],
  });

  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>(defaultCourses);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({ day, hours: 0, quizzes: 0 }));
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserProgress(parsed.userProgress || userProgress);
        setCourseProgress(parsed.courseProgress || defaultCourses);
        setAchievements(parsed.achievements || []);
        setWeeklyActivity(parsed.weeklyActivity || weeklyActivity);
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      userProgress,
      courseProgress,
      achievements,
      weeklyActivity,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [userProgress, courseProgress, achievements, weeklyActivity]);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const addXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const xpForNextLevel = newLevel * 100;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: xpForNextLevel - newXP,
        totalXp: xpForNextLevel,
      };
    });
  };

  const updateCourseProgress = (courseName: string, progress: number, score?: number) => {
    setCourseProgress(prev => prev.map(course => {
      if (course.name === courseName) {
        const newStatus = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
        const wasCompleted = course.status === 'completed';
        const isNowCompleted = newStatus === 'completed';
        
        // Award XP for progress milestones
        if (progress > course.progress) {
          const progressDiff = progress - course.progress;
          addXP(Math.floor(progressDiff / 10) * 5); // 5 XP per 10% progress
        }
        
        // Award bonus XP for course completion
        if (isNowCompleted && !wasCompleted) {
          addXP(50);
          setUserProgress(up => ({ ...up, coursesCompleted: up.coursesCompleted + 1 }));
        }
        
        return {
          ...course,
          progress,
          score: score !== undefined ? score : course.score,
          status: newStatus,
        };
      }
      return course;
    }));
  };

  const completeQuiz = (courseName: string, score: number) => {
    // Award XP based on score
    const xpGained = Math.floor(score / 10) * 2; // 2 XP per 10% of score
    addXP(xpGained);
    
    // Update course progress
    setCourseProgress(prev => prev.map(course => {
      if (course.name === courseName) {
        const newQuizCount = course.quizzesCompleted + 1;
        const newScore = course.score ? Math.max(course.score, score) : score;
        
        return {
          ...course,
          score: newScore,
          quizzesCompleted: newQuizCount,
        };
      }
      return course;
    }));
    
    // Update weekly activity
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1; // Convert Sunday=0 to array index
    setWeeklyActivity(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, quizzes: day.quizzes + 1 } : day
    ));
    
    // Check for achievements
    if (score === 100) {
      unlockAchievement('perfect-score');
    }
    
    // Update study streak
    updateStudyStreak();
  };

  const addStudyTime = (minutes: number) => {
    const hours = minutes / 60;
    
    // Update weekly activity
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    setWeeklyActivity(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, hours: day.hours + hours } : day
    ));
    
    // Award XP for study time (1 XP per 10 minutes)
    addXP(Math.floor(minutes / 10));
    
    updateStudyStreak();
  };

  const updateStudyStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    setUserProgress(prev => {
      if (prev.lastStudyDate === today) {
        return prev; // Already studied today
      } else if (prev.lastStudyDate === yesterday) {
        // Consecutive day
        const newStreak = prev.studyStreak + 1;
        if (newStreak === 7) unlockAchievement('study-streak-7');
        if (newStreak === 15) unlockAchievement('study-streak-15');
        
        return { ...prev, studyStreak: newStreak, lastStudyDate: today };
      } else {
        // Streak broken, restart
        return { ...prev, studyStreak: 1, lastStudyDate: today };
      }
    });
  };

  const unlockAchievement = (achievementId: string) => {
    const existingAchievement = achievements.find(a => a.id === achievementId);
    if (existingAchievement) return;
    
    const achievementTemplate = availableAchievements.find(a => a.id === achievementId);
    if (!achievementTemplate) return;
    
    const newAchievement: Achievement = {
      ...achievementTemplate,
      unlockedAt: new Date(),
    };
    
    setAchievements(prev => [...prev, newAchievement]);
    setUserProgress(prev => ({ ...prev, achievements: prev.achievements + 1 }));
    
    // Award XP for achievement
    addXP(25);
  };

  // Calculate average score
  useEffect(() => {
    const coursesWithScores = courseProgress.filter(c => c.score !== null);
    if (coursesWithScores.length > 0) {
      const avg = coursesWithScores.reduce((sum, c) => sum + (c.score || 0), 0) / coursesWithScores.length;
      setUserProgress(prev => ({ ...prev, averageScore: Math.round(avg) }));
    }
  }, [courseProgress]);

  return (
    <ProgressContext.Provider value={{
      userProgress,
      courseProgress,
      achievements,
      weeklyActivity,
      addXP,
      updateCourseProgress,
      completeQuiz,
      addStudyTime,
      unlockAchievement,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
