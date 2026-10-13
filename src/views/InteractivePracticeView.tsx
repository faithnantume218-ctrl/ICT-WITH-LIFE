import React, { useState } from 'react';
import { 
  Laptop, 
  Layers, 
  FolderTree, 
  FileSpreadsheet, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle,
  Play,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { PracticeChallengeModal } from '../components/modals/PracticeChallengeModal';
import { ComputerPartsExplorer } from '../components/widgets/ComputerPartsExplorer';
import { HardwareArchitectureViewer } from '../components/widgets/HardwareArchitectureViewer';
import { InputOutputSorter } from '../components/widgets/InputOutputSorter';
import { FileExplorerSimulator } from '../components/widgets/FileExplorerSimulator';
import { OfficeRibbonSimulator } from '../components/widgets/OfficeRibbonSimulator';
import { PhishingDetectorSimulator } from '../components/widgets/PhishingDetectorSimulator';

interface InteractivePracticeViewProps {
  onNavigateToQuizzes: () => void;
}

export const InteractivePracticeView: React.FC<InteractivePracticeViewProps> = ({ onNavigateToQuizzes }) => {
  const { practiceChallenges, deletePracticeChallenge } = useContent();
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);
  const [activeLab, setActiveLab] = useState<
    'parts' | 'internal' | 'sorter' | 'files' | 'office' | 'phishing'
  >('parts');

  const LABS = [
    {
      id: 'parts' as const,
      title: 'Workstation Anatomy',
      category: 'Computer Basics',
      icon: Laptop,
      description: 'Click parts of the desktop workstation: Monitor, System Unit, Keyboard, Mouse, and Ports.',
    },
    {
      id: 'internal' as const,
      title: 'Motherboard & CPU',
      category: 'Internal Hardware',
      icon: Sparkles,
      description: 'Explore the Motherboard, CPU (Brain), RAM (Desk), and SSD Storage drive.',
    },
    {
      id: 'sorter' as const,
      title: 'Device Sorter Game',
      category: 'Peripherals',
      icon: Layers,
      description: 'Interactive challenge: Categorize hardware into Input, Output, and Storage buckets.',
    },
    {
      id: 'files' as const,
      title: 'File Explorer Lab',
      category: 'Operating Systems',
      icon: FolderTree,
      description: 'Simulate Windows desktop: Create folders, test extensions (.docx, .pdf), and delete safely.',
    },
    {
      id: 'office' as const,
      title: 'Word & Excel Sandbox',
      category: 'Office Productivity',
      icon: FileSpreadsheet,
      description: 'Format text using the Word Ribbon and calculate student averages using Excel formulas.',
    },
    {
      id: 'phishing' as const,
      title: 'Cyber Detective Lab',
      category: 'Security & Safety',
      icon: ShieldAlert,
      description: 'Inspect realistic emails and detect scam red flags before clicking dangerous links.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-lg space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-mono border border-blue-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Interactive Learning Laboratories
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hands-On Computer Simulators
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          The best way to understand technology is by interacting with it. Test hardware setups, sort devices, navigate virtual file folders, calculate Excel formulas, and hunt for phishing scams.
        </p>
      </div>

      {/* Lab Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {LABS.map((lab) => {
          const Icon = lab.icon;
          const isActive = activeLab === lab.id;

          return (
            <button
              key={lab.id}
              onClick={() => setActiveLab(lab.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 shadow-xs ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102 ring-2 ring-blue-300'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${
                  isActive ? 'text-blue-100' : 'text-slate-400'
                }`}>
                  Lab
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold leading-snug">
                  {lab.title}
                </span>
                <span className={`text-[10px] block mt-0.5 line-clamp-1 ${
                  isActive ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {lab.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Lab Display */}
      <div className="transition-all">
        {activeLab === 'parts' && (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Workstation Lab</span>
              <h2 className="text-xl font-bold text-slate-900">Explore Desktop Computer Hardware & Cables</h2>
            </div>
            <ComputerPartsExplorer />
          </div>
        )}

        {activeLab === 'internal' && (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Internal Architecture</span>
              <h2 className="text-xl font-bold text-slate-900">Motherboard, CPU, RAM, and SSD Storage</h2>
            </div>
            <HardwareArchitectureViewer />
          </div>
        )}

        {activeLab === 'sorter' && (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Classification Game</span>
              <h2 className="text-xl font-bold text-slate-900">Input vs Output vs Storage Device Sorter</h2>
            </div>
            <InputOutputSorter />
          </div>
        )}

        {activeLab === 'files' && (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Operating Systems Practice</span>
              <h2 className="text-xl font-bold text-slate-900">Windows File Explorer & Folder Organizer</h2>
            </div>
            <FileExplorerSimulator />
          </div>
        )}

        {activeLab === 'office' && (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Productivity Sandbox</span>
              <h2 className="text-xl font-bold text-slate-900">Word Ribbon Formatting & Excel Formula Calculator</h2>
            </div>
            <OfficeRibbonSimulator />
          </div>
        )}

        {activeLab === 'phishing' && (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Cybersecurity Simulation</span>
              <h2 className="text-xl font-bold text-slate-900">Phishing Email Scanner & Fraud Detective</h2>
            </div>
            <PhishingDetectorSimulator />
          </div>
        )}
      </div>

      {/* Hands-On Challenges & Custom Lab Tasks with Add and Delete */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
              Hands-On Exercises · Customizable
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Interactive Lab Tasks & Practical Challenges
            </h3>
            <p className="text-xs text-slate-500">
              Try these hands-on computing tasks. You can add your own classroom lab exercises or delete challenges anytime.
            </p>
          </div>

          <button
            onClick={() => setIsChallengeModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Practice Challenge</span>
          </button>
        </div>

        {practiceChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {practiceChallenges.map(chall => (
              <div
                key={chall.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                      {chall.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        chall.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                        chall.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {chall.difficulty}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete challenge "${chall.title}"?`)) {
                            deletePracticeChallenge(chall.id);
                          }
                        }}
                        className="opacity-60 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Delete this challenge"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {chall.title}
                  </h4>

                  <div className="text-xs text-slate-600 space-y-1">
                    <span className="font-semibold text-slate-700 block">Task:</span>
                    <p className="leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200/80">
                      {chall.task}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Expected Outcome:</span>
                  <div className="flex items-start gap-1.5 text-emerald-700 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/60 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{chall.expectedResult}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400 italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No custom challenges added yet. Click "+ Add Practice Challenge" to add your own laboratory exercise!
          </div>
        )}
      </section>

      {/* Bottom Practice Banner linking to Quizzes */}
      <div className="bg-slate-100 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Want to test your theoretical knowledge?</h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Take our 10-Question Random Practice Assessment Test with multiple difficulty levels and instant explanations.
          </p>
        </div>
        <button
          onClick={onNavigateToQuizzes}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Take 10-Question Practice Test</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Practice Challenge Modal */}
      <PracticeChallengeModal
        isOpen={isChallengeModalOpen}
        onClose={() => setIsChallengeModalOpen(false)}
      />
    </div>
  );
};
