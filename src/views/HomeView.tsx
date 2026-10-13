import React, { useState } from 'react';
import { 
  Laptop, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Cpu, 
  FileText, 
  FileSpreadsheet, 
  Globe, 
  Play, 
  FolderTree, 
  Users, 
  BookOpen, 
  HelpCircle,
  Lightbulb,
  Clock,
  Compass,
  Plus,
  Trash2,
  Megaphone
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useContent } from '../context/ContentContext';
import { AnnouncementModal } from '../components/modals/AnnouncementModal';

interface HomeViewProps {
  onNavigate: (view: string, lessonId?: string) => void;
  onOpenAuth: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { student } = useStudent();
  const { lessons, homeAnnouncements, deleteHomeAnnouncement } = useContent();
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const featuredCourses = [
    {
      id: 'lesson-1',
      title: 'Computer Basics & Introduction',
      description: 'Understand what ICT is, how computers work, and how they transform schools, healthcare, and business.',
      icon: Laptop,
      level: 'Beginner',
      duration: '15 mins',
      color: 'blue'
    },
    {
      id: 'lesson-4',
      title: 'Hardware and Software Architecture',
      description: 'Explore the Motherboard, CPU, RAM, and Storage SSDs with interactive internal circuit diagrams.',
      icon: Cpu,
      level: 'Beginner',
      duration: '22 mins',
      color: 'emerald'
    },
    {
      id: 'lesson-10',
      title: 'Microsoft Word Essentials',
      description: 'Master typing, the Ribbon toolbar, fonts, margins, paragraph alignment, and exporting clean PDF documents.',
      icon: FileText,
      level: 'Intermediate',
      duration: '25 mins',
      color: 'indigo'
    },
    {
      id: 'lesson-11',
      title: 'Microsoft Excel Basics',
      description: 'Learn spreadsheet grids, cell addresses (A1, B5), and write dynamic formulas like =SUM() and =AVERAGE().',
      icon: FileSpreadsheet,
      level: 'Intermediate',
      duration: '25 mins',
      color: 'teal'
    },
    {
      id: 'lesson-13',
      title: 'Internet & Web Browsing',
      description: 'Navigate the World Wide Web safely with Chrome and Edge, understand URLs, and master smart search techniques.',
      icon: Globe,
      level: 'Beginner',
      duration: '22 mins',
      color: 'sky'
    },
    {
      id: 'lesson-16',
      title: 'Cybersecurity & Phishing Defense',
      description: 'Build unbreakable passwords, recognize fake phishing emails, and defend against computer viruses.',
      icon: ShieldCheck,
      level: 'Intermediate',
      duration: '25 mins',
      color: 'rose'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Digital Literacy Platform · 100% Free</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Learn ICT the <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Easy Way</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Discover the world of Information and Communication Technology through clear, beginner-friendly lessons, interactive computer diagrams, and hands-on practice. Perfect for primary & secondary school students, teachers, and anyone building digital confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('learn')}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('practice')}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
                <span>Test Interactive Labs</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 text-xs text-slate-600">
              <div>
                <span className="font-extrabold text-lg text-slate-900 block">{lessons.length} Lessons</span>
                <span>Active curriculum</span>
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900 block">{lessons.reduce((acc, l) => acc + l.quiz.length, 0)}+ Quizzes</span>
                <span>Instant explanations</span>
              </div>
              <div>
                <span className="font-extrabold text-lg text-slate-900 block">Customizable</span>
                <span>Edit & add content</span>
              </div>
            </div>
          </div>

