import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Award, ExternalLink } from 'lucide-react';

interface Scenario {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  timestamp: string;
  body: string;
  linkPreview?: string;
  isPhishing: boolean;
  redFlags: string[];
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'scen-1',
    senderName: 'Centenary Bank Security Alerts',
    senderEmail: 'security-alerts@centenary-bank-verify99.net',
    subject: 'URGENT: Your Account Has Been Locked! Verify Within 2 Hours',
    timestamp: 'Today, 08:14 AM',
    body: 'Dear Customer,\n\nWe detected suspicious activity on your mobile banking account. Your account has been temporarily restricted. To avoid permanent deletion, click the secure verification link below immediately and enter your account number, PIN, and national ID.\n\nFailure to do so will result in permanent closure.',
    linkPreview: 'http://centenary-bank-verify99.net/login-pin-reset',
    isPhishing: true,
    redFlags: [
      'Fake sender domain (@centenary-bank-verify99.net instead of official bank domain)',
      'High-pressure artificial urgency ("Within 2 Hours" or "permanent closure")',
      'Asking for secret banking PIN and credentials via web link (Banks NEVER ask for PINs via email)',
      'Unsecured HTTP link instead of official HTTPS'
    ],
    explanation: 'This is a classic financial phishing scam. Legitimate banks will never send urgent emails threatening to delete accounts or asking for your secret ATM / mobile money PIN.'
  },
  {
    id: 'scen-2',
    senderName: 'Gayaza High School ICT Department',
    senderEmail: 'ict-director@gayazahs.sc.ug',
    subject: 'Term 3 Computer Lab Timetable & ICT Club Registration',
    timestamp: 'Yesterday, 02:30 PM',
    body: 'Dear Students and Parents,\n\nPlease find attached the scheduled practical laboratory timetable for Senior 1 through Senior 4 for Term 3. ICT Club orientation will be held this Friday in Lab 2 during the lunch break.\n\nNo passwords or payments are required. Have a wonderful learning week.',
    linkPreview: 'https://gayazahs.sc.ug/portal/lab-timetable.pdf',
    isPhishing: false,
    redFlags: [
      'None! Official institutional domain (.sc.ug)',
      'Respectful, calm tone with no false panic',
      'Provides informational PDF link on verified HTTPS website',
      'Explicitly clarifies no payment or passwords needed'
    ],
    explanation: 'This is a legitimate, authentic school communication. Notice the official school domain (.sc.ug), the absence of aggressive urgency, and zero requests for sensitive credentials.'
  },
  {
    id: 'scen-3',
    senderName: 'International Telecom Prize Promotion',
    senderEmail: 'lottery-winner@free-prize-bonus.xyz',
    subject: 'CONGRATULATIONS! You Won UGX 50,000,000 Cash Prize!!!',
    timestamp: 'Today, 11:02 AM',
    body: 'WINNER NOTIFICATION:\n\nYour mobile number was selected in our international telecommunications anniversary draw! You have won UGX 50,000,000 in cash. To release your funds, download the winner validation app attached below or click to confirm your bank account.',
    linkPreview: 'http://free-prize-bonus.xyz/claim-50m-now.exe',
    isPhishing: true,
    redFlags: [
      'You cannot win a lottery or prize you never entered!',
      'Sender uses cheap spam domain (@free-prize-bonus.xyz)',
      'Dangerous executable download link ending in ".exe"',
      'ALL CAPS exaggerated subject line with multiple exclamation marks'
    ],
    explanation: 'Advance-fee and fake lottery scam. Attackers lure victims with giant imaginary cash prizes to install malware (.exe) or demand "processing fees".'
  }
];

export const PhishingDetectorSimulator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, boolean>>({}); // scenarioId -> chosePhishing
  const [reviewed, setReviewed] = useState(false);

  const scenario = SCENARIOS[currentIndex];
  const totalScenarios = SCENARIOS.length;
  const isAnswered = decisions[scenario.id] !== undefined;

  const handleDecision = (chosePhishing: boolean) => {
    setDecisions(prev => ({ ...prev, [scenario.id]: chosePhishing }));
  };

  const getScore = () => {
    let score = 0;
    SCENARIOS.forEach(sc => {
      if (decisions[sc.id] === sc.isPhishing) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setDecisions({});
    setCurrentIndex(0);
    setReviewed(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            Cyber Detective: Safe vs Phishing Email Scanner
          </h4>
          <p className="text-xs text-slate-300">Inspect simulated digital messages, spot warning signs, and declare safe or phishing</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">
            Case {currentIndex + 1} of {totalScenarios}
          </span>
          <button
            onClick={handleReset}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 rounded-md transition-colors"
            title="Reset Detective Cases"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Email Header Simulation */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div>
                <span className="text-slate-400 font-medium">From: </span>
                <span className="font-bold text-slate-900">{scenario.senderName} </span>
                <span className="text-slate-500 font-mono">({scenario.senderEmail})</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{scenario.timestamp}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Subject: </span>
              <span className="font-bold text-slate-900 text-sm">{scenario.subject}</span>
            </div>
          </div>

          {/* Email Body */}
          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
            {scenario.body}
          </div>

          {/* Suspicious Link Simulation */}
          {scenario.linkPreview && (
            <div className="mt-4 p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs font-mono text-amber-900 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="truncate">Link: {scenario.linkPreview}</span>
            </div>
          )}
        </div>

        {/* Action Decision Buttons */}
        {!isAnswered ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-4">
            <button
              onClick={() => handleDecision(false)}
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Mark as Legitimate & Safe
            </button>
            <button
              onClick={() => handleDecision(true)}
              className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" /> Mark as Dangerous Phishing Scam
            </button>
          </div>
        ) : (
          <div className="my-4 space-y-3">
            {decisions[scenario.id] === scenario.isPhishing ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-emerald-950 text-sm">Correct Analysis!</h5>
                  <p className="text-xs text-emerald-900 mt-1">{scenario.explanation}</p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-rose-950 text-sm">
                    {scenario.isPhishing ? 'Careful! This was a Phishing Scam.' : 'Not Quite! This was actually a Safe Email.'}
                  </h5>
                  <p className="text-xs text-rose-900 mt-1">{scenario.explanation}</p>
                </div>
              </div>
            )}

            {/* Red flags list */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
              <span className="font-bold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Key Clues & Indicators:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {scenario.redFlags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                ← Previous Case
              </button>

              {currentIndex < totalScenarios - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  Next Case →
                </button>
              ) : (
                <button
                  onClick={() => setReviewed(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-amber-400" /> Finish Investigation
                </button>
              )}
            </div>
          </div>
        )}

        {/* Final Score Banner if reviewed */}
        {reviewed && (
          <div className="mt-6 bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-amber-400 uppercase tracking-wider block font-semibold">Detective Report Complete</span>
              <h5 className="text-lg font-bold text-white mt-0.5">
                Final Score: {getScore()} / {totalScenarios}
              </h5>
              <p className="text-xs text-slate-300 mt-0.5">
                {getScore() === totalScenarios
                  ? 'Impressive! You spotted all the phishing traps and protected your data.'
                  : 'Good work! Review the red flags again to stay sharp against real-world online fraudsters.'}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors shrink-0"
            >
              Restart Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
