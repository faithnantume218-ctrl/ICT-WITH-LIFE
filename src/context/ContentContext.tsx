import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Lesson, 
  Module, 
  GlossaryTerm, 
  FaqItem, 
  AboutInfo, 
  ContactInfo,
  HomeAnnouncement,
  CustomQuizItem,
  PracticeChallenge,
  StudyGoal,
  PersonalNote,
  ContactChannel,
  SubmittedInquiry
} from '../types/ict';
import { LESSONS, MODULES } from '../data/lessonsData';
import { GLOSSARY_TERMS } from '../data/glossaryData';

export interface SorterDeviceItem {
  id: string;
  name: string;
  iconLabel: string;
  correctCategory: 'input' | 'output' | 'storage';
  explanation: string;
}

const DEFAULT_SORTER_DEVICES: SorterDeviceItem[] = [
  { id: 'item-1', name: 'Computer Keyboard', iconLabel: '⌨️', correctCategory: 'input', explanation: 'Sends keystroke signals into the computer to type characters and commands.' },
  { id: 'item-2', name: 'Laser Printer', iconLabel: '🖨️', correctCategory: 'output', explanation: 'Produces physical paper hard copies from digital documents.' },
  { id: 'item-3', name: 'USB Flash Drive', iconLabel: '💾', correctCategory: 'storage', explanation: 'Stores files permanently on portable flash memory chips.' },
  { id: 'item-4', name: 'Flatbed Scanner', iconLabel: '📄', correctCategory: 'input', explanation: 'Converts printed paper documents and photos into digital image files.' },
  { id: 'item-5', name: 'Classroom Projector', iconLabel: '📽️', correctCategory: 'output', explanation: 'Projects video and slide images onto large screens or classroom walls.' },
  { id: 'item-6', name: 'Microphone', iconLabel: '🎙️', correctCategory: 'input', explanation: 'Captures voice sound waves and converts them into digital audio signals.' },
  { id: 'item-7', name: 'Solid State Drive (SSD)', iconLabel: '💽', correctCategory: 'storage', explanation: 'High-speed non-volatile internal drive that stores the OS and files.' },
  { id: 'item-8', name: 'Audio Headphones', iconLabel: '🎧', correctCategory: 'output', explanation: 'Plays audio output directly to the listener’s ears.' },
  { id: 'item-9', name: 'Barcode Scanner', iconLabel: '🏷️', correctCategory: 'input', explanation: 'Reads optical barcode patterns in shops and inputs product codes.' }
];

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    q: 'How does ICT Learning Hub track my progress and quiz scores?',
    a: 'All completed lessons, quiz scores, points, and earned badges are saved automatically in your browser’s local storage. Your progress stays safe whenever you revisit the website without requiring passwords.'
  },
  {
    id: 'faq-2',
    q: 'Can primary and secondary schools use this platform in their computer laboratories?',
    a: 'Yes, absolutely! ICT Learning Hub is 100% free for educational use. Teachers can project our interactive diagrams onto classroom screens and assign the 5-question quizzes as end-of-lesson checks.'
  },
  {
    id: 'faq-3',
    q: 'Are the Certificates of Completion free?',
    a: 'Yes! Once you complete your lessons or milestone assessments, click "View Certificate" on your Dashboard. You can print it directly or choose "Save as PDF" to download it without any payment.'
  },
  {
    id: 'faq-4',
    q: 'Does the website work on mobile phones and tablets?',
    a: 'Yes! The entire platform is built with a responsive layout optimized for mobile screens, tablets, laptops, and desktop computers.'
  },
  {
    id: 'faq-5',
    q: 'How can I retake a quiz to improve my score?',
    a: 'After completing any lesson quiz or the 10-question practice test, you can click "Retake Quiz" at any time. Immediate explanations will highlight why each option is correct or incorrect.'
  }
];

