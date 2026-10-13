import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, QuizRecord } from '../types/ict';
import { BADGES } from '../data/badgesData';

interface StudentContextType {
  student: StudentProfile;
  isLoggedIn: boolean;
  activeToast: { title: string; message: string; icon?: string } | null;
  markLessonCompleted: (lessonId: string) => void;
  recordQuizScore: (record: Omit<QuizRecord, 'completedAt'>) => void;
  deleteQuizRecord: (index: number) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  loginAsUser: (name: string, email: string, school: string) => void;
  logoutToGuest: () => void;
  resetAllProgress: () => void;
  dismissToast: () => void;
}

const STORAGE_KEY = 'ict_hub_student_v1';

const DEFAULT_PROFILE: StudentProfile = {
  id: 'guest-student-1',
  name: 'Faith Nantume',
  email: 'faith.nantume@school.ac.ug',
  schoolOrCity: 'Kampala Secondary School',
  role: 'student',
  avatar: '👩‍🎓',
  joinedDate: 'October 2026',
  completedLessons: ['lesson-1'], // Start with Lesson 1 previewed or done
  quizRecords: [
    {
      quizId: 'practice-sample',
      quizTitle: 'Lesson 1: Intro to ICT Check',
      score: 5,
      total: 5,
      percentage: 100,
      completedAt: 'Yesterday',
      level: 'Beginner'
    }
  ],
  totalPoints: 150,
  unlockedBadgeIds: ['first_step'],
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved student data', e);
    }
    return DEFAULT_PROFILE;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return student.id !== 'guest-default';
  });

  const [activeToast, setActiveToast] = useState<{ title: string; message: string; icon?: string } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [student]);

  const showToast = (title: string, message: string, icon = '🎉') => {
    setActiveToast({ title, message, icon });
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  const checkBadgeUnlocks = (
    currentCompleted: string[],
    currentQuizRecords: QuizRecord[],
    currentBadges: string[]
  ) => {
    const newlyUnlocked: string[] = [];

    // First Step badge
    if (currentCompleted.length >= 1 && !currentBadges.includes('first_step')) {
      newlyUnlocked.push('first_step');
    }

    // Hardware Explorer (Lessons 1-4 completed)
    const hasHardware = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'].every(id => currentCompleted.includes(id));
    if (hasHardware && !currentBadges.includes('hardware_explorer')) {
      newlyUnlocked.push('hardware_explorer');
    }

    // System Navigator (Lessons 8 and 9 completed)
    const hasSystem = ['lesson-8', 'lesson-9'].every(id => currentCompleted.includes(id));
    if (hasSystem && !currentBadges.includes('software_savvy')) {
      newlyUnlocked.push('software_savvy');
    }

    // Office Pro (Word, Excel, PowerPoint: Lessons 10, 11, 12)
    const hasOffice = ['lesson-10', 'lesson-11', 'lesson-12'].every(id => currentCompleted.includes(id));
    if (hasOffice && !currentBadges.includes('office_wizard')) {
      newlyUnlocked.push('office_wizard');
    }

    // Internet Explorer (Lessons 13, 14, 15)
    const hasInternet = ['lesson-13', 'lesson-14', 'lesson-15'].every(id => currentCompleted.includes(id));
    if (hasInternet && !currentBadges.includes('web_navigator')) {
      newlyUnlocked.push('web_navigator');
    }

    // Cyber Sentinel (Lessons 16, 17)
    const hasCyber = ['lesson-16', 'lesson-17'].every(id => currentCompleted.includes(id));
    if (hasCyber && !currentBadges.includes('cyber_sentinel')) {
      newlyUnlocked.push('cyber_sentinel');
    }

    // Quiz Master (at least one score >= 80%)
    const hasHighQuiz = currentQuizRecords.some(q => q.percentage >= 80);
    if (hasHighQuiz && !currentBadges.includes('quiz_master')) {
      newlyUnlocked.push('quiz_master');
    }

    // Certified ICT Scholar (all 17 completed)
    if (currentCompleted.length >= 17 && !currentBadges.includes('ict_graduate')) {
      newlyUnlocked.push('ict_graduate');
    }

    return newlyUnlocked;
  };

  const markLessonCompleted = (lessonId: string) => {
    if (student.completedLessons.includes(lessonId)) return; // Already completed, avoid duplicate points

    const updatedCompleted = [...student.completedLessons, lessonId];
    const pointsGained = 50;
    const newTotalPoints = student.totalPoints + pointsGained;

    const newBadges = checkBadgeUnlocks(updatedCompleted, student.quizRecords, student.unlockedBadgeIds);
    let extraPoints = 0;
    newBadges.forEach(bId => {
      const bObj = BADGES.find(b => b.id === bId);
      if (bObj) extraPoints += bObj.pointsReward;
    });

    setStudent(prev => ({
      ...prev,
      completedLessons: updatedCompleted,
      totalPoints: newTotalPoints + extraPoints,
      unlockedBadgeIds: [...prev.unlockedBadgeIds, ...newBadges],
    }));

    if (newBadges.length > 0) {
      const firstBadge = BADGES.find(b => b.id === newBadges[0]);
      showToast(
        `New Badge Unlocked: ${firstBadge?.title || 'Achievement'}!`,
        `You completed a lesson milestone and earned +${pointsGained + extraPoints} ICT points!`
      );
    } else {
      showToast(
        'Lesson Completed! +50 Points',
        'Your progress has been saved to your dashboard.'
      );
    }
  };

  const recordQuizScore = (quizData: Omit<QuizRecord, 'completedAt'>) => {
    const fullRecord: QuizRecord = {
      ...quizData,
      completedAt: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
    };

    const updatedRecords = [fullRecord, ...student.quizRecords];
    const quizPoints = quizData.score * 10;
    const newTotalPoints = student.totalPoints + quizPoints;

    const newBadges = checkBadgeUnlocks(student.completedLessons, updatedRecords, student.unlockedBadgeIds);
    let extraPoints = 0;
    newBadges.forEach(bId => {
      const bObj = BADGES.find(b => b.id === bId);
      if (bObj) extraPoints += bObj.pointsReward;
    });

    setStudent(prev => ({
      ...prev,
      quizRecords: updatedRecords,
      totalPoints: newTotalPoints + extraPoints,
      unlockedBadgeIds: [...prev.unlockedBadgeIds, ...newBadges],
    }));

    if (newBadges.length > 0) {
      const firstBadge = BADGES.find(b => b.id === newBadges[0]);
      showToast(
        `Badge Unlocked: ${firstBadge?.title || 'Achievement'}!`,
        `You scored ${quizData.score}/${quizData.total} (${quizData.percentage}%) and earned +${quizPoints + extraPoints} points!`
      );
    } else {
      showToast(
        `Quiz Completed! Scored ${quizData.score}/${quizData.total}`,
        `You earned +${quizPoints} ICT practice points.`
      );
    }
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setStudent(prev => ({ ...prev, ...updates }));
    showToast('Profile Updated', 'Your student account details were saved successfully.');
  };

  const loginAsUser = (name: string, email: string, school: string) => {
    setStudent(prev => ({
      ...prev,
      id: `usr-${Date.now()}`,
      name: name.trim() || 'Learner',
      email: email.trim() || 'learner@school.ac.ug',
      schoolOrCity: school.trim() || 'Community Student',
    }));
    setIsLoggedIn(true);
    showToast('Welcome!', `Logged in as ${name}. Your progress will be saved continuously.`);
  };

  const logoutToGuest = () => {
    setStudent(DEFAULT_PROFILE);
    setIsLoggedIn(false);
    showToast('Logged Out', 'Switched back to Guest Student mode.');
  };

  const resetAllProgress = () => {
    setStudent({
      ...DEFAULT_PROFILE,
      completedLessons: [],
      quizRecords: [],
      totalPoints: 0,
      unlockedBadgeIds: [],
      streakDays: 1,
    });
    showToast('Progress Reset', 'Your learning history has been cleared.');
  };

  const deleteQuizRecord = (indexToDelete: number) => {
    setStudent(prev => ({
      ...prev,
      quizRecords: prev.quizRecords.filter((_, idx) => idx !== indexToDelete),
    }));
    showToast('Record Removed', 'Quiz record was removed from your dashboard.');
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        isLoggedIn,
        activeToast,
        markLessonCompleted,
        recordQuizScore,
        deleteQuizRecord,
        updateProfile,
        loginAsUser,
        logoutToGuest,
        resetAllProgress,
        dismissToast: () => setActiveToast(null),
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
