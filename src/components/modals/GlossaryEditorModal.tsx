import React, { useState, useEffect } from 'react';
import { X, BookMarked } from 'lucide-react';
import { GlossaryTerm } from '../../types/ict';
import { useContent } from '../../context/ContentContext';

interface GlossaryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  termToEdit?: GlossaryTerm | null;
}

export const GlossaryEditorModal: React.FC<GlossaryEditorModalProps> = ({
  isOpen,
  onClose,
  termToEdit
}) => {
  const { addGlossaryTerm, updateGlossaryTerm } = useContent();

  const [term, setTerm] = useState('');
  const [category, setCategory] = useState<'Basics' | 'Hardware' | 'Software' | 'Office' | 'Internet' | 'Security'>('Basics');
  const [definition, setDefinition] = useState('');
  const [simpleExample, setSimpleExample] = useState('');

  useEffect(() => {
    if (termToEdit) {
      setTerm(termToEdit.term);
      setCategory(termToEdit.category);
      setDefinition(termToEdit.definition);
      setSimpleExample(termToEdit.simpleExample);
    } else {
      setTerm('');
      setCategory('Basics');
      setDefinition('');
      setSimpleExample('');
    }
  }, [termToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !definition.trim()) return;

    if (termToEdit) {
      updateGlossaryTerm(termToEdit.id, {
        term: term.trim(),
        category,
        definition: definition.trim(),
        simpleExample: simpleExample.trim() || 'Everyday application in technology.'
      });
    } else {
      addGlossaryTerm({
        id: `term-${Date.now()}`,
        term: term.trim(),
        category,
        definition: definition.trim(),
        simpleExample: simpleExample.trim() || 'Everyday application in technology.'
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
            <BookMarked className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm text-white">
              {termToEdit ? 'Edit Glossary Term' : 'Add New ICT Glossary Term'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Term Name *
            </label>
            <input
              type="text"
              required
              value={term}
              onChange={e => setTerm(e.target.value)}
              placeholder="e.g. Artificial Intelligence (AI)"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="Basics">Basics</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Office">Office</option>
              <option value="Internet">Internet</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Definition (Simple, Beginner-Friendly English) *
            </label>
            <textarea
              rows={3}
              required
              value={definition}
              onChange={e => setDefinition(e.target.value)}
              placeholder="Explain what this term means in plain, crystal-clear words..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Everyday Example or Analogy
            </label>
            <textarea
              rows={2}
              value={simpleExample}
              onChange={e => setSimpleExample(e.target.value)}
              placeholder="e.g. Like an automated weather advisory sent to a farmer's mobile phone."
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
              {termToEdit ? 'Save Term' : 'Add Term'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
