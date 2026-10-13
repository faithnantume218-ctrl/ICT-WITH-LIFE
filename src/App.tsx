import React, { useState, useEffect } from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { CertificateModal } from './components/CertificateModal';
import { LessonEditorModal } from './components/modals/LessonEditorModal';

// Views
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { LessonDetailView } from './views/LessonDetailView';
import { InteractivePracticeView } from './views/InteractivePracticeView';
import { QuizzesView } from './views/QuizzesView';
import { DashboardView } from './views/DashboardView';
import { GlossaryView } from './views/GlossaryView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';

// Toast Notification component
const AchievementToast: React.FC = () => {
  const { activeToast, dismissToast } = useStudent();

  if (!activeToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-bounce-short">
      <span className="text-2xl">{activeToast.icon || '🎉'}</span>
      <div className="flex-1">
        <h5 className="text-xs font-bold text-white">{activeToast.title}</h5>
        <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{activeToast.message}</p>
      </div>
      <button
        onClick={dismissToast}
        className="text-slate-400 hover:text-white text-xs p-1"
      >
        ✕
      </button>
    </div>
  );
};

const MainContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-1');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [certOpen, setCertOpen] = useState<boolean>(false);
  const [addLessonOpen, setAddLessonOpen] = useState<boolean>(false);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeLessonId]);

  // Global Ctrl+K keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: string, lessonId?: string) => {
    if (lessonId) {
      setActiveLessonId(lessonId);
      setCurrentView('lesson');
    } else {
      setCurrentView(view);
    }
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAddLesson={() => setAddLessonOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAuth={() => setAuthOpen(true)}
          />
        )}

        {currentView === 'learn' && (
          <LearnView
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentView === 'lesson' && (
          <LessonDetailView
            lessonId={activeLessonId}
            onNavigateBack={() => setCurrentView('learn')}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentView === 'practice' && (
          <InteractivePracticeView
            onNavigateToQuizzes={() => setCurrentView('quizzes')}
          />
        )}

        {currentView === 'quizzes' && (
          <QuizzesView
            onNavigateToLessons={() => setCurrentView('learn')}
            onNavigateToLesson={handleSelectLesson}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            onSelectLesson={handleSelectLesson}
            onOpenCertificate={() => setCertOpen(true)}
            onOpenAuth={() => setAuthOpen(true)}
          />
        )}

        {currentView === 'glossary' && (
          <GlossaryView />
        )}

        {currentView === 'about' && (
          <AboutView
            onStartLearning={() => setCurrentView('learn')}
          />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
        onSelectGlossary={() => {
          setCurrentView('glossary');
        }}
      />

      {/* Auth / Profile Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={certOpen}
        onClose={() => setCertOpen(false)}
      />

      {/* Add Lesson Modal */}
      <LessonEditorModal
        isOpen={addLessonOpen}
        onClose={() => setAddLessonOpen(false)}
        onSaved={id => {
          handleSelectLesson(id);
        }}
      />

      {/* Toast Milestone Feedback */}
      <AchievementToast />
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <StudentProvider>
        <MainContent />
      </StudentProvider>
    </ContentProvider>
  );
}
