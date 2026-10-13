import React, { useState } from 'react';
import { X, Users, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface AudienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudienceModal: React.FC<AudienceModalProps> = ({ isOpen, onClose }) => {
  const { addAboutAudience } = useContent();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconEmoji, setIconEmoji] = useState('🎓');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addAboutAudience({
      title: title.trim(),
      description: description.trim(),
      iconEmoji: iconEmoji.trim() || '🎓'
    });

    setTitle('');
    setDescription('');
    setIconEmoji('🎓');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Add Target Audience Group</h3>
              <p className="text-[11px] text-slate-400">Add a learner group or demographic to About Us</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">Emoji Icon</label>
              <input
                type="text"
                value={iconEmoji}
                onChange={e => setIconEmoji(e.target.value)}
                className="w-full text-center text-xl bg-slate-50 border border-slate-300 rounded-xl px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">Group Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. University Undergraduates"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Explain how ICT Learning Hub supports this group's digital literacy..."
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
              <Check className="w-3.5 h-3.5" /> Add Audience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
