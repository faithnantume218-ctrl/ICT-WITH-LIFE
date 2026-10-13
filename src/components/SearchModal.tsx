import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Layers, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectGlossary: (termId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectGlossary
}) => {
  const { lessons, glossaryTerms } = useContent();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingLessons = trimmed
    ? lessons.filter(
        l =>
          l.title.toLowerCase().includes(trimmed) ||
          l.shortDescription.toLowerCase().includes(trimmed) ||
          l.moduleName.toLowerCase().includes(trimmed) ||
          l.summaryPoints.some(p => p.toLowerCase().includes(trimmed))
      ).slice(0, 5)
    : [];

  const matchingGlossary = trimmed
    ? glossaryTerms.filter(
        g =>
          g.term.toLowerCase().includes(trimmed) ||
          g.definition.toLowerCase().includes(trimmed) ||
          g.simpleExample.toLowerCase().includes(trimmed)
      ).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-20 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search ICT lessons, hardware, formulas, terms (e.g. RAM, Excel, Phishing)..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!trimmed && (
            <div className="py-8 text-center text-xs text-slate-400">
              <p className="font-semibold text-slate-600">Quick Search</p>
              <p className="mt-1">Type any keyword like &quot;Keyboard&quot;, &quot;Excel&quot;, &quot;Password&quot;, or &quot;Motherboard&quot;.</p>
              <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                {['CPU vs RAM', 'Microsoft Word', 'Phishing', 'Operating System', 'Email'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && matchingLessons.length === 0 && matchingGlossary.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching lessons or terms found for &quot;{query}&quot;. Try different keywords.
            </div>
          )}

          {/* Lessons */}
          {matchingLessons.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                Lessons & Modules ({matchingLessons.length})
              </span>
              <div className="space-y-1.5">
                {matchingLessons.map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      onSelectLesson(l.id);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-blue-50/80 border border-transparent hover:border-blue-200 text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-700">
                          {l.title}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {l.moduleName} · {l.difficulty} · {l.estimatedMinutes} mins
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Glossary Terms */}
          {matchingGlossary.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                Glossary Terms ({matchingGlossary.length})
              </span>
              <div className="space-y-1.5">
                {matchingGlossary.map(g => (
                  <button
                    key={g.id}
                    onClick={() => {
                      onSelectGlossary(g.id);
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-emerald-50/80 border border-transparent hover:border-emerald-200 text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                        ABC
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700">
                          {g.term}
                        </span>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {g.definition}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Search 17 lessons and 28+ glossary terms</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
