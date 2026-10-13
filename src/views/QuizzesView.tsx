import React, { useState, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  BookOpen, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter
} from 'lucide-react';
import { QuizQuestion, DifficultyLevel, CustomQuizItem } from '../types/ict';
import { useStudent } from '../context/StudentContext';
import { useContent } from '../context/ContentContext';
import { QuizQuestionModal } from '../components/modals/QuizQuestionModal';

interface QuizzesViewProps {
  onNavigateToLessons: () => void;
  onNavigateToLesson: (lessonId: string) => void;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({ 
  onNavigateToLessons,
  onNavigateToLesson 
}) => {
  const { recordQuizScore } = useStudent();
  const { lessons, customQuizQuestions, deletedQuestionIds, deleteAnyQuizQuestion } = useContent();

  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('Beginner');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [quizMode, setQuizMode] = useState<'idle' | 'taking' | 'completed'>('idle');
  const [activeSubTab, setActiveSubTab] = useState<'test' | 'manage'>('test');

  // Question search for manage tab
  const [searchQuery, setSearchQuery] = useState('');
  const [manageTopic, setManageTopic] = useState('all');

  // Modals
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<CustomQuizItem | null>(null);

  // Active quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // Pool of comprehensive questions across lessons + custom questions, minus deleted ones
  const allAvailableQuestions = useMemo(() => {
    let pool: {
      question: QuizQuestion;
      lessonId: string;
      lessonTitle: string;
      topic: string;
      difficulty: DifficultyLevel;
      isCustom?: boolean;
    }[] = [];

    // Lessons default questions
    lessons.forEach(l => {
      let topic = 'basics';
      if (['lesson-4', 'lesson-5', 'lesson-6'].includes(l.id)) topic = 'hardware';
      else if (['lesson-10', 'lesson-11', 'lesson-12'].includes(l.id)) topic = 'office';
      else if (['lesson-13', 'lesson-14', 'lesson-15'].includes(l.id)) topic = 'internet';
      else if (['lesson-16', 'lesson-17'].includes(l.id)) topic = 'security';

      l.quiz.forEach(q => {
        if (!deletedQuestionIds.includes(q.id)) {
          pool.push({
            question: q,
            lessonId: l.id,
            lessonTitle: l.title,
            topic,
            difficulty: l.difficulty
          });
        }
      });
    });

    // Custom questions
    customQuizQuestions.forEach(cq => {
      if (!deletedQuestionIds.includes(cq.id)) {
        pool.push({
          question: {
            id: cq.id,
            question: cq.question,
            options: cq.options,
            correctAnswerIndex: cq.correctAnswerIndex,
            explanation: cq.explanation
          },
          lessonId: 'custom',
          lessonTitle: 'Custom Question Bank',
          topic: cq.topic,
          difficulty: cq.difficulty,
          isCustom: true
        });
      }
    });

    return pool;
  }, [lessons, customQuizQuestions, deletedQuestionIds]);

  const filteredManageQuestions = useMemo(() => {
    return allAvailableQuestions.filter(item => {
      const matchesSearch = 
        item.question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.question.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.question.options.some(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic = manageTopic === 'all' || item.topic === manageTopic;

      return matchesSearch && matchesTopic;
    });
  }, [allAvailableQuestions, searchQuery, manageTopic]);

  const startQuiz = (isRandom10: boolean) => {
    let pool = [...allAvailableQuestions];

    // Filter by topic if not 'all'
    if (selectedTopic !== 'all') {
      pool = pool.filter(p => p.topic === selectedTopic);
    }

    // Filter by difficulty if pool has enough
    const diffPool = pool.filter(p => p.difficulty === selectedDifficulty);
    if (diffPool.length >= 5) {
      pool = diffPool;
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const count = isRandom10 ? Math.min(10, shuffled.length) : Math.min(10, shuffled.length);
    const chosen = shuffled.slice(0, Math.max(1, count)).map(p => p.question);

    setQuestions(chosen);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setQuizMode('taking');
  };

  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    recordQuizScore({
      quizId: `practice-${Date.now()}`,
      quizTitle: `${selectedDifficulty} Practice Assessment`,
      score: correctCount,
      total: questions.length,
      percentage,
      level: selectedDifficulty,
    });

    setQuizMode('completed');
  };

  const calculateFinalScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleOpenAddQuestion = () => {
    setQuestionToEdit(null);
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (item: typeof allAvailableQuestions[0]) => {
    setQuestionToEdit({
      id: item.question.id,
      question: item.question.question,
      options: item.question.options,
      correctAnswerIndex: item.question.correctAnswerIndex,
      explanation: item.question.explanation,
      topic: item.topic,
      difficulty: item.difficulty
    });
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = (item: typeof allAvailableQuestions[0]) => {
    if (confirm(`Are you sure you want to delete this question: "${item.question.question.slice(0, 50)}..."?`)) {
      deleteAnyQuizQuestion(item.question.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {quizMode === 'idle' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono border border-blue-400/30">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                Evaluation & Question Bank · Customizable
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Test Your ICT Knowledge
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Challenge yourself with practice assessments, review answer explanations, or add custom multiple-choice questions to the curriculum question bank.
              </p>
            </div>

            <button
              onClick={handleOpenAddQuestion}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>+ Add Quiz Question</span>
            </button>
          </div>

          {/* Sub Navigation: Practice Test vs Manage Question Bank */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveSubTab('test')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeSubTab === 'test'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Take Practice Test
            </button>
            <button
              onClick={() => setActiveSubTab('manage')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                activeSubTab === 'manage'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>Manage Questions ({allAvailableQuestions.length})</span>
            </button>
          </div>

          {/* TAB 1: PRACTICE TEST CONFIGURATOR */}
          {activeSubTab === 'test' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-slate-900">
                Configure Your Assessment Test
              </h3>

              {/* Difficulty Level Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedDifficulty(lvl)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedDifficulty === lvl
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-200'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="block text-xs font-bold">{lvl}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        {lvl === 'Beginner' ? 'Fundamental Basics' : lvl === 'Intermediate' ? 'Office & Systems' : 'Advanced & Cyber'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Focus Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Choose Specific Topic Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'All Topics (Mixed)' },
                    { id: 'basics', label: 'Computer Basics' },
                    { id: 'hardware', label: 'Hardware & Architecture' },
                    { id: 'office', label: 'Office (Word & Excel)' },
                    { id: 'internet', label: 'Internet & Browsing' },
                    { id: 'security', label: 'Cybersecurity & Safety' },
                  ].map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-colors ${
                        selectedTopic === topic.id
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Launch Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => startQuiz(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Start 10-Question Random Practice Test</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setActiveSubTab('manage')}
                  className="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                >
                  Manage / Add Custom Questions
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE QUESTION BANK (ADD, EDIT, DELETE) */}
          {activeSubTab === 'manage' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Question Bank & Question Manager
                  </h3>
                  <p className="text-xs text-slate-500">
                    Search, inspect, edit, or delete questions. Questions deleted here will not appear in tests.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddQuestion}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Question</span>
                </button>
              </div>

              {/* Search & Topic filter */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search question bank: RAM, CPU, formula, phishing..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <select
                  value={manageTopic}
                  onChange={e => setManageTopic(e.target.value)}
                  className="w-full sm:w-auto bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Topics</option>
                  <option value="basics">Basics</option>
                  <option value="hardware">Hardware</option>
                  <option value="office">Office</option>
                  <option value="internet">Internet</option>
                  <option value="security">Security</option>
                </select>
              </div>

              {/* Questions list */}
              <div className="space-y-3">
                {filteredManageQuestions.map((item, idx) => (
                  <div
                    key={item.question.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                            {item.topic}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                            {item.difficulty}
                          </span>
                          {item.isCustom && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                              Custom User Question
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {idx + 1}. {item.question.question}
                        </h4>
                      </div>

                      {/* Controls: Edit & Delete */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenEditQuestion(item)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit this question"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(item)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete this question from question bank"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Options Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                      {item.question.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`px-2.5 py-1.5 rounded-lg border flex items-center justify-between ${
                            oIdx === item.question.correctAnswerIndex
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {oIdx === item.question.correctAnswerIndex && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 ml-1" />
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                      <strong>Explanation:</strong> {item.question.explanation}
                    </p>
                  </div>
                ))}

                {filteredManageQuestions.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    No matching questions found in question bank. Click "+ Add Question" above to add your own question!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* QUIZ TAKING MODE */}
      {quizMode === 'taking' && currentQ && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 animate-fadeIn">
          {/* Header indicator */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400">
                {selectedDifficulty} · {selectedTopic === 'all' ? 'Mixed Topics' : selectedTopic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 font-bold">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
              <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const isCorrect = optIdx === currentQ.correctAnswerIndex;

                let btnStyle = 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-800 bg-white';

                if (isSelected && !isAnswerSubmitted) {
                  btnStyle = 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-300';
                }

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-300';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Explanation */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-xl border text-xs space-y-1 animate-fadeIn ${
              selectedAnswers[currentQuestionIndex] === currentQ.correctAnswerIndex
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {selectedAnswers[currentQuestionIndex] === currentQ.correctAnswerIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct Answer!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Incorrect. The correct answer was: &quot;{currentQ.options[currentQ.correctAnswerIndex]}&quot;</span>
                  </>
                )}
              </div>
              <p className="text-slate-700 leading-relaxed pt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to quit the quiz?')) {
                  setQuizMode('idle');
                }
              }}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Quit Test
            </button>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitCurrentAnswer}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUIZ COMPLETED RESULTS VIEW */}
      {quizMode === 'completed' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 animate-fadeIn">
          {/* Result Card Top Banner */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-200">
            <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white mx-auto shadow-md">
              <Award className="w-8 h-8 text-amber-900" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Practice Assessment Completed!
            </h2>

            <div className="text-4xl font-extrabold text-blue-600 my-2">
              {calculateFinalScore()} / {questions.length}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              You scored {Math.round((calculateFinalScore() / questions.length) * 100)}% on this assessment. Your score and points have been added to your student profile!
            </p>
          </div>

          {/* Breakdown & Topics to Revise */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Question-by-Question Review
            </h3>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const isCorrect = selectedAnswers[idx] === q.correctAnswerIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-bold text-slate-900 leading-snug">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold flex items-center gap-1 shrink-0">
                          <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 text-[11px] bg-white/80 p-2.5 rounded-lg border border-slate-200">
                      <strong>Correct Answer:</strong> {q.options[q.correctAnswerIndex]} — {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => startQuiz(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry With New Random 10 Questions</span>
            </button>

            <button
              onClick={onNavigateToLessons}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Return to ICT Lessons Catalog</span>
            </button>
          </div>
        </div>
      )}

      {/* Quiz Question Modal */}
      <QuizQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        questionToEdit={questionToEdit}
      />
    </div>
  );
};
