import React, { useState } from 'react';
import { X, User, School, Mail, LogIn, LogOut, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_PRESETS = [
  {
    name: 'Faith Nantume',
    email: 'faith.nantume@school.ac.ug',
    school: 'Kampala Secondary School',
    role: 'student' as const,
    avatar: '👩‍🎓',
  },
  {
    name: 'David Okello',
    email: 'david.okello@primary.ac.ug',
    school: 'Gulu Primary Seven',
    role: 'student' as const,
    avatar: '👦',
  },
  {
    name: 'Grace Achieng',
    email: 'teacher.grace@edu.ac.ug',
    school: 'Jinja Modern High School',
    role: 'teacher' as const,
    avatar: '👩‍🏫',
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { student, updateProfile, loginAsUser, logoutToGuest, resetAllProgress } = useStudent();
  const [tab, setTab] = useState<'profile' | 'switch'>('profile');

  // Form states
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [school, setSchool] = useState(student.schoolOrCity);
  const [avatar, setAvatar] = useState(student.avatar || '👩‍🎓');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || 'Learner',
      email: email.trim(),
      schoolOrCity: school.trim() || 'Community Student',
      avatar,
    });
    onClose();
  };

  const handleSelectPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setName(preset.name);
    setEmail(preset.email);
    setSchool(preset.school);
    setAvatar(preset.avatar);
    loginAsUser(preset.name, preset.email, preset.school);
    onClose();
  };

  const AVATARS = ['👩‍🎓', '👨‍🎓', '👦', '👧', '👩‍🏫', '👨‍🏫', '🚀', '💻', '🌟'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Student Account & Progress</h3>
              <p className="text-[11px] text-slate-300">Local storage persistence active</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setTab('profile')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              tab === 'profile'
                ? 'border-blue-600 text-blue-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setTab('switch')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              tab === 'switch'
                ? 'border-blue-600 text-blue-700 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Switch Preset Account
          </button>
        </div>

        {tab === 'profile' ? (
          <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
            {/* Avatar picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Select Avatar Emoji
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-transform ${
                      avatar === av
                        ? 'bg-blue-100 ring-2 ring-blue-600 scale-110 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Student Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Faith Nantume"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. faith.nantume@school.ac.ug"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* School / Institution */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                School, Grade or Community
              </label>
              <input
                type="text"
                value={school}
                onChange={e => setSchool(e.target.value)}
                placeholder="e.g. Kampala Secondary School / S.4"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Save Account Details
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all completed lessons and quiz scores?')) {
                    resetAllProgress();
                    onClose();
                  }
                }}
                className="text-rose-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset My Progress
              </button>
              <span>{student.completedLessons.length} lessons completed</span>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Switch immediately to a student or teacher profile to experience how ICT Learning Hub customizes certificates, progress, and badges:
            </p>

            <div className="space-y-2.5">
              {DEMO_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(p)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-1.5 bg-slate-100 rounded-lg">{p.avatar}</span>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-blue-700">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {p.school} · {p.role}
                      </span>
                    </div>
                  </div>
                  <LogIn className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 text-center">
              <button
                onClick={logoutToGuest}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Continue as anonymous guest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
