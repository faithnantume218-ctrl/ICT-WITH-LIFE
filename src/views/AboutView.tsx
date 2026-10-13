import React, { useState } from 'react';
import { Laptop, Heart, ShieldCheck, Users, Target, BookOpen, CheckCircle2, ArrowRight, Edit3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { AboutEditorModal } from '../components/modals/AboutEditorModal';

interface AboutViewProps {
  onStartLearning: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartLearning }) => {
  const { aboutInfo } = useContent();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto relative">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            {aboutInfo.heroTagline}
          </span>
          <button
            onClick={() => setIsEditorOpen(true)}
            className="text-[11px] bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200 font-bold flex items-center gap-1 transition-colors"
            title="Edit About Page Information"
          >
            <Edit3 className="w-3 h-3" /> Edit Page
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {aboutInfo.mainHeading}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {aboutInfo.subDescription}
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{aboutInfo.missionHeading}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {aboutInfo.missionDescription}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{aboutInfo.philosophyHeading}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {aboutInfo.philosophyDescription}
          </p>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 text-center">
          Who Is ICT Learning Hub Built For?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutInfo.targetAudience.map((aud, idx) => (
            <div key={idx} className="space-y-2 text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-3xl block">{aud.iconEmoji}</span>
              <h4 className="text-sm font-bold text-slate-900">{aud.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {aud.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Standards alignment */}
      <div className="bg-linear-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 text-white shadow-lg space-y-4">
        <span className="text-xs font-mono text-blue-300 uppercase tracking-widest block">
          Standards-Aligned Pedagogy
        </span>
        <h3 className="text-xl font-bold text-white">
          Curriculum Coverage & Digital Literacy Framework
        </h3>
        <p className="text-xs text-blue-200 leading-relaxed">
          Our curriculum modules match internationally recognized digital literacy benchmarks and secondary ICT curricula across East Africa and Sub-Saharan communities.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Computer Hardware & Architecture</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Operating Systems & File Trees</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Microsoft Office Suite Mastery</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Internet Browsing & Professional Email</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cybersecurity & Scam Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Digital Ethics & Netiquette</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onStartLearning}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
        >
          <span>Start Your First Lesson Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsEditorOpen(true)}
          className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all inline-flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Page Information</span>
        </button>
      </div>

      {/* Editor Modal */}
      <AboutEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
};
