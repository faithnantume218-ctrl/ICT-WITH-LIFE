import React, { useState } from 'react';
import { Folder, FileText, Trash2, Plus, RefreshCw, HardDrive, CornerDownRight, Check, AlertCircle } from 'lucide-react';

interface SimulatedItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  extension?: string;
  size?: string;
  parent: string | null;
}

const INITIAL_ITEMS: SimulatedItem[] = [
  { id: 'f-school', name: 'My_School_Work', type: 'folder', parent: null },
  { id: 'f-term1', name: 'Term_1_Assignments', type: 'folder', parent: 'f-school' },
  { id: 'f-photos', name: 'Holiday_Photos', type: 'folder', parent: null },
  { id: 'doc-bio', name: 'Biology_Heart_Notes', type: 'file', extension: '.docx', size: '24 KB', parent: 'f-term1' },
  { id: 'doc-math', name: 'Math_Budget_Marksheet', type: 'file', extension: '.xlsx', size: '18 KB', parent: 'f-term1' },
  { id: 'doc-cert', name: 'ICT_Club_Certificate', type: 'file', extension: '.pdf', size: '140 KB', parent: 'f-school' },
  { id: 'pic-sports', name: 'Sports_Day_Camp', type: 'file', extension: '.jpg', size: '1.2 MB', parent: 'f-photos' },
];

export const FileExplorerSimulator: React.FC = () => {
  const [items, setItems] = useState<SimulatedItem[]>(INITIAL_ITEMS);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [recycleBin, setRecycleBin] = useState<SimulatedItem[]>([]);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const currentFolder = items.find(i => i.id === currentFolderId);
  const currentChildren = items.filter(i => i.parent === currentFolderId);

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newFolder: SimulatedItem = {
      id: `folder-${Date.now()}`,
      name: newFolderName.trim().replace(/\s+/g, '_'),
      type: 'folder',
      parent: currentFolderId,
    };

    setItems([...items, newFolder]);
    setNewFolderName('');
    setIsAddingFolder(false);
    showNotice(`Folder "${newFolder.name}" created successfully!`);
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = items.find(i => i.id === id);
    if (!itemToDelete) return;

    // Recursive delete children if folder
    const allToDeleteIds = new Set<string>([id]);
    const findSubIds = (parentId: string) => {
      items.filter(i => i.parent === parentId).forEach(sub => {
        allToDeleteIds.add(sub.id);
        if (sub.type === 'folder') findSubIds(sub.id);
      });
    };
    if (itemToDelete.type === 'folder') {
      findSubIds(id);
    }

    const toRecycle = items.filter(i => allToDeleteIds.has(i.id));
    setRecycleBin(prev => [...prev, ...toRecycle]);
    setItems(items.filter(i => !allToDeleteIds.has(i.id)));
    showNotice(`Moved to Recycle Bin. You can restore it if deleted by mistake.`);
  };

  const handleRestoreRecycleBin = () => {
    setItems(prev => [...prev, ...recycleBin]);
    setRecycleBin([]);
    showNotice('Restored items from Recycle Bin back into folder hierarchy!');
  };

  const showNotice = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const resetAll = () => {
    setItems(INITIAL_ITEMS);
    setCurrentFolderId(null);
    setRecycleBin([]);
    setFeedbackMsg('Reset file explorer to starting state.');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm my-6">
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-400" />
            Interactive Lab: Windows File Explorer Simulator
          </h4>
          <p className="text-xs text-slate-300">Practice creating folders, navigating directories, and understanding file extensions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetAll}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Explorer
          </button>
        </div>
      </div>

      {/* Explorer Address Bar & Actions */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-1.5 text-slate-700 bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-xs">
          <button
            onClick={() => setCurrentFolderId(null)}
            className={`font-semibold hover:text-blue-600 ${!currentFolderId ? 'text-blue-700 font-bold' : ''}`}
          >
            📁 Local Disk (C:)
          </button>
          {currentFolder && (
            <>
              <span className="text-slate-400">/</span>
              <span className="font-semibold text-slate-900">{currentFolder.name}</span>
            </>
          )}
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingFolder(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> New Folder
          </button>
          {recycleBin.length > 0 && (
            <button
              onClick={handleRestoreRecycleBin}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Restore ({recycleBin.length})
            </button>
          )}
        </div>
      </div>

      {feedbackMsg && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-xs text-blue-800 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Explorer View */}
      <div className="p-6">
        {/* Create Folder inline form */}
        {isAddingFolder && (
          <form onSubmit={handleCreateFolder} className="mb-4 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2 text-xs">
            <Folder className="w-5 h-5 text-amber-500 shrink-0" />
            <input
              type="text"
              value={newFolderName}
              onChange={e => setNewFolderName(e.target.value)}
              placeholder="e.g. Physics_Notes_Term2"
              className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <button type="submit" className="bg-emerald-600 text-white px-3 py-1.5 rounded font-medium hover:bg-emerald-700">
              Create
            </button>
            <button
              type="button"
              onClick={() => setIsAddingFolder(false)}
              className="text-slate-500 hover:text-slate-700 px-2 py-1.5"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Folder items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentFolderId !== null && (
            <button
              onClick={() => setCurrentFolderId(null)}
              className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-left transition-colors flex items-center gap-2 text-xs text-slate-600"
            >
              <CornerDownRight className="w-4 h-4 text-slate-400 rotate-180" />
              <span>.. (Up to Parent Folder)</span>
            </button>
          )}

          {currentChildren.map(item => (
            <div
              key={item.id}
              className="group p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all flex items-center justify-between gap-2"
            >
              {item.type === 'folder' ? (
                <button
                  onClick={() => setCurrentFolderId(item.id)}
                  className="flex items-center gap-2.5 text-left flex-1 min-w-0"
                >
                  <Folder className="w-7 h-7 text-amber-500 shrink-0 fill-amber-100" />
                  <div className="truncate">
                    <span className="block text-xs font-semibold text-slate-800 truncate">{item.name}</span>
                    <span className="text-[10px] text-slate-400">File folder</span>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-2.5 text-left flex-1 min-w-0">
                  <div className="w-7 h-7 rounded bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="truncate">
                    <span className="block text-xs font-semibold text-slate-800 truncate">
                      {item.name}{item.extension}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.extension} · {item.size}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDeleteItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-1 rounded transition-opacity"
                title="Delete to Recycle Bin"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {currentChildren.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-slate-400">
              This folder is currently empty. Click &quot;New Folder&quot; above to create one!
            </div>
          )}
        </div>

        {/* Explanatory Footer Card */}
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800">File Extension Tip:</span>
            <p className="mt-0.5">
              Notice the letters at the end: <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[11px]">.docx</code> opens in Microsoft Word, <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[11px]">.xlsx</code> opens in Microsoft Excel, and <code className="bg-white px-1 py-0.5 rounded border border-slate-200 font-mono text-[11px]">.pdf</code> opens in Adobe Reader or web browsers!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
