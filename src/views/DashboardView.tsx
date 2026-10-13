import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles, 
  Printer, 
  ArrowRight, 
  User, 
  RotateCcw, 
  TrendingUp,
  Cpu,
  ShieldCheck,
  FolderTree,
  FileSpreadsheet,
  Globe,
  Share2
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useContent } from '../context/ContentContext';
import { BADGES } from '../data/badgesData';

interface DashboardViewProps {
  onSelectLesson: (lessonId: string) => void;
  onOpenCertificate: () => void;
  onOpenAuth: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectLesson,
  onOpenCertificate,
  onOpenAuth,
}) => {
  const { student, resetAllProgress } = useStudent();
  const { lessons, modules, exportCurriculumJSON, resetToOriginalCurriculum } = useContent();

  const totalLessons = lessons.length;
  const completedCount = student.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find recommended next lesson
  const nextLesson = lessons.find(l => !student.completedLessons.includes(l.id)) || lessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Student Profile Welcome Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-inner">
            {student.avatar || '👩‍🎓'}
          </div>
          <div>
            <span className="text-xs font-mono text-blue-300 uppercase tracking-widest block">
              Student Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {student.name}!
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              {student.schoolOrCity} · Member since {student.joinedDate}
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCertificate}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>View Certificate</span>
          </button>

          <button
            onClick={onOpenAuth}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all"
            title="Edit Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Lessons */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Lessons Done</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {completedCount} <span className="text-xs font-normal text-slate-400">/ {totalLessons}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Overall Completion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Course Progress</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
            {progressPercent}%
          </div>
          <p className="text-[11px] text-slate-500 truncate">
            {totalLessons - completedCount} lessons remaining
          </p>
        </div>

        {/* Total Points */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Points</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {student.totalPoints} <span className="text-xs font-normal text-slate-400">PTS</span>
          </div>
          <p className="text-[11px] text-amber-600 font-medium">
            +50 per lesson · +10 per quiz mark
          </p>
        </div>

        {/* Streak & Badges */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Badges Unlocked</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-700">
            {student.unlockedBadgeIds.length} <span className="text-xs font-normal text-slate-400">/ {BADGES.length}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-orange-600 font-medium">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{student.streakDays} Day Study Streak</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Lesson Card */}
      {completedCount < totalLessons && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Recommended Next Step
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Lesson {nextLesson.order}: {nextLesson.title}
            </h3>
            <p className="text-xs text-slate-600">
              {nextLesson.moduleName} · {nextLesson.estimatedMinutes} mins · {nextLesson.difficulty}
            </p>
          </div>

          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Start Next Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Module Progress Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900">
          Module Progress Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODULES.map(module => {
            const completedInMod = module.lessonIds.filter(id => student.completedLessons.includes(id)).length;
            const totalInMod = module.lessonIds.length;
            const modPercent = Math.round((completedInMod / totalInMod) * 100);

            return (
              <div
                key={module.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{module.title}</span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {completedInMod}/{totalInMod} ({modPercent}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      modPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${modPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges and Achievements Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Achievement Badges
            </h3>
            <p className="text-xs text-slate-500">Earn badges as you master key ICT curriculum milestones</p>
          </div>
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
            {student.unlockedBadgeIds.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = student.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                    : 'bg-slate-50/50 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                      isUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-400'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      +{badge.pointsReward} PTS
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">
                    {badge.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] font-bold">
                  {isUnlocked ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-slate-400">Locked Milestone</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Quiz Scores */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Recent Quiz Results
        </h3>

        {student.quizRecords.length > 0 ? (
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {student.quizRecords.slice(0, 5).map((q, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-white hover:bg-slate-50">
                <div>
                  <span className="font-bold text-slate-900 block">{q.quizTitle}</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {q.completedAt} · {q.level}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`font-mono font-bold text-sm ${
                    q.percentage >= 80 ? 'text-emerald-600' : q.percentage >= 60 ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    {q.score} / {q.total} ({q.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 italic text-center">
            No quiz records yet. Take a quiz after any lesson or in the Practice section!
          </p>
        )}
      </div>
    </div>
  );
};
