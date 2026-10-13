import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Check } from 'lucide-react';
import { CustomQuizItem, DifficultyLevel } from '../../types/ict';
import { useContent } from '../../context/ContentContext';

interface QuizQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionToEdit?: CustomQuizItem | null;
}

export const QuizQuestionModal: React.FC<QuizQuestionModalProps> = ({
  isOpen,
  onClose,
  questionToEdit
}) => {
  const { addCustomQuizQuestion, updateCustomQuizQuestion } = useContent();

  const [question, setQuestion] = useState('');
  const [topic, setTopic] = useState('basics');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');
  const [option0, setOption0] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setTopic(questionToEdit.topic);
      setDifficulty(questionToEdit.difficulty);
      setOption0(questionToEdit.options[0] || '');
      setOption1(questionToEdit.options[1] || '');
      setOption2(questionToEdit.options[2] || '');
      setOption3(questionToEdit.options[3] || '');
      setCorrectAnswerIndex(questionToEdit.correctAnswerIndex);
      setExplanation(questionToEdit.explanation);
    } else {
      setQuestion('');
      setTopic('basics');
      setDifficulty('Beginner');
      setOption0('');
      setOption1('');
      setOption2('');
      setOption3('');
      setCorrectAnswerIndex(0);
      setExplanation('');
    }
  }, [questionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !option0.trim() || !option1.trim()) return;

    const options = [
      option0.trim(),
      option1.trim(),
      option2.trim() || 'None of the above',
      option3.trim() || 'All of the above'
    ];

    if (questionToEdit) {
      updateCustomQuizQuestion(questionToEdit.id, {
        question: question.trim(),
        topic,
        difficulty,
        options,
        correctAnswerIndex,
        explanation: explanation.trim() || 'Review this ICT topic to reinforce your understanding.'
      });
    } else {
      addCustomQuizQuestion({
        id: `cquiz-${Date.now()}`,
        question: question.trim(),
        topic,
        difficulty,
        options,
        correctAnswerIndex,
        explanation: explanation.trim() || 'Review this ICT topic to reinforce your understanding.'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {questionToEdit ? 'Edit Quiz Question' : 'Add Custom Quiz Question'}
              </h3>
              <p className="text-[11px] text-slate-400">Add a multiple-choice question to the ICT Question Bank</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Question Text *</label>
            <textarea
              required
              rows={2}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="e.g. Which component is considered the primary brain of a computer?"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topic Category</label>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                <option value="basics">Computer Basics</option>
                <option value="hardware">Hardware & Architecture</option>
                <option value="office">Office Productivity (Word/Excel)</option>
                <option value="internet">Internet & Networking</option>
                <option value="security">Cybersecurity & Safety</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700">Four Answer Choices *</label>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === 0}
                  onChange={() => setCorrectAnswerIndex(0)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  required
                  value={option0}
                  onChange={e => setOption0(e.target.value)}
                  placeholder="Option A (radio button selects correct answer)"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === 1}
                  onChange={() => setCorrectAnswerIndex(1)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  required
                  value={option1}
                  onChange={e => setOption1(e.target.value)}
                  placeholder="Option B"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === 2}
                  onChange={() => setCorrectAnswerIndex(2)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  value={option2}
                  onChange={e => setOption2(e.target.value)}
                  placeholder="Option C"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === 3}
                  onChange={() => setCorrectAnswerIndex(3)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  value={option3}
                  onChange={e => setOption3(e.target.value)}
                  placeholder="Option D"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 italic">Select the radio button next to the correct answer.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Explanation (shown after answering) *</label>
            <textarea
              required
              rows={2}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="e.g. The CPU (Central Processing Unit) executes all instructions and calculations, acting as the brain."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> {questionToEdit ? 'Save Changes' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