const DEFAULT_HOME_ANNOUNCEMENTS: HomeAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'New Microsoft Office Interactive Practice Labs Added',
    category: 'Announcement',
    content: 'Try our brand new Word Ribbon toolbar and Excel formula simulator in the Interactive Practice tab.',
    date: 'Today',
    badge: 'New Feature'
  },
  {
    id: 'ann-2',
    title: 'Secondary School ICT Examination Revision Guide',
    category: 'Exam Prep',
    content: 'Review computer hardware definitions, I/O peripherals, and cybersecurity tips to prepare for your school term exams.',
    date: 'This Week',
    badge: 'Study Tip'
  },
  {
    id: 'ann-3',
    title: 'Computer Lab Safety & Responsible Internet Use',
    category: 'Lab Notice',
    content: 'Remember to always shut down computers properly using the Start menu and never share personal passwords.',
    date: 'Notice',
    badge: 'Safety'
  }
];

const DEFAULT_CUSTOM_QUIZ_QUESTIONS: CustomQuizItem[] = [
  {
    id: 'cquiz-1',
    topic: 'hardware',
    difficulty: 'Beginner',
    question: 'Which of the following is an example of an optical storage media?',
    options: ['Compact Disc (CD/DVD)', 'Random Access Memory (RAM)', 'Central Processing Unit', 'Graphics Card'],
    correctAnswerIndex: 0,
    explanation: 'CDs and DVDs use laser light beams (optics) to read and write pits in the disc surface, making them optical storage devices.'
  },
  {
    id: 'cquiz-2',
    topic: 'security',
    difficulty: 'Intermediate',
    question: 'What is the safest practice when you receive an email asking for your password?',
    options: [
      'Reply immediately with your username only',
      'Never share your password, verify sender address, and report phishing',
      'Click the link to check if it looks legitimate',
      'Forward your password to your school friend'
    ],
    correctAnswerIndex: 1,
    explanation: 'Legitimate institutions never ask for your password via email. Any email requesting credentials is a phishing attempt.'
  },
  {
    id: 'cquiz-3',
    topic: 'office',
    difficulty: 'Beginner',
    question: 'In Microsoft Excel, every formula or calculation must begin with which character?',
    options: ['Plus sign (+)', 'Equals sign (=)', 'Colon (:)', 'Question mark (?)'],
    correctAnswerIndex: 1,
    explanation: 'Excel requires every formula (such as =SUM(A1:A5) or =B2*2) to begin with an equals sign (=) to know it is a calculation.'
  }
];

const DEFAULT_PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 'chall-1',
    title: 'The Shortcut Master Challenge',
    category: 'Keyboard Skills',
    task: 'Use Ctrl+C to copy text, Ctrl+V to paste, and Ctrl+Z to undo an accidental change.',
    expectedResult: 'You can duplicate sentences quickly without touching the mouse.',
    difficulty: 'Beginner'
  },
  {
    id: 'chall-2',
    title: 'Safe File Folder Organization',
    category: 'File Management',
    task: 'Create a main folder named "School Work", then create subfolders: "ICT", "Math", and "English". Save a test document inside.',
    expectedResult: 'Files are categorized neatly so you can find school assignments in seconds.',
    difficulty: 'Beginner'
  },
  {
    id: 'chall-3',
    title: 'Spreadsheet Grade Calculator',
    category: 'Microsoft Excel',
    task: 'Enter 5 student marks in cells B2 to B6. Write the formula =SUM(B2:B6) in B7 and =AVERAGE(B2:B6) in B8.',
    expectedResult: 'Excel automatically calculates the total marks and the class average score.',
    difficulty: 'Intermediate'
  }
];

