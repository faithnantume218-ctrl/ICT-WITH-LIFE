import React, { useState } from 'react';
import { Search, BookMarked, Filter, Lightbulb, ArrowRight, Plus, Edit3, Trash2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { GlossaryTerm } from '../types/ict';
import { GlossaryEditorModal } from '../components/modals/GlossaryEditorModal';

export const GlossaryView: React.FC = () => {
  const { glossaryTerms, deleteGlossaryTerm } = useContent();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termToEdit, setTermToEdit] = useState<GlossaryTerm | null>(null);

  const categories = ['all', 'Basics', 'Hardware', 'Software', 'Office', 'Internet', 'Security'];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase()) ||
      item.simpleExample.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'all' || item.category === selectedCategory;

    const matchesLetter = 
      selectedLetter === 'all' || item.term.toUpperCase().startsWith(selectedLetter);

    return matchesSearch && matchesCategory && matchesLetter;
  });

  const handleOpenAdd = () => {
    setTermToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (term: GlossaryTerm) => {
    setTermToEdit(term);
    setIsModalOpen(true);
  };

  const handleDelete = (term: GlossaryTerm) => {
    if (confirm(`Are you sure you want to delete "${term.term}" from the glossary?`)) {
      deleteGlossaryTerm(term.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono border border-blue-400/30">
            <BookMarked className="w-3.5 h-3.5 text-blue-300" />
            Essential ICT Vocabulary · Customizable
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ICT Terms & Concepts Glossary
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Clear, jargon-free explanations of computer hardware, software, networking, and digital safety terms. You can add new terms or delete definitions anytime.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>+ Add Your Own Term</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search terms: RAM, CPU, URL, Malware, Spreadsheet..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 w-full sm:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alphabet Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1 items-center">
          <button
            onClick={() => setSelectedLetter('all')}
            className={`px-2 py-1 rounded text-[11px] font-bold ${
              selectedLetter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({glossaryTerms.length})
          </button>
          {alphabet.map(letter => {
            const count = glossaryTerms.filter(t => t.term.toUpperCase().startsWith(letter)).length;
            if (count === 0) return null;

            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded text-[11px] font-bold transition-colors ${
                  selectedLetter === letter
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTerms.map(term => (
          <div
            key={term.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {term.category}
                </span>

                {/* Edit & Delete quick controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(term)}
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit term"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(term)}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                    title="Delete term"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {term.term}
              </h3>

              <p className="text-xs text-slate-700 leading-relaxed mt-2.5">
                {term.definition}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" /> Everyday Example:
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                {term.simpleExample}
              </p>
            </div>
          </div>
        ))}

        {filteredTerms.length === 0 && (
          <div className="col-span-full py-16 text-center text-xs text-slate-400 space-y-3">
            <p>No terms found matching your query.</p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-xs"
            >
              + Add This Term to Glossary
            </button>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <GlossaryEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        termToEdit={termToEdit}
      />
    </div>
  );
};
