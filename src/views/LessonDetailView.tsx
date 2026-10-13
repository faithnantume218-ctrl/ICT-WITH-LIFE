import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Award, 
  Lightbulb, 
  Compass, 
  Share2, 
  Printer, 
  XCircle,
  AlertCircle,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';
import { Lesson, QuizQuestion } from '../types/ict';
import { useStudent } from '../context/StudentContext';
import { useContent } from '../context/ContentContext';
import { LessonEditorModal } from '../components/modals/LessonEditorModal';
import { NoteModal } from '../components/modals/NoteModal';

// Import the interactive widgets
import { ComputerPartsExplorer } from '../components/widgets/ComputerPartsExplorer';
import { HardwareArchitectureViewer } from '../components/widgets/HardwareArchitectureViewer';
import { InputOutputSorter } from '../components/widgets/InputOutputSorter';
import { FileExplorerSimulator } from '../components/widgets/FileExplorerSimulator';
import { OfficeRibbonSimulator } from '../components/widgets/OfficeRibbonSimulator';
import { PhishingDetectorSimulator } from '../components/widgets/PhishingDetectorSimulator';

interface LessonDetailViewProps {
  lessonId: string;
  onNavigateBack: () => void;
  onSelectLesson: (nextId: string) => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lessonId,
  onNavigateBack,
  onSelectLesson,
}) => {
  const { student, markLessonCompleted, recordQuizScore } = useStudent();
  const { lessons, deleteLesson, personalNotes, deletePersonalNote } = useContent();
  const lesson = lessons.find(l => l.id === lessonId) || lessons[0] || ({} as Lesson);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const lessonNotes = personalNotes.filter(n => n.lessonId === lesson.id);

  const isCompleted = student.completedLessons.includes(lesson.id);

  // Quiz state for this lesson
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const currentIndex = lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleGradeQuiz = () => {
    let score = 0;
    lesson.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        score++;
      }
    });

    setQuizScore(score);
    setSubmittedQuiz(true);

    // Record score in student state
    recordQuizScore({
      quizId: lesson.id,
      quizTitle: `${lesson.title} Quiz`,
      score,
      total: lesson.quiz.length,
      percentage: Math.round((score / lesson.quiz.length) * 100),
      level: lesson.difficulty,
    });
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
    setQuizScore(null);
  };

  const renderInteractiveWidget = () => {
    switch (lesson.interactiveWidgetType) {
      case 'computer-parts':
        return <ComputerPartsExplorer />;
      case 'hardware-components':
        return <HardwareArchitectureViewer />;
      case 'input-output-devices':
        return <InputOutputSorter />;
      case 'file-folders':
      case 'operating-systems':
        return <FileExplorerSimulator />;
      case 'word-ribbon':
      case 'excel-grid':
      case 'powerpoint-slides':
        return <OfficeRibbonSimulator />;
      case 'cyber-phishing':
      case 'digital-safety':
        return <PhishingDetectorSimulator />;
      default:
        return <ComputerPartsExplorer />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Lessons
        </button>

        <div className="flex items-center gap-2">
          {/* Edit & Delete Action Buttons */}
          <button
            onClick={() => setIsEditorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold border border-blue-200 transition-colors"
            title="Edit this lesson content"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Lesson</span>
          </button>
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to delete the lesson "${lesson.title}"?`)) {
                deleteLesson(lesson.id);
                onNavigateBack();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold border border-rose-200 transition-colors"
            title="Delete this lesson"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>

          <span className="font-medium text-slate-600 hidden sm:inline">
            {lesson.moduleName} · Lesson {lesson.order} of {lessons.length}
          </span>
          {isCompleted && (
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
            </span>
          )}
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            {lesson.moduleName}
          </span>
          <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
            {lesson.difficulty}
          </span>
          <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} mins read
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {lesson.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {lesson.introduction}
        </p>

        {/* Learning Objectives checklist */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 mt-4">
          <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Learning Objectives for This Lesson:
          </h4>
          <ul className="space-y-2 text-xs text-blue-950">
            {lesson.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Concepts Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Core Explanations & Practical Concepts
        </h2>

        <div className="space-y-4">
          {lesson.keyConcepts.map((concept, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3"
            >
              <h3 className="text-base font-bold text-slate-900">
                {concept.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {concept.content}
              </p>

              {concept.analogy && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Simple Analogy:</span>
                    <p className="mt-0.5 text-amber-800">{concept.analogy}</p>
                  </div>
                </div>
              )}

              {concept.subPoints && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1.5">
                  {concept.subPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Real-Life Contextual Example */}
      <section className="bg-linear-to-r from-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          Real-Life Application & Community Context
        </div>
        <h3 className="text-lg font-bold text-white">
          {lesson.realLifeExample.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {lesson.realLifeExample.scenario}
        </p>
        <div className="pt-2 text-xs font-semibold text-emerald-300 border-t border-slate-800 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
          <span>Takeaway: {lesson.realLifeExample.lessonTakeaway}</span>
        </div>
      </section>

      {/* Interactive Visual Widget Lab */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Interactive Visual Learning Lab
        </h2>
        {renderInteractiveWidget()}
      </section>

      {/* Hands-on Practical Task */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          <Award className="w-4 h-4 text-indigo-600" />
          Hands-On Practical Activity
        </div>

        <h3 className="text-base font-bold text-slate-900">
          {lesson.practicalActivity.title}
        </h3>

        <div className="space-y-2 text-xs text-slate-700">
          <span className="font-bold text-slate-900 block">Step-by-Step Instructions:</span>
          <ol className="list-decimal list-inside space-y-1.5 pl-1">
            {lesson.practicalActivity.instructions.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
          <span className="font-semibold text-slate-700 block">Expected Result:</span>
          <p className="text-slate-600">{lesson.practicalActivity.expectedResult}</p>
          {lesson.practicalActivity.tip && (
            <p className="text-indigo-700 font-medium pt-1">💡 Teacher Tip: {lesson.practicalActivity.tip}</p>
          )}
        </div>
      </section>

      {/* Summary Key Points */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Summary of Key Points
        </h3>
        <ul className="space-y-2 text-xs text-slate-700">
          {lesson.summaryPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive 5-Question Quiz */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
              Knowledge Check
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              5-Question Interactive Lesson Quiz
            </h3>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Answer all 5 questions for instant feedback & points!
          </div>
        </div>

        {/* Quiz questions list */}
        <div className="space-y-6">
          {lesson.quiz.map((q, qIndex) => {
            const chosenOption = selectedAnswers[q.id];
            const isAnswered = chosenOption !== undefined;
            const isCorrect = chosenOption === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    <span className="font-mono text-blue-600 mr-1.5">Q{qIndex + 1}.</span>
                    {q.question}
                  </h4>
                  {submittedQuiz && (
                    isCorrect ? (
                      <span className="text-emerald-700 bg-emerald-100 text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-700 bg-rose-100 text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1 shrink-0">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )
                  )}
                </div>

                {/* 4 Options */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosenOption === optIndex;
                    let optionStyle = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';

                    if (submittedQuiz) {
                      if (optIndex === q.correctAnswerIndex) {
                        optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-300 text-rose-950 line-through';
                      } else {
                        optionStyle = 'bg-white border-slate-200 opacity-60 text-slate-600';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold ring-1 ring-blue-500';
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={submittedQuiz}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {submittedQuiz && optIndex === q.correctAnswerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card shown after submit */}
                {submittedQuiz && (
                  <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Explanation:</span>
                      <p className="mt-0.5 text-slate-600">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Retake Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!submittedQuiz ? (
            <button
              onClick={handleGradeQuiz}
              disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Submit Quiz ({Object.keys(selectedAnswers).length} / {lesson.quiz.length} Answered)
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3 w-full justify-between">
              <div className="text-xs">
                <span className="font-bold text-slate-900 text-sm">
                  You scored {quizScore} out of {lesson.quiz.length} ({Math.round(((quizScore || 0) / lesson.quiz.length) * 100)}%)!
                </span>
                <span className="text-slate-500 block">
                  {(quizScore || 0) >= 4 ? 'Great job! You grasped the material.' : 'Review the explanations and try again to improve.'}
                </span>
              </div>
              <button
                onClick={handleRetakeQuiz}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Revision Discussion Questions */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          Revision & Class Discussion Questions
        </h3>
        <p className="text-xs text-slate-500">
          Take a moment to answer these in your exercise book or discuss them with a classmate:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700 pl-1 pt-1">
          {lesson.revisionQuestions.map((rev, idx) => (
            <li key={idx} className="leading-relaxed font-medium">{rev}</li>
          ))}
        </ol>
      </section>

      {/* My Personal Lesson Notes & Key Points (Add & Delete) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              My Study Notes & Personal Key Points
            </h3>
            <p className="text-xs text-slate-500">
              Add your own key takeaways, mnemonics, or revision reminders for this lesson.
            </p>
          </div>
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Note to Lesson</span>
          </button>
        </div>

        {lessonNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lessonNotes.map(note => (
              <div
                key={note.id}
                className="p-4 rounded-xl border border-slate-200 bg-amber-50/30 hover:bg-amber-50/60 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">{note.title}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete note "${note.title}"?`)) {
                          deletePersonalNote(note.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 opacity-70 group-hover:opacity-100 transition-colors"
                      title="Delete this note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-200/50 text-[10px] text-slate-400 font-mono">
                  Saved: {note.date}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
            No personal notes added for this lesson yet. Click "+ Add Note to Lesson" to jot down your own key points!
          </div>
        )}
      </section>

      {/* Mark As Completed Primary Action Banner */}
      <div className="bg-linear-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-xs font-mono text-blue-300 uppercase tracking-wider">Lesson Progress</span>
          <h3 className="text-lg font-bold text-white mt-0.5">
            {isCompleted ? '✓ You have completed this lesson!' : 'Finished studying this topic?'}
          </h3>
          <p className="text-xs text-blue-200 mt-0.5">
            {isCompleted
              ? 'Your progress and 50 points are securely recorded in your dashboard.'
              : 'Click below to earn 50 ICT points, track your streak, and unlock badges.'}
          </p>
        </div>

        {!isCompleted ? (
          <button
            onClick={() => markLessonCompleted(lesson.id)}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4 text-slate-950" />
            <span>Mark as Completed (+50 Pts)</span>
          </button>
        ) : (
          <div className="px-4 py-2 bg-emerald-950/80 text-emerald-300 font-bold text-xs rounded-xl border border-emerald-700/60 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Previous / Next Lesson Navigation footer */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="text-left group flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] text-slate-400 block font-normal">Previous Lesson</span>
              <span className="truncate max-w-[150px] sm:max-w-xs block font-bold text-slate-800 group-hover:text-blue-600">
                {prevLesson.title}
              </span>
            </div>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="text-right group flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 ml-auto"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-normal">Next Lesson</span>
              <span className="truncate max-w-[150px] sm:max-w-xs block font-bold text-slate-800 group-hover:text-blue-600">
                {nextLesson.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={onNavigateBack}
            className="text-right group flex items-center gap-2 text-xs font-bold text-blue-600"
          >
            <span>Finish All Lessons</span>
            <Award className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Lesson Editor Modal */}
      <LessonEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        lessonToEdit={lesson}
        onSaved={id => {
          onSelectLesson(id);
        }}
      />

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        defaultLessonId={lesson.id}
        defaultLessonTitle={lesson.title}
      />
    </div>
  );
};
