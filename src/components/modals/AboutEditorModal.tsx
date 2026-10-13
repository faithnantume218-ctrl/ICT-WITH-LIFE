import React, { useState } from 'react';
import { X, Heart, Target } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface AboutEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutEditorModal: React.FC<AboutEditorModalProps> = ({ isOpen, onClose }) => {
  const { aboutInfo, updateAboutInfo } = useContent();

  const [mainHeading, setMainHeading] = useState(aboutInfo.mainHeading);
  const [subDescription, setSubDescription] = useState(aboutInfo.subDescription);
  const [missionHeading, setMissionHeading] = useState(aboutInfo.missionHeading);
  const [missionDescription, setMissionDescription] = useState(aboutInfo.missionDescription);
  const [philosophyHeading, setPhilosophyHeading] = useState(aboutInfo.philosophyHeading);
  const [philosophyDescription, setPhilosophyDescription] = useState(aboutInfo.philosophyDescription);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutInfo({
      mainHeading: mainHeading.trim(),
      subDescription: subDescription.trim(),
      missionHeading: missionHeading.trim(),
      missionDescription: missionDescription.trim(),
      philosophyHeading: philosophyHeading.trim(),
      philosophyDescription: philosophyDescription.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm text-white">
              Customize About Us Information
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Main Banner Headline
            </label>
            <input
              type="text"
              required
              value={mainHeading}
              onChange={e => setMainHeading(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Introductory Tagline / Sub-description
            </label>
            <textarea
              rows={2}
              required
              value={subDescription}
              onChange={e => setSubDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium bg-white leading-relaxed"
            />
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <span className="font-bold text-slate-900 block">Mission Section</span>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Mission Heading</label>
              <input
                type="text"
                value={missionHeading}
                onChange={e => setMissionHeading(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 mb-1">Mission Description</label>
              <textarea
                rows={3}
                value={missionDescription}
                onChange={e => setMissionDescription(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 leading-relaxed"
              />
            </div>
          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-3">
            <span className="font-bold text-emerald-950 block">Philosophy Section</span>
            <div>
              <label className="block font-semibold text-emerald-900 mb-1">Philosophy Heading</label>
              <input
                type="text"
                value={philosophyHeading}
                onChange={e => setPhilosophyHeading(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold text-emerald-900 mb-1">Philosophy Description</label>
              <textarea
                rows={3}
                value={philosophyDescription}
                onChange={e => setPhilosophyDescription(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 leading-relaxed"
              />
            </div>
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
              Save Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