          {/* Hero Illustration: Interactive Workstation Art */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-linear-to-b from-blue-600 to-indigo-700 rounded-3xl p-7 text-white shadow-2xl overflow-hidden border border-blue-400/30">
              {/* Background circular glow */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-blue-200">Desktop Terminal v1.0</span>
                </div>

                {/* Workstation Screen Card */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-blue-400/20 shadow-inner space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                    <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                      <Laptop className="w-4 h-4" /> ICT Learning Hub
                    </span>
                    <span className="font-mono text-emerald-400">● Live Student Mode</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Learner:</span>
                      <span className="font-bold text-white">{student.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Current Milestone:</span>
                      <span className="text-amber-300 font-medium">Digital Literacy</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Progress:</span>
                      <span className="font-bold text-emerald-400">
                        {lessons.length > 0 ? Math.round((student.completedLessons.length / lessons.length) * 100) : 0}% Complete
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${lessons.length > 0 ? Math.max(12, (student.completedLessons.length / lessons.length) * 100) : 0}%` }}
                    />
                  </div>
                </div>

                {/* Interactive Hotspot Feature list */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Real-Life Examples</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Interactive Simulators</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Instant Quiz Feedback</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Printable Certificate</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-2.5 bg-white text-blue-900 font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors shadow text-center"
                >
                  View My Student Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Curriculum Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Popular ICT Courses & Modules
            </h2>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
          >
            <span>View All 17 Lessons</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => {
            const Icon = course.icon;
            const isCompleted = student.completedLessons.includes(course.id);
            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {isCompleted && (
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>{course.level}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('lesson', course.id)}
                    className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Start Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Announcements & Noticeboard Section with Add and Delete capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <Megaphone className="w-3.5 h-3.5" />
                <span>Noticeboard & Updates · Fully Customizable</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                ICT Announcements & Learning Tips
              </h2>
              <p className="text-xs text-slate-500">
                Teachers and learners can post new school announcements, revision tips, or computer lab notices, and delete them anytime.
              </p>
            </div>

            <button
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Announcement / Info</span>
            </button>
          </div>

          {homeAnnouncements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {homeAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-200 transition-all flex flex-col justify-between group shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                            {item.badge}
                          </span>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete the announcement "${item.title}"?`)) {
                              deleteHomeAnnouncement(item.id);
                            }
                          }}
                          className="opacity-60 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                          title="Delete this announcement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.date}</span>
                    <span className="text-blue-600 font-medium">ICT Learning Hub</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400 italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              No announcements yet. Click "+ Add Announcement / Info" above to post your own information to this tab!
            </div>
          )}
        </div>
      </section>

      {/* How it works section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Simple 3-Step Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How the Learning Platform Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We break down complex technical jargon into clear, practical concepts you can apply right away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Choose a Topic</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Browse our 17 organized lessons—from computer hardware and mouse operations to Microsoft Office formulas and internet safety.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Learn with Visuals & Labs</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Interact with labeled computer diagrams, drag-and-drop hardware sorters, and live Office sandboxes with everyday relatable examples.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Test Knowledge & Earn Badges</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Answer 5 multiple-choice questions per lesson with immediate explanations. Track points, unlock badges, and print your completion certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Learn With Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Built for Beginners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Learn With ICT Learning Hub?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Many computer courses use intimidating jargon or assume you already know technical words. We start from ground zero with crystal-clear English and everyday analogies.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Simple Everyday Language</h4>
                  <p className="text-[11px] text-slate-600">Zero unnecessary complexity. Every technical term is explained with simple analogies.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Contextual Real-Life Examples</h4>
                  <p className="text-[11px] text-slate-600">Practical examples from schools, mobile money, clinics, and communities in Uganda and Africa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Interactive Quizzes & Instant Feedback</h4>
                  <p className="text-[11px] text-slate-600">Learn immediately why an answer is right or wrong without waiting for teacher grading.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Continuous Progress & Gamification</h4>
                  <p className="text-[11px] text-slate-600">Earn points, unlock achievement badges, maintain streaks, and celebrate each milestone.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Practice Banner */}
          <div className="lg:col-span-7 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-slate-800">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono border border-blue-400/30">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Interactive Practice Center
              </div>

              <h3 className="text-2xl font-bold text-white">
                Test Your ICT Knowledge Today
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ready to assess what you already know? Take our 10-Question Random Practice Assessment Test. Pick between Beginner, Intermediate, and Advanced questions.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                  <span className="text-xs font-bold text-blue-400 block">Beginner</span>
                  <span className="text-[10px] text-slate-400">Parts, Mouse & Files</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                  <span className="text-xs font-bold text-emerald-400 block">Intermediate</span>
                  <span className="text-[10px] text-slate-400">Office & Networks</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center col-span-2 sm:col-span-1">
                  <span className="text-xs font-bold text-rose-400 block">Advanced</span>
                  <span className="text-[10px] text-slate-400">Cybersecurity & Safety</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('quizzes')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Start Practice Test</span>
                </button>
                <button
                  onClick={() => onNavigate('practice')}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors border border-white/20"
                >
                  Explore Interactive Labs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
      />
    </div>
  );
};
