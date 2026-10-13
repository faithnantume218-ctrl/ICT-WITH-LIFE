import React, { useState } from 'react';
import { X, Target, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose }) => {
  const { addStudyGoal } = useContent();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [targetDate, setTargetDate] = useState('This week');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addStudyGoal({
      id: `goal-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'General ICT',
      targetDate: targetDate.trim() || 'Ongoing',
      completed: false
    });

    setTitle('');
    setCategory('Hardware');
    setTargetDate('This week');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Add Personal Study Goal</h3>
              <p className="text-[11px] text-slate-400">Set a learning milestone or revision target</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Study Goal / Target *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Master Lessons 10-12 on Microsoft Office"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Area</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                <option value="Hardware">Hardware</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Office Suite">Office Suite</option>
                <option value="Internet & Email">Internet & Email</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Quizzes">Quizzes & Tests</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Date</label>
              <input
                type="text"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                placeholder="e.g. Friday, Tomorrow, Oct 30"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
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
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Save Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
