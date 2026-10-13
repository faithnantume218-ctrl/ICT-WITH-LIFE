import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { DifficultyLevel } from '../../types/ict';
import { useContent } from '../../context/ContentContext';

interface PracticeChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PracticeChallengeModal: React.FC<PracticeChallengeModalProps> = ({ isOpen, onClose }) => {
  const { addPracticeChallenge } = useContent();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hardware Lab');
  const [task, setTask] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !task.trim()) return;

    addPracticeChallenge({
      id: `chall-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'General ICT',
      task: task.trim(),
      expectedResult: expectedResult.trim() || 'Task completed successfully with expected outcome.',
      difficulty
    });

    setTitle('');
    setTask('');
    setExpectedResult('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Add Hands-On Practice Challenge</h3>
              <p className="text-[11px] text-slate-400">Add an interactive task or lab exercise to Practice</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Challenge Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Master Excel SUM and Average Formulas"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Word Processing, Networking, Security"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
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

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Task Instructions *</label>
            <textarea
              required
              rows={3}
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="Step 1: Open a spreadsheet. Step 2: Enter 5 student scores..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Expected Result / Solution *</label>
            <textarea
              required
              rows={2}
              value={expectedResult}
              onChange={e => setExpectedResult(e.target.value)}
              placeholder="What does a successful learner see or produce?"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Add Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
