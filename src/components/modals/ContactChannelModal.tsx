import React, { useState } from 'react';
import { X, Headphones, Check } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface ContactChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactChannelModal: React.FC<ContactChannelModalProps> = ({ isOpen, onClose }) => {
  const { addContactChannel } = useContent();

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState<'phone' | 'mail' | 'map' | 'message'>('phone');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !detail.trim()) return;

    addContactChannel({
      id: `chan-${Date.now()}`,
      title: title.trim(),
      detail: detail.trim(),
      description: description.trim() || 'Available to assist learners and educators.',
      iconName
    });

    setTitle('');
    setDetail('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Add Support Channel / Helpline</h3>
              <p className="text-[11px] text-slate-400">Add a contact phone number, email, or lab address</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Channel / Office Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Student WhatsApp Study Group"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Detail *</label>
              <input
                type="text"
                required
                value={detail}
                onChange={e => setDetail(e.target.value)}
                placeholder="e.g. +256 788 123456 or group link"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Icon Type</label>
              <select
                value={iconName}
                onChange={e => setIconName(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                <option value="phone">Phone / WhatsApp</option>
                <option value="mail">Email</option>
                <option value="map">Physical Address</option>
                <option value="message">Chat / Forum</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Operating Hours / Note</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. Available Monday to Friday, 8:00 AM - 5:00 PM East African Time"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" /> Save Channel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
