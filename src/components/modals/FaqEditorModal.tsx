import React, { useState, useEffect } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { FaqItem } from '../../types/ict';
import { useContent } from '../../context/ContentContext';

interface FaqEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  faqToEdit?: FaqItem | null;
}

export const FaqEditorModal: React.FC<FaqEditorModalProps> = ({
  isOpen,
  onClose,
  faqToEdit
}) => {
  const { addFaq, updateFaq } = useContent();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (faqToEdit) {
      setQuestion(faqToEdit.q);
      setAnswer(faqToEdit.a);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [faqToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    if (faqToEdit) {
      updateFaq(faqToEdit.id, {
        q: question.trim(),
        a: answer.trim()
      });
    } else {
      addFaq({
        id: `faq-${Date.now()}`,
        q: question.trim(),
        a: answer.trim()
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm text-white">
              {faqToEdit ? 'Edit FAQ Item' : 'Add New FAQ Question'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Frequently Asked Question *
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="e.g. Can I study these lessons offline without constant Wi-Fi?"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Helpful Answer *
            </label>
            <textarea
              rows={4}
              required
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Provide a clear, reassuring answer for students and teachers..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
            >
              {faqToEdit ? 'Save FAQ' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