const DEFAULT_STUDY_GOALS: StudyGoal[] = [
  {
    id: 'goal-1',
    title: 'Complete Lesson 1 to 4 on Computer Hardware',
    category: 'Hardware Basics',
    targetDate: 'End of week',
    completed: true
  },
  {
    id: 'goal-2',
    title: 'Score 100% on the 10-Question Random Practice Test',
    category: 'Quizzes',
    targetDate: 'Friday',
    completed: false
  },
  {
    id: 'goal-3',
    title: 'Master Microsoft Word formatting and print preview',
    category: 'Office Productivity',
    targetDate: 'Next week',
    completed: false
  }
];

const DEFAULT_PERSONAL_NOTES: PersonalNote[] = [
  {
    id: 'note-1',
    lessonId: 'lesson-4',
    lessonTitle: 'Hardware and Software Architecture',
    title: 'RAM vs SSD Analogy',
    content: 'RAM is the study desk where open books lie while working. SSD / Hard drive is the permanent bookshelf where books sleep when power is turned off.',
    date: 'Oct 2026'
  },
  {
    id: 'note-2',
    lessonId: 'lesson-16',
    lessonTitle: 'Cybersecurity & Phishing Defense',
    title: 'Password Rule to Remember',
    content: 'Always use at least 12 characters: combination of uppercase letters, lowercase, numbers, and symbols like # or !.',
    date: 'Oct 2026'
  }
];

const DEFAULT_ABOUT_INFO: AboutInfo = {
  heroTagline: 'About ICT Learning Hub',
  mainHeading: 'Democratizing Digital Skills for Every Learner',
  subDescription: 'We believe computer literacy should be accessible, friendly, and empowering—not intimidating or locked behind paywalls.',
  missionHeading: 'Our Core Mission',
  missionDescription: 'To provide pupils, secondary students, teachers, and adult beginners with free, high-quality, step-by-step ICT education. We replace dry textbooks with interactive diagrams, real-life examples, and instant feedback.',
  philosophyHeading: 'Our Educational Philosophy',
  philosophyDescription: 'No student should feel ashamed of not knowing where to click. We design from first principles: explain every technical acronym (RAM, CPU, URL), provide visual analogies, and ensure lessons relate to everyday life.',
  targetAudience: [
    {
      title: 'Primary & Secondary Pupils',
      description: 'Preparing for national examinations (like UNEB O-Level and A-Level ICT syllabus), typing school assignments, and mastering keyboards and mice.',
      iconEmoji: '🎒'
    },
    {
      title: 'Teachers & Instructors',
      description: 'Interactive classroom teaching aids, lab exercises, and ready-made multiple-choice quizzes for secondary school computer labs.',
      iconEmoji: '👩‍🏫'
    },
    {
      title: 'Adult Beginners & Job Seekers',
      description: 'Anyone wanting to acquire essential office productivity skills (Word, Excel spreadsheets, email etiquette, and safe online banking).',
      iconEmoji: '💼'
    }
  ]
};

const DEFAULT_ABOUT_MILESTONES = [
  {
    id: 'milestone-1',
    title: '100% Free & Open Access',
    description: 'No subscription fees, paywalls, or mandatory signups required to read lessons or practice quizzes.',
    iconEmoji: '🌟'
  },
  {
    id: 'milestone-2',
    title: 'Interactive Hands-On Laboratories',
    description: 'Visual workstations, hardware architecture exploration, and live file management simulators.',
    iconEmoji: '🔬'
  },
  {
    id: 'milestone-3',
    title: 'Locally Relevant Context',
    description: 'Real-life examples reflecting African and community school contexts alongside international standards.',
    iconEmoji: '🌍'
  }
];

const DEFAULT_CONTACT_INFO: ContactInfo = {
  organizationName: 'ICT Learning Hub Support & Lab Center',
  email: 'educators@ictlearninghub.org',
  phone: '+256 700 123456',
  address: 'Kampala, Uganda & Global Digital Education Network',
  responseTimeNote: 'Response time: Within 24-48 business hours'
};

