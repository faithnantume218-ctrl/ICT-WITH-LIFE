import React, { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, HardDrive, RefreshCw, CheckCircle2, XCircle, Award, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { DeviceEditorModal } from '../modals/DeviceEditorModal';

export const InputOutputSorter: React.FC = () => {
  const { sorterDevices, deleteSorterDevice } = useContent();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(sorterDevices[0]?.id || null);
  const [placedItems, setPlacedItems] = useState<Record<string, 'input' | 'output' | 'storage'>>({});
  const [resultsShown, setResultsShown] = useState<boolean>(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  const currentItem = sorterDevices.find(item => item.id === selectedItemId);

  const handlePlace = (category: 'input' | 'output' | 'storage') => {
    if (!selectedItemId) return;
    setPlacedItems(prev => ({ ...prev, [selectedItemId]: category }));
    
    // Find next unplaced item
    const nextUnplaced = sorterDevices.find(item => item.id !== selectedItemId && !placedItems[item.id]);
    setSelectedItemId(nextUnplaced ? nextUnplaced.id : null);
  };

  const resetGame = () => {
    setPlacedItems({});
    setSelectedItemId(sorterDevices[0]?.id || null);
    setResultsShown(false);
  };

  const getScore = () => {
    let score = 0;
    sorterDevices.forEach(item => {
      if (placedItems[item.id] === item.correctCategory) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="text-xl">🎮</span> Interactive Lab: Input vs Output vs Storage
          </h4>
          <p className="text-xs text-slate-300">Sort each peripheral hardware device into its correct category</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDeviceModalOpen(true)}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Add Device
          </button>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-md border border-slate-700">
            Sorted: {Object.keys(placedItems).length} / {sorterDevices.length}
          </span>
          <button
            onClick={resetGame}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 rounded-md transition-colors flex items-center gap-1"
            title="Reset Game"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Active item to sort prompt */}
        {currentItem ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="text-3xl p-2 bg-white rounded-lg shadow-xs border border-blue-100">
                {currentItem.iconLabel}
              </span>
              <div>
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Device to Categorize</span>
                <h5 className="text-lg font-bold text-slate-900">{currentItem.name}</h5>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handlePlace('input')}
                className="px-3.5 py-2 bg-white hover:bg-blue-600 hover:text-white border border-blue-300 text-blue-800 font-semibold text-xs rounded-lg transition-all shadow-xs flex items-center gap-1.5"
              >
                <ArrowDownRight className="w-4 h-4 text-blue-500" />
                Input Device
              </button>
              <button
                onClick={() => handlePlace('output')}
                className="px-3.5 py-2 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-300 text-emerald-800 font-semibold text-xs rounded-lg transition-all shadow-xs flex items-center gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                Output Device
              </button>
              <button
                onClick={() => handlePlace('storage')}
                className="px-3.5 py-2 bg-white hover:bg-purple-600 hover:text-white border border-purple-300 text-purple-800 font-semibold text-xs rounded-lg transition-all shadow-xs flex items-center gap-1.5"
              >
                <HardDrive className="w-4 h-4 text-purple-500" />
                Storage Device
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <div>
                <h5 className="font-bold text-slate-900">All Devices Categorized!</h5>
                <p className="text-xs text-slate-600">Review your placements below or check results</p>
              </div>
            </div>
            {!resultsShown && (
              <button
                onClick={() => setResultsShown(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" /> Check Score & Explanations
              </button>
            )}
          </div>
        )}

        {/* The 3 Sorting Buckets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Input Bucket */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-blue-200">
              <span className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                <ArrowDownRight className="w-4 h-4 text-blue-600" />
                Input Devices
              </span>
              <span className="text-xs text-blue-700 font-medium bg-blue-100 px-2 py-0.5 rounded">
                Sends data IN
              </span>
            </div>

            <div className="space-y-2 flex-1 min-h-[140px]">
              {sorterDevices.filter(item => placedItems[item.id] === 'input').map(item => {
                const isCorrect = item.correctCategory === 'input';
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 bg-white ${
                      resultsShown
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900'
                          : 'border-rose-300 bg-rose-50/40 text-rose-900'
                        : 'border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold block">{item.iconLabel} {item.name}</span>
                        <button
                          onClick={() => deleteSorterDevice(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 rounded"
                          title="Delete this device from lab"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {resultsShown && (
                        <p className="text-[11px] mt-1 text-slate-600">{item.explanation}</p>
                      )}
                    </div>
                    {resultsShown && (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )
                    )}
                  </div>
                );
              })}
              {sorterDevices.filter(item => placedItems[item.id] === 'input').length === 0 && (
                <div className="text-center text-xs text-slate-400 py-8 italic">
                  No devices placed here yet
                </div>
              )}
            </div>
          </div>

          {/* Output Bucket */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-200">
              <span className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                Output Devices
              </span>
              <span className="text-xs text-emerald-700 font-medium bg-emerald-100 px-2 py-0.5 rounded">
                Sends data OUT
              </span>
            </div>

            <div className="space-y-2 flex-1 min-h-[140px]">
              {sorterDevices.filter(item => placedItems[item.id] === 'output').map(item => {
                const isCorrect = item.correctCategory === 'output';
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 bg-white ${
                      resultsShown
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900'
                          : 'border-rose-300 bg-rose-50/40 text-rose-900'
                        : 'border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold block">{item.iconLabel} {item.name}</span>
                        <button
                          onClick={() => deleteSorterDevice(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 rounded"
                          title="Delete this device from lab"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {resultsShown && (
                        <p className="text-[11px] mt-1 text-slate-600">{item.explanation}</p>
                      )}
                    </div>
                    {resultsShown && (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )
                    )}
                  </div>
                );
              })}
              {sorterDevices.filter(item => placedItems[item.id] === 'output').length === 0 && (
                <div className="text-center text-xs text-slate-400 py-8 italic">
                  No devices placed here yet
                </div>
              )}
            </div>
          </div>

          {/* Storage Bucket */}
          <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-purple-200">
              <span className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-purple-600" />
                Storage Devices
              </span>
              <span className="text-xs text-purple-700 font-medium bg-purple-100 px-2 py-0.5 rounded">
                Holds data SAFE
              </span>
            </div>

            <div className="space-y-2 flex-1 min-h-[140px]">
              {sorterDevices.filter(item => placedItems[item.id] === 'storage').map(item => {
                const isCorrect = item.correctCategory === 'storage';
                return (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 bg-white ${
                      resultsShown
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40 text-emerald-900'
                          : 'border-rose-300 bg-rose-50/40 text-rose-900'
                        : 'border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold block">{item.iconLabel} {item.name}</span>
                        <button
                          onClick={() => deleteSorterDevice(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 rounded"
                          title="Delete this device from lab"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      {resultsShown && (
                        <p className="text-[11px] mt-1 text-slate-600">{item.explanation}</p>
                      )}
                    </div>
                    {resultsShown && (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )
                    )}
                  </div>
                );
              })}
              {sorterDevices.filter(item => placedItems[item.id] === 'storage').length === 0 && (
                <div className="text-center text-xs text-slate-400 py-8 italic">
                  No devices placed here yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Banner */}
        {resultsShown && (
          <div className="mt-6 bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Lab Evaluation</span>
              <h5 className="text-lg font-bold text-white">
                You scored {getScore()} out of {sorterDevices.length}!
              </h5>
              <p className="text-xs text-slate-300 mt-0.5">
                {getScore() === sorterDevices.length
                  ? 'Outstanding! You mastered Input, Output, and Storage peripherals.'
                  : 'Good attempt! Review the explanations above to see why certain devices belong to their categories.'}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors shrink-0"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <DeviceEditorModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
      />
    </div>
  );
};
