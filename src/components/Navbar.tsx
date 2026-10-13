import React, { useState } from 'react';
import { 
  Laptop, 
  BookOpen, 
  Layers, 
  Award, 
  User, 
  HelpCircle, 
  Menu, 
  X, 
  Search,
  CheckCircle,
  Sparkles,
  BookMarked,
  Edit3,
  Check,
  RotateCcw
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useContent } from '../context/ContentContext';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, lessonId?: string) => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenAddLesson?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onOpenSearch,
  onOpenAddLesson
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { student } = useStudent();
  const { isEditMode, toggleEditMode, resetToOriginalCurriculum } = useContent();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Courses' },
    { id: 'practice', label: 'Practice' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'glossary', label: 'Glossary' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                ICT <span className="text-blue-600">Learning Hub</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-medium -mt-1 tracking-wider uppercase">
                Digital Skills for All
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id || (link.id === 'learn' && currentView === 'lesson');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Edit Mode Toggle Button */}
            <button
              onClick={toggleEditMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isEditMode
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs ring-2 ring-amber-300'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
              title={isEditMode ? 'Exit Edit Mode' : 'Enable Content Customization Mode to Add or Delete Information in Each Tab'}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'Editing Active' : 'Edit Tabs'}</span>
            </button>

            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search topics and terms (Ctrl+K)"
              aria-label="Search topics"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Student Profile / Login Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 transition-colors text-left text-xs"
            >
              <span className="text-base">{student.avatar || '👩‍🎓'}</span>
              <div className="hidden md:block leading-tight">
                <span className="font-bold text-slate-900 block truncate max-w-[110px]">
                  {student.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  {student.totalPoints} pts
                </span>
              </div>
            </button>
          </div>

          {/* Mobile menu hamburger toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Mode Notification Banner */}
      {isEditMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold shadow-inner border-t border-amber-600 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-slate-950 shrink-0" />
            <span>
              <strong>Content Editor Mode Active:</strong> You can now add, edit, or delete information in any tab. Changes are saved automatically.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onOpenAddLesson && (
              <button
                onClick={onOpenAddLesson}
                className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1"
              >
                + Add Lesson
              </button>
            )}
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all customized curriculum back to defaults?')) {
                  resetToOriginalCurriculum();
                }
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors flex items-center gap-1"
              title="Reset all lessons, terms, and FAQs to original version"
            >
              <RotateCcw className="w-3 h-3" /> Reset Defaults
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {/* Profile mini status in mobile menu */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{student.avatar || '👩‍🎓'}</span>
              <div>
                <span className="text-xs font-bold text-slate-900 block">{student.name}</span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {student.completedLessons.length} / 17 Lessons Completed · {student.totalPoints} Points
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Account
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentView === link.id || (link.id === 'learn' && currentView === 'lesson');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('learn')}
              className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-sm text-center"
            >
              Start Free ICT Lessons
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
