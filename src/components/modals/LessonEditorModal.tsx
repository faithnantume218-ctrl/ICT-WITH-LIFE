import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, BookOpen, Check, AlertCircle } from 'lucide-react';
import { Lesson, DifficultyLevel, Module, QuizQuestion } from '../../types/ict';
import { useContent } from '../../context/ContentContext';

interface LessonEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonToEdit?: Lesson | null;
  onSaved: (lessonId: string) => void;
}

export const LessonEditorModal: React.FC<LessonEditorModalProps> = ({
  isOpen,
  onClose,
  lessonToEdit,
  onSaved
}) => {
  const { modules, addLesson, updateLesson } = useContent();

  const [title, setTitle] = useState('');
  const [moduleId, setModuleId] = useState(modules[0]?.id || 'module-1');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');
  const [estimatedMinutes, setEstimatedMinutes] = useState(15);
  const [shortDescription, setShortDescription] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [objectivesText, setObjectivesText] = useState('');
  const [conceptTitle, setConceptTitle] = useState('Core Concepts');
  const [conceptBody, setConceptBody] = useState('');
  const [realLifeTitle, setRealLifeTitle] = useState('Everyday Application');
  const [realLifeScenario, setRealLifeScenario] = useState('');
  const [realLifeTakeaway, setRealLifeTakeaway] = useState('');
  const [practicalTitle, setPracticalTitle] = useState('Hands-on Practice');
  const [practicalInstructions, setPracticalInstructions] = useState('');
  const [practicalResult, setPracticalResult] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [revisionText, setRevisionText] = useState('');

  // 1 to 5 quiz questions
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q-custom-1',
      question: 'What is the key takeaway from this lesson?',
      options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
      correctAnswerIndex: 0,
      explanation: 'Explanation of why this is the correct answer.'
    }
  ]);

  useEffect(() => {
    if (lessonToEdit) {
      setTitle(lessonToEdit.title);
      setModuleId(lessonToEdit.moduleId);
      setDifficulty(lessonToEdit.difficulty);
      setEstimatedMinutes(lessonToEdit.estimatedMinutes);
      setShortDescription(lessonToEdit.shortDescription);
      setIntroduction(lessonToEdit.introduction);
      setObjectivesText(lessonToEdit.learningObjectives.join('\n'));
      if (lessonToEdit.keyConcepts[0]) {
        setConceptTitle(lessonToEdit.keyConcepts[0].title);
        setConceptBody(lessonToEdit.keyConcepts[0].content);
      }
      setRealLifeTitle(lessonToEdit.realLifeExample?.title || 'Everyday Application');
      setRealLifeScenario(lessonToEdit.realLifeExample?.scenario || '');
      setRealLifeTakeaway(lessonToEdit.realLifeExample?.lessonTakeaway || '');
      setPracticalTitle(lessonToEdit.practicalActivity?.title || 'Hands-on Activity');
      setPracticalInstructions(lessonToEdit.practicalActivity?.instructions.join('\n') || '');
      setPracticalResult(lessonToEdit.practicalActivity?.expectedResult || '');
      setSummaryText(lessonToEdit.summaryPoints.join('\n'));
      setRevisionText(lessonToEdit.revisionQuestions.join('\n'));
      setQuizQuestions(lessonToEdit.quiz.length > 0 ? lessonToEdit.quiz : [
        {
          id: 'q-1',
          question: 'What is the key takeaway from this lesson?',
          options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
          correctAnswerIndex: 0,
          explanation: 'Explanation of why this is the correct answer.'
        }
      ]);
    } else {
      // Defaults for brand new lesson
      setTitle('');
      setModuleId(modules[0]?.id || 'module-1');
      setDifficulty('Beginner');
      setEstimatedMinutes(15);
      setShortDescription('');
      setIntroduction('');
      setObjectivesText('Understand basic concept\nApply knowledge in practice\nSolve review questions');
      setConceptTitle('Core Principles');
      setConceptBody('');
      setRealLifeTitle('Practical Life Example');
      setRealLifeScenario('');
      setRealLifeTakeaway('');
      setPracticalTitle('Quick Practice Exercise');
      setPracticalInstructions('1. Open your computer\n2. Follow instructions\n3. Save your file');
      setPracticalResult('You will master this topic.');
      setSummaryText('Key point 1\nKey point 2\nKey point 3');
      setRevisionText('What did you learn today?\nWhy is this important?\nHow will you use this in your school or work?');
      setQuizQuestions([
        {
          id: `q-${Date.now()}-1`,
          question: 'Sample question about this lesson?',
          options: ['Correct Option', 'Wrong Option B', 'Wrong Option C', 'Wrong Option D'],
          correctAnswerIndex: 0,
          explanation: 'Clear explanation for learners.'
        }
      ]);
    }
  }, [lessonToEdit, modules, isOpen]);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    if (quizQuestions.length >= 5) return;
    setQuizQuestions(prev => [
      ...prev,
      {
        id: `q-${Date.now()}-${prev.length + 1}`,
        question: `Question ${prev.length + 1}`,
        options: ['Option A (Correct)', 'Option B', 'Option C', 'Option D'],
        correctAnswerIndex: 0,
        explanation: 'Explanation for question.'
      }
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (quizQuestions.length <= 1) return;
    setQuizQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateQuestion = (idx: number, updates: Partial<QuizQuestion>) => {
    setQuizQuestions(prev =>
      prev.map((q, i) => (i === idx ? { ...q, ...updates } : q))
    );
  };

  const handleUpdateOption = (qIdx: number, optIdx: number, val: string) => {
    setQuizQuestions(prev =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const newOpts = [...q.options];
        newOpts[optIdx] = val;
        return { ...q, options: newOpts };
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    const parentModule = modules.find(m => m.id === moduleId) || modules[0];

    const objectives = objectivesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const summaries = summaryText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const revisions = revisionText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const instructions = practicalInstructions
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const lessonData: Lesson = {
      id: lessonToEdit ? lessonToEdit.id : `lesson-custom-${Date.now()}`,
      moduleId: parentModule.id,
      moduleName: parentModule.title,
      order: lessonToEdit ? lessonToEdit.order : 99,
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      difficulty,
      estimatedMinutes: Number(estimatedMinutes) || 15,
      iconName: 'BookOpen',
      learningObjectives: objectives.length > 0 ? objectives : ['Master key skills in this lesson'],
      introduction: introduction.trim() || shortDescription.trim(),
      keyConcepts: [
        {
          title: conceptTitle.trim() || 'Core Principles',
          content: conceptBody.trim() || shortDescription.trim()
        }
      ],
      realLifeExample: {
        title: realLifeTitle.trim() || 'Practical Everyday Context',
        scenario: realLifeScenario.trim() || 'Students apply this knowledge in their local community.',
        lessonTakeaway: realLifeTakeaway.trim() || 'Always apply proper ICT best practices.'
      },
      interactiveWidgetType: lessonToEdit?.interactiveWidgetType || 'computer-parts',
      practicalActivity: {
        title: practicalTitle.trim() || 'Practical Exercise',
        instructions: instructions.length > 0 ? instructions : ['Follow teacher demonstration.'],
        expectedResult: practicalResult.trim() || 'Successful completion of task.'
      },
      summaryPoints: summaries.length > 0 ? summaries : ['Summary point 1', 'Summary point 2'],
      quiz: quizQuestions,
      revisionQuestions: revisions.length > 0 ? revisions : ['Explain what you learned in this lesson.']
    };

    if (lessonToEdit) {
      updateLesson(lessonToEdit.id, lessonData);
      onSaved(lessonToEdit.id);
    } else {
      addLesson(lessonData);
      onSaved(lessonData.id);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                {lessonToEdit ? 'Edit ICT Lesson' : 'Add Your Own ICT Lesson'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Custom lessons are stored in local storage and will appear in Courses & Quizzes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Lesson Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Artificial Intelligence & Robotics"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Parent Course / Module *
              </label>
              <select
                value={moduleId}
                onChange={e => setModuleId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              >
                {modules.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Duration (mins)
                </label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={estimatedMinutes}
                  onChange={e => setEstimatedMinutes(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Short description */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Summary Description *
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={e => setShortDescription(e.target.value)}
              placeholder="e.g. Learn how intelligent algorithms help automate everyday tasks."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Introduction */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Lesson Introduction Text *
            </label>
            <textarea
              rows={3}
              required
              value={introduction}
              onChange={e => setIntroduction(e.target.value)}
              placeholder="A simple, welcoming introduction explaining what this lesson is about..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
            />
          </div>

          {/* Learning Objectives */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Learning Objectives (One objective per line)
            </label>
            <textarea
              rows={3}
              value={objectivesText}
              onChange={e => setObjectivesText(e.target.value)}
              placeholder="Define key concepts&#10;Identify hardware components&#10;Solve practical problems"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
            />
          </div>

          {/* Core Concept */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <span className="font-bold text-slate-900 block">Core Explanation Concept</span>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Concept Heading</label>
              <input
                type="text"
                value={conceptTitle}
                onChange={e => setConceptTitle(e.target.value)}
                placeholder="e.g. How Machine Learning Works"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Concept Detailed Explanation</label>
              <textarea
                rows={3}
                value={conceptBody}
                onChange={e => setConceptBody(e.target.value)}
                placeholder="Explain the concept in simple, accessible language with an everyday analogy..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 leading-relaxed"
              />
            </div>
          </div>

          {/* Real-life example */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
            <span className="font-bold text-emerald-950 block">Real-Life Application & Scenario</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-emerald-900 mb-1">Scenario Title</label>
                <input
                  type="text"
                  value={realLifeTitle}
                  onChange={e => setRealLifeTitle(e.target.value)}
                  placeholder="e.g. Crop Disease Detection by Farmers in Uganda"
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-emerald-900 mb-1">Lesson Takeaway</label>
                <input
                  type="text"
                  value={realLifeTakeaway}
                  onChange={e => setRealLifeTakeaway(e.target.value)}
                  placeholder="e.g. Technology empowers local agriculture and communities."
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-emerald-900 mb-1">Everyday Story / Scenario</label>
              <textarea
                rows={2}
                value={realLifeScenario}
                onChange={e => setRealLifeScenario(e.target.value)}
                placeholder="Describe a relatable everyday story where this ICT tool is used..."
                className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2"
              />
            </div>
          </div>

          {/* Practical Activity */}
          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-3">
            <span className="font-bold text-blue-950 block">Hands-on Practical Task</span>
            <input
              type="text"
              value={practicalTitle}
              onChange={e => setPracticalTitle(e.target.value)}
              placeholder="Task Title (e.g. Try Testing AI Image Recognition)"
              className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2"
            />
            <textarea
              rows={2}
              value={practicalInstructions}
              onChange={e => setPracticalInstructions(e.target.value)}
              placeholder="Step-by-step instructions for the student (one per line)..."
              className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2"
            />
          </div>

          {/* Quiz Questions Section */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Interactive Quiz Questions</span>
                <span className="text-slate-500 text-[11px]">Add up to 5 multiple-choice questions</span>
              </div>
              {quizQuestions.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Question
                </button>
              )}
            </div>

            {quizQuestions.map((q, qIdx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Question {qIdx + 1}</span>
                  {quizQuestions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="text-rose-600 hover:text-rose-800 p-1"
                      title="Remove question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  value={q.question}
                  onChange={e => handleUpdateQuestion(qIdx, { question: e.target.value })}
                  placeholder="Enter multiple-choice question text..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-medium"
                />

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctAnswerIndex === optIdx}
                        onChange={() => handleUpdateQuestion(qIdx, { correctAnswerIndex: optIdx })}
                        title="Mark as correct answer"
                        className="cursor-pointer"
                      />
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={e => handleUpdateOption(qIdx, optIdx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        className={`w-full bg-white border rounded-lg px-2.5 py-1.5 text-xs ${
                          q.correctAnswerIndex === optIdx ? 'border-emerald-500 font-bold bg-emerald-50/30' : 'border-slate-300'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <input
                  type="text"
                  value={q.explanation}
                  onChange={e => handleUpdateQuestion(qIdx, { explanation: e.target.value })}
                  placeholder="Explanation of why this answer is correct..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-[11px]"
                />
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500">
              Changes will save to browser storage and be accessible immediately.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
              >
                {lessonToEdit ? 'Save Changes' : 'Create Lesson'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