const DEFAULT_CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'chan-1',
    title: 'Computer Lab Support Email',
    detail: 'support@ictlearninghub.org',
    description: 'For student questions, lesson feedback, or school computer lab setups.',
    iconName: 'mail'
  },
  {
    id: 'chan-2',
    title: 'Teacher Helpline & WhatsApp',
    detail: '+256 700 123456',
    description: 'Direct assistance for educators and classroom teachers during school hours.',
    iconName: 'phone'
  },
  {
    id: 'chan-3',
    title: 'East Africa Digital Education Center',
    detail: 'Kampala Innovation Village, Block B, Uganda',
    description: 'Physical coordination hub for community digital literacy initiatives.',
    iconName: 'map'
  }
];

const DEFAULT_SUBMITTED_INQUIRIES: SubmittedInquiry[] = [
  {
    id: 'inq-1',
    name: 'Sarah Kyomugisha',
    email: 'sarah.k@school.org',
    role: 'Teacher',
    topic: 'Computer Lab Setup',
    message: 'Can we install offline lesson packages for our secondary school computer lab?',
    date: 'Yesterday'
  }
];

interface ContentContextType {
  lessons: Lesson[];
  modules: Module[];
  glossaryTerms: GlossaryTerm[];
  faqs: FaqItem[];
  aboutInfo: AboutInfo;
  contactInfo: ContactInfo;
  sorterDevices: SorterDeviceItem[];
  homeAnnouncements: HomeAnnouncement[];
  customQuizQuestions: CustomQuizItem[];
  deletedQuestionIds: string[];
  practiceChallenges: PracticeChallenge[];
  studyGoals: StudyGoal[];
  personalNotes: PersonalNote[];
  aboutMilestones: { id: string; title: string; description: string; iconEmoji: string }[];
  contactChannels: ContactChannel[];
  submittedInquiries: SubmittedInquiry[];
  isEditMode: boolean;
  toggleEditMode: () => void;

  // Home Tab
  addHomeAnnouncement: (item: HomeAnnouncement) => void;
  deleteHomeAnnouncement: (id: string) => void;

  // Lessons Tab
  addLesson: (lesson: Lesson) => void;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;

  // Modules Tab
  addModule: (module: Module) => void;
  updateModule: (id: string, updates: Partial<Module>) => void;
  deleteModule: (id: string) => void;

  // Practice Tab
  addPracticeChallenge: (challenge: PracticeChallenge) => void;
  deletePracticeChallenge: (id: string) => void;
  addSorterDevice: (device: SorterDeviceItem) => void;
  deleteSorterDevice: (id: string) => void;

  // Quizzes Tab
  addCustomQuizQuestion: (question: CustomQuizItem) => void;
  updateCustomQuizQuestion: (id: string, updates: Partial<CustomQuizItem>) => void;
  deleteCustomQuizQuestion: (id: string) => void;
  deleteAnyQuizQuestion: (id: string) => void;

  // Dashboard Tab
  addStudyGoal: (goal: StudyGoal) => void;
  toggleStudyGoal: (id: string) => void;
  deleteStudyGoal: (id: string) => void;
  addPersonalNote: (note: PersonalNote) => void;
  deletePersonalNote: (id: string) => void;

  // Glossary Tab
  addGlossaryTerm: (term: GlossaryTerm) => void;
  updateGlossaryTerm: (id: string, updates: Partial<GlossaryTerm>) => void;
  deleteGlossaryTerm: (id: string) => void;

  // About Tab
  updateAboutInfo: (updates: Partial<AboutInfo>) => void;
  addAboutAudience: (item: { title: string; description: string; iconEmoji: string }) => void;
  deleteAboutAudience: (index: number) => void;
  addAboutMilestone: (item: { id: string; title: string; description: string; iconEmoji: string }) => void;
  deleteAboutMilestone: (id: string) => void;

  // Contact Tab
  updateContactInfo: (updates: Partial<ContactInfo>) => void;
  addFaq: (faq: FaqItem) => void;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  addContactChannel: (channel: ContactChannel) => void;
  deleteContactChannel: (id: string) => void;
  addSubmittedInquiry: (inquiry: SubmittedInquiry) => void;
  deleteSubmittedInquiry: (id: string) => void;

