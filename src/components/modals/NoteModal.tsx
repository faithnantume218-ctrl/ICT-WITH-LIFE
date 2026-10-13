import React, { useState, useEffect } from 'react';
import { X, BookOpen, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLessonId?: string;
  defaultLessonTitle?: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  defaultLessonId,
  defaultLessonTitle
}) => {
  const { addPersonalNote, lessons } = useContent();

  const [title, setTitle] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState(defaultLessonId || '');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (defaultLessonId) {
      setSelectedLessonId(defaultLessonId);
    }
  }, [defaultLessonId, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const matchedLesson = lessons.find(l => l.id === selectedLessonId);

    addPersonalNote({
      id: `note-${Date.now()}`,
      lessonId: selectedLessonId || undefined,
      lessonTitle: matchedLesson?.title || defaultLessonTitle || 'General ICT Note',
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    });

    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Add Personal Study Note</h3>
              <p className="text-[11px] text-slate-400">Save a key takeaway or memory aid</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Note Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Formula for Percentage in Excel"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Related Lesson (Optional)</label>
            <select
              value={selectedLessonId}
              onChange={e => setSelectedLessonId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="">-- General ICT Note --</option>
              {lessons.map(l => (
                <option key={l.id} value={l.id}>
                  Lesson {l.order}: {l.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Personal Notes & Tips *</label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your explanation in your own words, mnemonic devices, or practical steps..."
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
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
