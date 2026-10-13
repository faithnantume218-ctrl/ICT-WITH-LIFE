export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface PracticalActivity {
  title: string;
  instructions: string[];
  expectedResult: string;
  tip?: string;
}

export interface RealLifeExample {
  title: string;
  scenario: string;
  lessonTakeaway: string;
}

export interface KeyConcept {
  title: string;
  content: string;
  subPoints?: string[];
  analogy?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  moduleName: string;
  order: number;
  title: string;
  shortDescription: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  iconName: string;
  learningObjectives: string[];
  introduction: string;
  keyConcepts: KeyConcept[];
  realLifeExample: RealLifeExample;
  interactiveWidgetType: 
    | 'computer-parts'
    | 'input-output-devices'
    | 'hardware-components'
    | 'software-types'
    | 'operating-systems'
    | 'file-folders'
    | 'word-ribbon'
    | 'excel-grid'
    | 'powerpoint-slides'
    | 'internet-browsing'
    | 'email-compose'
    | 'computer-networks'
    | 'cyber-phishing'
    | 'digital-safety';
  practicalActivity: PracticalActivity;
  summaryPoints: string[];
  quiz: QuizQuestion[];
  revisionQuestions: string[];
}

export interface Module {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  lessonIds: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'starter' | 'hardware' | 'software' | 'office' | 'network' | 'cyber' | 'master';
  pointsReward: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Basics' | 'Hardware' | 'Software' | 'Office' | 'Internet' | 'Security';
  definition: string;
  simpleExample: string;
}

export interface QuizRecord {
  quizId: string;
  quizTitle: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
  level: DifficultyLevel;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  schoolOrCity: string;
  role: 'student' | 'teacher' | 'adult_learner';
  avatar: string;
  joinedDate: string;
  completedLessons: string[];
  quizRecords: QuizRecord[];
  totalPoints: number;
  unlockedBadgeIds: string[];
  streakDays: number;
  lastActiveDate: string;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface AboutInfo {
  heroTagline: string;
  mainHeading: string;
  subDescription: string;
  missionHeading: string;
  missionDescription: string;
  philosophyHeading: string;
  philosophyDescription: string;
  targetAudience: {
    title: string;
    description: string;
    iconEmoji: string;
  }[];
}

export interface ContactInfo {
  organizationName: string;
  email: string;
  phone: string;
  address: string;
  responseTimeNote: string;
}

export interface HomeAnnouncement {
  id: string;
  title: string;
  category: 'Announcement' | 'Lab Notice' | 'Weekly Tip' | 'Exam Prep';
  content: string;
  date: string;
  badge?: string;
}

export interface CustomQuizItem {
  id: string;
  topic: string;
  difficulty: DifficultyLevel;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface PracticeChallenge {
  id: string;
  title: string;
  category: string;
  task: string;
  expectedResult: string;
  difficulty: DifficultyLevel;
}

export interface StudyGoal {
  id: string;
  title: string;
  category: string;
  targetDate: string;
  completed: boolean;
}

export interface PersonalNote {
  id: string;
  lessonId?: string;
  lessonTitle?: string;
  title: string;
  content: string;
  date: string;
}

export interface ContactChannel {
  id: string;
  title: string;
  detail: string;
  description: string;
  iconName: 'phone' | 'mail' | 'map' | 'message';
}

export interface SubmittedInquiry {
  id: string;
  name: string;
  email: string;
  role: string;
  topic: string;
  message: string;
  date: string;
}