  // Reset & Backup
  resetToOriginalCurriculum: () => void;
  exportCurriculumJSON: () => string;
  importCurriculumJSON: (json: string) => boolean;
}

const STORAGE_KEYS = {
  LESSONS: 'ict_custom_lessons_v2',
  MODULES: 'ict_custom_modules_v2',
  GLOSSARY: 'ict_custom_glossary_v2',
  FAQS: 'ict_custom_faqs_v2',
  ABOUT: 'ict_custom_about_v2',
  ABOUT_MILESTONES: 'ict_custom_milestones_v2',
  CONTACT: 'ict_custom_contact_v2',
  CONTACT_CHANNELS: 'ict_custom_channels_v2',
  SUBMITTED_INQUIRIES: 'ict_custom_inquiries_v2',
  SORTER: 'ict_custom_sorter_v2',
  ANNOUNCEMENTS: 'ict_custom_announcements_v2',
  CUSTOM_QUIZ: 'ict_custom_quizzes_v2',
  DELETED_QUIZ_IDS: 'ict_deleted_quiz_ids_v2',
  PRACTICE_CHALLENGES: 'ict_custom_challenges_v2',
  STUDY_GOALS: 'ict_custom_goals_v2',
  PERSONAL_NOTES: 'ict_custom_notes_v2',
  EDIT_MODE: 'ict_edit_mode_active_v2'
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.EDIT_MODE) === 'true';
    } catch {
      return false;
    }
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LESSONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom lessons', e);
    }
    return LESSONS;
  });

  const [modules, setModules] = useState<Module[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODULES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom modules', e);
    }
    return MODULES;
  });

  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GLOSSARY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom glossary', e);
    }
    return GLOSSARY_TERMS;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom faqs', e);
    }
    return DEFAULT_FAQS;
  });

  const [aboutInfo, setAboutInfo] = useState<AboutInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ABOUT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom about', e);
    }
    return DEFAULT_ABOUT_INFO;
  });

  const [aboutMilestones, setAboutMilestones] = useState<{ id: string; title: string; description: string; iconEmoji: string }[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ABOUT_MILESTONES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom milestones', e);
    }
    return DEFAULT_ABOUT_MILESTONES;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom contact', e);
    }
    return DEFAULT_CONTACT_INFO;
  });

  const [contactChannels, setContactChannels] = useState<ContactChannel[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACT_CHANNELS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom channels', e);
    }
    return DEFAULT_CONTACT_CHANNELS;
  });

  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMITTED_INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load inquiries', e);
    }
    return DEFAULT_SUBMITTED_INQUIRIES;
  });

  const [sorterDevices, setSorterDevices] = useState<SorterDeviceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SORTER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom sorter', e);
    }
    return DEFAULT_SORTER_DEVICES;
  });

  const [homeAnnouncements, setHomeAnnouncements] = useState<HomeAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load announcements', e);
    }
    return DEFAULT_HOME_ANNOUNCEMENTS;
  });

  const [customQuizQuestions, setCustomQuizQuestions] = useState<CustomQuizItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_QUIZ);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load custom quizzes', e);
    }
    return DEFAULT_CUSTOM_QUIZ_QUESTIONS;
  });

  const [deletedQuestionIds, setDeletedQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DELETED_QUIZ_IDS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load deleted question ids', e);
    }
    return [];
  });

  const [practiceChallenges, setPracticeChallenges] = useState<PracticeChallenge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRACTICE_CHALLENGES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load challenges', e);
    }
    return DEFAULT_PRACTICE_CHALLENGES;
  });

  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDY_GOALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load goals', e);
    }
    return DEFAULT_STUDY_GOALS;
  });

  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_NOTES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load notes', e);
    }
    return DEFAULT_PERSONAL_NOTES;
  });

  // LocalStorage synchronizations
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.EDIT_MODE, isEditMode ? 'true' : 'false'); } catch {}
  }, [isEditMode]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons)); } catch {}
  }, [lessons]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules)); } catch {}
  }, [modules]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.GLOSSARY, JSON.stringify(glossaryTerms)); } catch {}
  }, [glossaryTerms]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs)); } catch {}
  }, [faqs]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(aboutInfo)); } catch {}
  }, [aboutInfo]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ABOUT_MILESTONES, JSON.stringify(aboutMilestones)); } catch {}
  }, [aboutMilestones]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contactInfo)); } catch {}
  }, [contactInfo]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CONTACT_CHANNELS, JSON.stringify(contactChannels)); } catch {}
  }, [contactChannels]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.SUBMITTED_INQUIRIES, JSON.stringify(submittedInquiries)); } catch {}
  }, [submittedInquiries]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.SORTER, JSON.stringify(sorterDevices)); } catch {}
  }, [sorterDevices]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(homeAnnouncements)); } catch {}
  }, [homeAnnouncements]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.CUSTOM_QUIZ, JSON.stringify(customQuizQuestions)); } catch {}
  }, [customQuizQuestions]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.DELETED_QUIZ_IDS, JSON.stringify(deletedQuestionIds)); } catch {}
  }, [deletedQuestionIds]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.PRACTICE_CHALLENGES, JSON.stringify(practiceChallenges)); } catch {}
  }, [practiceChallenges]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.STUDY_GOALS, JSON.stringify(studyGoals)); } catch {}
  }, [studyGoals]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEYS.PERSONAL_NOTES, JSON.stringify(personalNotes)); } catch {}
  }, [personalNotes]);

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  // Home Handlers
  const addHomeAnnouncement = (item: HomeAnnouncement) => {
    setHomeAnnouncements(prev => [item, ...prev]);
  };

  const deleteHomeAnnouncement = (id: string) => {
    setHomeAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // Lesson Handlers
  const addLesson = (newLesson: Lesson) => {
    setLessons(prev => {
      const order = prev.length + 1;
      const lessonWithOrder = { ...newLesson, order };
      return [...prev, lessonWithOrder];
    });

    setModules(prev =>
      prev.map(mod => {
        if (mod.id === newLesson.moduleId) {
          return {
            ...mod,
            lessonIds: [...mod.lessonIds, newLesson.id]
          };
        }
        return mod;
      })
    );
  };

  const updateLesson = (id: string, updates: Partial<Lesson>) => {
    setLessons(prev =>
      prev.map(l => (l.id === id ? { ...l, ...updates } : l))
    );
  };

  const deleteLesson = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id));
    setModules(prev =>
      prev.map(mod => ({
        ...mod,
        lessonIds: mod.lessonIds.filter(lId => lId !== id)
      }))
    );
  };

  // Module Handlers
  const addModule = (mod: Module) => {
    setModules(prev => [...prev, mod]);
  };

  const updateModule = (id: string, updates: Partial<Module>) => {
    setModules(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  };

  // Practice Challenges Handlers
  const addPracticeChallenge = (challenge: PracticeChallenge) => {
    setPracticeChallenges(prev => [challenge, ...prev]);
  };

  const deletePracticeChallenge = (id: string) => {
    setPracticeChallenges(prev => prev.filter(c => c.id !== id));
  };

  // Sorter Devices
  const addSorterDevice = (device: SorterDeviceItem) => {
    setSorterDevices(prev => [...prev, device]);
  };

  const deleteSorterDevice = (id: string) => {
    setSorterDevices(prev => prev.filter(d => d.id !== id));
  };

  // Quizzes Handlers
  const addCustomQuizQuestion = (question: CustomQuizItem) => {
    setCustomQuizQuestions(prev => [question, ...prev]);
  };

  const updateCustomQuizQuestion = (id: string, updates: Partial<CustomQuizItem>) => {
    setCustomQuizQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteCustomQuizQuestion = (id: string) => {
    setCustomQuizQuestions(prev => prev.filter(q => q.id !== id));
  };

  const deleteAnyQuizQuestion = (id: string) => {
    // Check if it's in custom questions
    setCustomQuizQuestions(prev => prev.filter(q => q.id !== id));
    // Also track in deleted IDs in case it was a default question from a lesson
    setDeletedQuestionIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  };

  // Dashboard & Study Goals
  const addStudyGoal = (goal: StudyGoal) => {
    setStudyGoals(prev => [goal, ...prev]);
  };

  const toggleStudyGoal = (id: string) => {
    setStudyGoals(prev =>
      prev.map(g => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const deleteStudyGoal = (id: string) => {
    setStudyGoals(prev => prev.filter(g => g.id !== id));
  };

  const addPersonalNote = (note: PersonalNote) => {
    setPersonalNotes(prev => [note, ...prev]);
  };

  const deletePersonalNote = (id: string) => {
    setPersonalNotes(prev => prev.filter(n => n.id !== id));
  };

  // Glossary Handlers
  const addGlossaryTerm = (term: GlossaryTerm) => {
    setGlossaryTerms(prev => [term, ...prev]);
  };

  const updateGlossaryTerm = (id: string, updates: Partial<GlossaryTerm>) => {
    setGlossaryTerms(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteGlossaryTerm = (id: string) => {
    setGlossaryTerms(prev => prev.filter(t => t.id !== id));
  };

  // About Handlers
  const updateAboutInfo = (updates: Partial<AboutInfo>) => {
    setAboutInfo(prev => ({ ...prev, ...updates }));
  };

  const addAboutAudience = (item: { title: string; description: string; iconEmoji: string }) => {
    setAboutInfo(prev => ({
      ...prev,
      targetAudience: [...prev.targetAudience, item]
    }));
  };

  const deleteAboutAudience = (indexToDelete: number) => {
    setAboutInfo(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.filter((_, idx) => idx !== indexToDelete)
    }));
  };

  const addAboutMilestone = (item: { id: string; title: string; description: string; iconEmoji: string }) => {
    setAboutMilestones(prev => [...prev, item]);
  };

  const deleteAboutMilestone = (id: string) => {
    setAboutMilestones(prev => prev.filter(m => m.id !== id));
  };

  // Contact & FAQ Handlers
  const updateContactInfo = (updates: Partial<ContactInfo>) => {
    setContactInfo(prev => ({ ...prev, ...updates }));
  };

  const addFaq = (faq: FaqItem) => {
    setFaqs(prev => [...prev, faq]);
  };

  const updateFaq = (id: string, updates: Partial<FaqItem>) => {
    setFaqs(prev =>
      prev.map(f => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const addContactChannel = (channel: ContactChannel) => {
    setContactChannels(prev => [...prev, channel]);
  };

  const deleteContactChannel = (id: string) => {
    setContactChannels(prev => prev.filter(c => c.id !== id));
  };

  const addSubmittedInquiry = (inquiry: SubmittedInquiry) => {
    setSubmittedInquiries(prev => [inquiry, ...prev]);
  };

  const deleteSubmittedInquiry = (id: string) => {
    setSubmittedInquiries(prev => prev.filter(i => i.id !== id));
  };

  // Reset to original curriculum
  const resetToOriginalCurriculum = () => {
    setLessons(LESSONS);
    setModules(MODULES);
    setGlossaryTerms(GLOSSARY_TERMS);
    setFaqs(DEFAULT_FAQS);
    setAboutInfo(DEFAULT_ABOUT_INFO);
    setAboutMilestones(DEFAULT_ABOUT_MILESTONES);
    setContactInfo(DEFAULT_CONTACT_INFO);
    setContactChannels(DEFAULT_CONTACT_CHANNELS);
    setSubmittedInquiries(DEFAULT_SUBMITTED_INQUIRIES);
    setSorterDevices(DEFAULT_SORTER_DEVICES);
    setHomeAnnouncements(DEFAULT_HOME_ANNOUNCEMENTS);
    setCustomQuizQuestions(DEFAULT_CUSTOM_QUIZ_QUESTIONS);
    setDeletedQuestionIds([]);
    setPracticeChallenges(DEFAULT_PRACTICE_CHALLENGES);
    setStudyGoals(DEFAULT_STUDY_GOALS);
    setPersonalNotes(DEFAULT_PERSONAL_NOTES);

    Object.values(STORAGE_KEYS).forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch {}
    });
  };

  // Export / Import
  const exportCurriculumJSON = () => {
    const data = {
      lessons,
      modules,
      glossaryTerms,
      faqs,
      aboutInfo,
      aboutMilestones,
      contactInfo,
      contactChannels,
      submittedInquiries,
      sorterDevices,
      homeAnnouncements,
      customQuizQuestions,
      practiceChallenges,
      studyGoals,
      personalNotes,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importCurriculumJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.lessons) setLessons(parsed.lessons);
      if (parsed.modules) setModules(parsed.modules);
      if (parsed.glossaryTerms) setGlossaryTerms(parsed.glossaryTerms);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.aboutInfo) setAboutInfo(parsed.aboutInfo);
      if (parsed.aboutMilestones) setAboutMilestones(parsed.aboutMilestones);
      if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
      if (parsed.contactChannels) setContactChannels(parsed.contactChannels);
      if (parsed.submittedInquiries) setSubmittedInquiries(parsed.submittedInquiries);
      if (parsed.sorterDevices) setSorterDevices(parsed.sorterDevices);
      if (parsed.homeAnnouncements) setHomeAnnouncements(parsed.homeAnnouncements);
      if (parsed.customQuizQuestions) setCustomQuizQuestions(parsed.customQuizQuestions);
      if (parsed.practiceChallenges) setPracticeChallenges(parsed.practiceChallenges);
      if (parsed.studyGoals) setStudyGoals(parsed.studyGoals);
      if (parsed.personalNotes) setPersonalNotes(parsed.personalNotes);
      return true;
    } catch (e) {
      console.error('Error importing curriculum JSON', e);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        lessons,
        modules,
        glossaryTerms,
        faqs,
        aboutInfo,
        aboutMilestones,
        contactInfo,
        contactChannels,
        submittedInquiries,
        sorterDevices,
        homeAnnouncements,
        customQuizQuestions,
        deletedQuestionIds,
        practiceChallenges,
        studyGoals,
        personalNotes,
        isEditMode,
        toggleEditMode,
        addHomeAnnouncement,
        deleteHomeAnnouncement,
        addLesson,
        updateLesson,
        deleteLesson,
        addModule,
        updateModule,
        deleteModule,
        addPracticeChallenge,
        deletePracticeChallenge,
        addSorterDevice,
        deleteSorterDevice,
        addCustomQuizQuestion,
        updateCustomQuizQuestion,
        deleteCustomQuizQuestion,
        deleteAnyQuizQuestion,
        addStudyGoal,
        toggleStudyGoal,
        deleteStudyGoal,
        addPersonalNote,
        deletePersonalNote,
        addGlossaryTerm,
        updateGlossaryTerm,
        deleteGlossaryTerm,
        updateAboutInfo,
        addAboutAudience,
        deleteAboutAudience,
        addAboutMilestone,
        deleteAboutMilestone,
        updateContactInfo,
        addFaq,
        updateFaq,
        deleteFaq,
        addContactChannel,
        deleteContactChannel,
        addSubmittedInquiry,
        deleteSubmittedInquiry,
        resetToOriginalCurriculum,
        exportCurriculumJSON,
        importCurriculumJSON
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
