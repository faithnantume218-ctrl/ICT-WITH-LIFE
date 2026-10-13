import React from 'react';
import { Laptop, Heart, Mail, MapPin, ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  ICT <span className="text-blue-400">Learning Hub</span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">Digital Literacy for Beginners</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Helping primary & secondary school students, teachers, and beginners learn Information and Communication Technology through clear explanations, interactive diagrams, and real-life examples.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free · Accessible · Offline-Friendly Curriculum</span>
            </div>
          </div>

          {/* Quick Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Core Topics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-400 transition-colors">
                  Computer Basics & Hardware
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-400 transition-colors">
                  Input & Output Devices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-400 transition-colors">
                  Operating Systems & Files
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-400 transition-colors">
                  Microsoft Word & Excel
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-400 transition-colors">
                  Internet & Email Skills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-blue-400 transition-colors">
                  Cybersecurity & Privacy
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Practice & Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-400 transition-colors">
                  Workstation Parts Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-400 transition-colors">
                  Device Sorter Game
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-400 transition-colors">
                  File Explorer Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-400 transition-colors">
                  Office Formulas Sandbox
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('practice')} className="hover:text-blue-400 transition-colors">
                  Phishing Email Detective
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quizzes')} className="hover:text-blue-400 transition-colors">
                  10-Question Practice Test
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-blue-400 transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('glossary')} className="hover:text-blue-400 transition-colors">
                  ICT Terms Glossary
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">
                  About Our Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">
                  Contact & Teacher Help
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ICT Learning Hub. Built for learners and schools everywhere.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:underline">
              Curriculum Guidelines
            </button>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:underline">
              Student Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
