import React, { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, FileSpreadsheet, FileText, Check, Calculator } from 'lucide-react';

export const OfficeRibbonSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'word' | 'excel'>('word');

  // Word state
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [fontSize, setFontSize] = useState('16');
  const [wordText, setWordText] = useState(
    'ICT Learning Hub helps students in primary and secondary schools build computer confidence. We learn how to format text, organize files, and stay safe online!'
  );

  // Excel state
  const [scores, setScores] = useState({
    math: 85,
    science: 92,
    english: 78,
    ict: 95
  });

  const sumTotal = scores.math + scores.science + scores.english + scores.ict;
  const averageTotal = (sumTotal / 4).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-xl">📊</span> Interactive Lab: Office Suite Sandbox
          </h4>
          <p className="text-xs text-slate-300">Test Microsoft Word formatting ribbon tools or Microsoft Excel dynamic formulas</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setActiveTab('word')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'word' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Microsoft Word
          </button>
          <button
            onClick={() => setActiveTab('excel')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'excel' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Microsoft Excel
          </button>
        </div>
      </div>

      {activeTab === 'word' ? (
        <div className="p-6">
          {/* Simulated Word Ribbon */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-2.5 mb-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
              <button
                onClick={() => setIsBold(!isBold)}
                className={`p-1.5 rounded transition-colors ${isBold ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Bold (Ctrl+B)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsItalic(!isItalic)}
                className={`p-1.5 rounded transition-colors ${isItalic ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Italic (Ctrl+I)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsUnderline(!isUnderline)}
                className={`p-1.5 rounded transition-colors ${isUnderline ? 'bg-blue-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Underline (Ctrl+U)"
              >
                <Underline className="w-4 h-4" />
              </button>
            </div>

            {/* Font size */}
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500">Size:</span>
              <select
                value={fontSize}
                onChange={e => setFontSize(e.target.value)}
                className="text-xs font-semibold bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                <option value="14">14 pt</option>
                <option value="16">16 pt</option>
                <option value="20">20 pt (Heading)</option>
                <option value="24">24 pt (Title)</option>
              </select>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
              <button
                onClick={() => setAlignment('left')}
                className={`p-1.5 rounded ${alignment === 'left' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAlignment('center')}
                className={`p-1.5 rounded ${alignment === 'center' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAlignment('right')}
                className={`p-1.5 rounded ${alignment === 'right' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAlignment('justify')}
                className={`p-1.5 rounded ${alignment === 'justify' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                title="Justify"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Word Paper Document */}
          <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 flex justify-center">
            <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 min-h-[180px] border border-slate-200">
              <p
                style={{
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: isUnderline ? 'underline' : 'none',
                  textAlign: alignment,
                  fontSize: `${fontSize}px`,
                  lineHeight: 1.6,
                }}
                className="text-slate-800 transition-all font-sans"
              >
                {wordText}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3 text-center">
            Try clicking Bold, Italic, Underline, and changing alignment above to observe how Word transforms paragraphs!
          </p>
        </div>
      ) : (
        <div className="p-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">Dynamic Formulas Active:</span>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-emerald-700 font-mono">
                =SUM(B2:B5)
              </code>
              <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-blue-700 font-mono">
                =AVERAGE(B2:B5)
              </code>
            </div>
            <span className="text-slate-500 text-[11px]">Edit any student mark below!</span>
          </div>

          {/* Excel Grid Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 font-mono">
                <tr>
                  <th className="p-2.5 w-12 text-center bg-slate-200/60 border-r border-slate-300">#</th>
                  <th className="p-2.5 font-bold border-r border-slate-200">A (Subject / Course)</th>
                  <th className="p-2.5 font-bold border-r border-slate-200 w-36">B (Mark / 100)</th>
                  <th className="p-2.5 font-bold">C (Status)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="p-2 text-center bg-slate-100 text-slate-500 font-mono border-r border-slate-200">2</td>
                  <td className="p-2 font-medium text-slate-800 border-r border-slate-200">Mathematics</td>
                  <td className="p-2 border-r border-slate-200">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores.math}
                      onChange={e => setScores({ ...scores, math: Number(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-2 text-emerald-700 font-medium">Passed</td>
                </tr>
                <tr>
                  <td className="p-2 text-center bg-slate-100 text-slate-500 font-mono border-r border-slate-200">3</td>
                  <td className="p-2 font-medium text-slate-800 border-r border-slate-200">General Science</td>
                  <td className="p-2 border-r border-slate-200">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores.science}
                      onChange={e => setScores({ ...scores, science: Number(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-2 text-emerald-700 font-medium">Passed</td>
                </tr>
                <tr>
                  <td className="p-2 text-center bg-slate-100 text-slate-500 font-mono border-r border-slate-200">4</td>
                  <td className="p-2 font-medium text-slate-800 border-r border-slate-200">English Language</td>
                  <td className="p-2 border-r border-slate-200">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores.english}
                      onChange={e => setScores({ ...scores, english: Number(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-2 text-emerald-700 font-medium">Passed</td>
                </tr>
                <tr>
                  <td className="p-2 text-center bg-slate-100 text-slate-500 font-mono border-r border-slate-200">5</td>
                  <td className="p-2 font-medium text-slate-800 border-r border-slate-200">ICT & Computer Studies</td>
                  <td className="p-2 border-r border-slate-200">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={scores.ict}
                      onChange={e => setScores({ ...scores, ict: Number(e.target.value) || 0 })}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-2 text-emerald-700 font-medium">Distinction</td>
                </tr>
                {/* Formulas Total Row */}
                <tr className="bg-emerald-50/70 font-bold text-emerald-950 border-t-2 border-emerald-300">
                  <td className="p-2 text-center bg-emerald-100/60 font-mono border-r border-slate-200">6</td>
                  <td className="p-2 border-r border-slate-200">TOTAL (=SUM(B2:B5))</td>
                  <td className="p-2 font-mono text-emerald-800 text-sm border-r border-slate-200">{sumTotal} / 400</td>
                  <td className="p-2 text-emerald-700">Calculated Automatically</td>
                </tr>
                <tr className="bg-blue-50/70 font-bold text-blue-950">
                  <td className="p-2 text-center bg-blue-100/60 font-mono border-r border-slate-200">7</td>
                  <td className="p-2 border-r border-slate-200">AVERAGE (=AVERAGE(B2:B5))</td>
                  <td className="p-2 font-mono text-blue-800 text-sm border-r border-slate-200">{averageTotal}%</td>
                  <td className="p-2 text-blue-700">Mean Score</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
