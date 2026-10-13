import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  School, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Edit3, 
  Trash2,
  Phone,
  MapPin
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { FaqItem } from '../types/ict';
import { FaqEditorModal } from '../components/modals/FaqEditorModal';
import { ContactEditorModal } from '../components/modals/ContactEditorModal';

export const ContactView: React.FC = () => {
  const { faqs, contactInfo, deleteFaq } = useContent();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [topic, setTopic] = useState('question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Modals
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState<FaqItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleOpenAddFaq = () => {
    setFaqToEdit(null);
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FaqItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setFaqToEdit(faq);
    setIsFaqModalOpen(true);
  };

  const handleDeleteFaq = (faq: FaqItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete this FAQ: "${faq.q}"?`)) {
      deleteFaq(faq.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
          Get in Touch · Customizable
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Us & Teacher Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have a question about a lesson, want to suggest a new ICT topic, or need help integrating ICT Learning Hub into your school? Send us a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Thank you, {name}!</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Your inquiry has been received. Our educational support team will review your message promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Send an Inquiry or Feedback
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. David Mukasa"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. student@school.ac.ug"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    I am a...
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="student">Student / Pupil</option>
                    <option value="teacher">ICT Teacher / Instructor</option>
                    <option value="parent">Parent</option>
                    <option value="adult">Adult Beginner Learner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Topic
                  </label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="question">Question about a Lesson</option>
                    <option value="school">School Lab Collaboration</option>
                    <option value="suggestion">Curriculum Suggestion</option>
                    <option value="feedback">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Message or Question *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="How can we help your ICT learning journey?"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Support & Lab Partnership Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 relative">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <School className="w-5 h-5" />
              </div>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-xs bg-white/10 hover:bg-white/20 text-blue-200 px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors"
                title="Edit Contact Info"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Info
              </button>
            </div>

            <h3 className="text-base font-bold text-white">
              {contactInfo.organizationName}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              We welcome partnerships with primary and secondary schools across Uganda and other African communities. We offer curriculum lesson plans, downloadable offline revision packets, and teacher guides.
            </p>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-blue-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{contactInfo.email}</span>
              </div>
              {contactInfo.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{contactInfo.phone}</span>
                </div>
              )}
              {contactInfo.address && (
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{contactInfo.address}</span>
                </div>
              )}
              <p className="text-[11px] text-slate-500 pt-1">
                {contactInfo.responseTimeNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-900">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </div>

          <button
            onClick={handleOpenAddFaq}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Your Own FAQ</span>
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <div className="w-full p-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-900 bg-slate-50/60 hover:bg-slate-100 cursor-pointer">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex-1 text-left flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {/* FAQ action buttons */}
                  <div className="flex items-center gap-1 ml-2 shrink-0">
                    <button
                      onClick={e => handleOpenEditFaq(faq, e)}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={e => handleDeleteFaq(faq, e)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}

          {faqs.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No FAQs available. Click &quot;+ Add Your Own FAQ&quot; above to add questions!
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FaqEditorModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        faqToEdit={faqToEdit}
      />

      <ContactEditorModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};
