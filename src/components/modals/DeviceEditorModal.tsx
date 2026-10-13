import React, { useState } from 'react';
import { X, Layers } from 'lucide-react';
import { SorterDeviceItem, useContent } from '../../context/ContentContext';

interface DeviceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeviceEditorModal: React.FC<DeviceEditorModalProps> = ({ isOpen, onClose }) => {
  const { addSorterDevice } = useContent();

  const [name, setName] = useState('');
  const [iconLabel, setIconLabel] = useState('🖱️');
  const [correctCategory, setCorrectCategory] = useState<'input' | 'output' | 'storage'>('input');
  const [explanation, setExplanation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addSorterDevice({
      id: `dev-${Date.now()}`,
      name: name.trim(),
      iconLabel: iconLabel.trim() || '💻',
      correctCategory,
      explanation: explanation.trim() || `Sends information ${correctCategory === 'input' ? 'into' : correctCategory === 'output' ? 'out of' : 'permanently inside'} the computer.`
    });

    onClose();
  };

  const EMOJIS = ['🖱️', '⌨️', '🖨️', '💾', '🎙️', '🎧', '📸', '📽️', '🕹️', '📱', '📟', '🔌'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm text-white">
              Add Peripheral Device to Sorter
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Icon Emoji
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map(em => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setIconLabel(em)}
                  className={`w-8 h-8 rounded-lg text-base flex items-center justify-center ${
                    iconLabel === em ? 'bg-blue-100 ring-2 ring-blue-600 scale-110' : 'bg-slate-100'
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Hardware Device Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Optical Trackball Mouse"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Correct IPOS Category *
            </label>
            <select
              value={correctCategory}
              onChange={e => setCorrectCategory(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium bg-white cursor-pointer"
            >
              <option value="input">Input Device (feeds data in)</option>
              <option value="output">Output Device (presents data out)</option>
              <option value="storage">Storage Device (preserves data)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Educational Explanation
            </label>
            <textarea
              rows={2}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              placeholder="Explain why this device belongs to this category..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium bg-white leading-relaxed"
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
              Add to Sorter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
