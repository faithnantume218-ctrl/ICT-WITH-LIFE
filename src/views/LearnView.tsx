import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Laptop, 
  Cpu, 
  FolderTree, 
  FileSpreadsheet, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Plus,
  Trash2,
  Edit3
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useContent } from '../context/ContentContext';
import { Lesson } from '../types/ict';
import { LessonEditorModal } from '../components/modals/LessonEditorModal';
import { ModuleEditorModal } from '../components/modals/ModuleEditorModal';

interface LearnViewProps {
  onSelectLesson: (lessonId: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onSelectLesson }) => {
  const { student } = useStudent();
  const { lessons, modules, isEditMode, deleteLesson, deleteModule } = useContent();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');

  // Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.learningObjectives.some(obj => obj.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = 
      selectedDifficulty === 'all' || lesson.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    const matchesModule = 
      selectedModuleId === 'all' || lesson.moduleId === selectedModuleId;

    return matchesSearch && matchesDifficulty && matchesModule;
  });

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return Laptop;
      case 'Cpu': return Cpu;
      case 'FolderTree': return FolderTree;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'Globe': return Globe;
      case 'ShieldCheck': return ShieldCheck;
      default: return BookOpen;
    }
  };

  const handleOpenAdd = () => {
    setEditingLesson(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (lesson: Lesson, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingLesson(lesson);
    setIsEditorOpen(true);
  };

  const handleDelete = (lesson: Lesson, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete the lesson "${lesson.title}"?`)) {
      deleteLesson(lesson.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-300">
            Comprehensive Digital Curriculum · Customizable
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore All ICT Lessons & Courses
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            From basic hardware parts and mouse operations to Microsoft Excel formulas and cybersecurity defenses. You can add your own lessons, edit explanations, or delete topics anytime.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {student.completedLessons.length} of {lessons.length} Completed ({lessons.length > 0 ? Math.round((student.completedLessons.length / lessons.length) * 100) : 0}%)
            </span>
          </div>
        </div>

        {/* Action Buttons: Add Lesson and Add Module */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>+ Add Lesson</span>
          </button>
          <button
            onClick={() => setIsModuleModalOpen(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-blue-300" />
            <span>+ Add Course Module</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search topics, keywords, RAM, Excel..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Module Selector */}
          <select
            value={selectedModuleId}
            onChange={e => setSelectedModuleId(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Modules</option>
            {modules.map(m => (
              <option key={m.id} value={m.id}>
                {m.title}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['all', 'beginner', 'intermediate'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedDifficulty(lvl)}
                className={`px-3 py-1 font-semibold rounded-lg capitalize transition-colors ${
                  selectedDifficulty === lvl
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lesson</span>
          </button>
        </div>
      </div>

      {/* Modules & Lessons Grid */}
      <div className="space-y-12">
        {modules.map(module => {
          if (selectedModuleId !== 'all' && selectedModuleId !== module.id) return null;

          const moduleLessons = filteredLessons.filter(l => l.moduleId === module.id);
          if (moduleLessons.length === 0) return null;

          const IconComponent = getModuleIcon(module.iconName);
          const completedInModule = moduleLessons.filter(l => student.completedLessons.includes(l.id)).length;
          const totalInModule = moduleLessons.length;

          return (
            <div key={module.id} className="space-y-4">
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{module.title}</h2>
                    <p className="text-xs text-slate-500">{module.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {completedInModule} / {totalInModule} Done
                  </span>
                  <span>~{module.estimatedHours} Hours</span>
                </div>
              </div>

              {/* Lesson Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {moduleLessons.map(lesson => {
                  const isDone = student.completedLessons.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`cursor-pointer rounded-2xl border p-5 transition-all shadow-xs hover:shadow-md flex flex-col justify-between group relative ${
                        isDone
                          ? 'bg-emerald-50/20 border-emerald-200 hover:border-emerald-400'
                          : 'bg-white border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="font-mono text-slate-400 font-semibold">
                            Lesson {lesson.order}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {isDone && (
                              <span className="text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 text-[11px]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Done
                              </span>
                            )}
                            <span className="text-slate-500 text-[11px] font-medium bg-slate-100 px-2 py-0.5 rounded">
                              {lesson.difficulty}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {lesson.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-2">
                          {lesson.shortDescription}
                        </p>
                      </div>

                      {/* Card Footer with Start & Edit/Delete Controls */}
                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} mins
                        </span>

                        <div className="flex items-center gap-1">
                          {/* Quick Edit & Delete buttons */}
                          <button
                            onClick={e => handleOpenEdit(lesson, e)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit this lesson"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={e => handleDelete(lesson, e)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                            title="Delete this lesson"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 ml-2">
                            {isDone ? 'Review' : 'Start'}
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredLessons.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching lessons found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any lessons matching &quot;{searchQuery}&quot;. You can add your own lesson with the button below!
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              + Create Your Own Lesson
            </button>
          </div>
        )}
      </div>

      {/* Lesson Editor Modal */}
      <LessonEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        lessonToEdit={editingLesson}
        onSaved={id => {
          onSelectLesson(id);
        }}
      />

      {/* Module Editor Modal */}
      <ModuleEditorModal
        isOpen={isModuleModalOpen}
        onClose={() => setIsModuleModalOpen(false)}
      />
    </div>
  );
};
