import React from 'react';
import { X, Printer, Award, CheckCircle, ShieldCheck, Download, Share2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  const { student } = useStudent();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const certificateId = `ICT-HUB-2026-${(student.name.length * 1337 + 42).toString(16).toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Controls bar */}
        <div className="no-print bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Certificate of Achievement Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-8 sm:p-12 bg-linear-to-b from-amber-50/40 via-white to-blue-50/30 flex justify-center">
          <div className="w-full border-8 border-double border-blue-900 rounded-xl p-8 sm:p-10 bg-white relative shadow-lg text-center font-serif">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-600" />

            {/* Header / Logo */}
            <div className="mb-4">
              <span className="text-3xl">🎓</span>
              <h2 className="text-xs font-sans font-extrabold uppercase tracking-widest text-blue-900 mt-1">
                ICT Learning Hub · Global Digital Literacy Initiative
              </h2>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 font-serif">
                Certificate of Fundamental ICT Competency
              </h1>
            </div>

            <p className="text-xs font-sans text-slate-600 italic mt-3">
              This certificate is proudly awarded to:
            </p>

            {/* Recipient Name */}
            <div className="my-4 pb-2 border-b-2 border-slate-300 max-w-md mx-auto">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif">
                {student.name}
              </span>
              {student.schoolOrCity && (
                <span className="block text-xs font-sans text-slate-500 mt-1">
                  {student.schoolOrCity}
                </span>
              )}
            </div>

            {/* Citation Statement */}
            <p className="text-xs sm:text-sm font-sans text-slate-700 max-w-lg mx-auto leading-relaxed mt-4">
              For successfully demonstrating practical digital literacy and understanding in Computer Fundamentals, Hardware & Software Architecture, Operating Systems, File Management, Microsoft Office Productivity Tools, Internet Safety, and Cybersecurity.
            </p>

            {/* Stats Badge */}
            <div className="my-6 flex flex-wrap items-center justify-center gap-6 text-xs font-sans text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{student.completedLessons.length} Lessons Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>{student.totalPoints} Learning Points</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Verified Curriculum</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 items-end gap-4 text-xs font-sans">
              <div>
                <div className="font-serif italic text-base text-slate-800">David S. Mukasa</div>
                <div className="h-0.5 bg-slate-300 w-32 mx-auto my-1" />
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  Lead ICT Instructor
                </span>
              </div>

              {/* Gold Seal Graphic */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-linear-to-tr from-amber-500 to-yellow-300 border-2 border-amber-600 shadow-md flex items-center justify-center text-white">
                  <Award className="w-7 h-7 text-amber-900" />
                </div>
                <span className="text-[9px] font-mono font-bold text-amber-900 mt-1">
                  OFFICIAL SEAL
                </span>
              </div>

              <div>
                <div className="font-serif italic text-base text-slate-800">Dr. Claire Nalubega</div>
                <div className="h-0.5 bg-slate-300 w-32 mx-auto my-1" />
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  Director of Education
                </span>
              </div>
            </div>

            {/* Verification Serial Footer */}
            <div className="mt-6 pt-3 text-[10px] font-mono text-slate-400 flex flex-wrap items-center justify-between">
              <span>Date of Issue: {issueDate}</span>
              <span>Serial ID: {certificateId}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Tip: Select &quot;Save as PDF&quot; in the print dialog to download a high-res PDF copy to your computer.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
