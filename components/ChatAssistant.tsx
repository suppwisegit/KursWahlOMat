import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, SelectionState } from '../types';
import { chatWithAssistant } from '../services/geminiService';

interface Props {
  currentSelection: SelectionState;
  apiKey: string;
}

const ChatAssistant: React.FC<Props> = ({ currentSelection, apiKey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hallo! Ich bin dein Kurswahl-Assistent für das Emmy. Hast du Fragen zu deiner Wahl oder den Regeln? Ich helfe dir gerne!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);

  const scrollToBottom = () => {
    // Prevent scrolling on initial render to avoid jumping page
    if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
        // Format history for Gemini SDK
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const response = await chatWithAssistant(history, userMsg, currentSelection, apiKey);
        setMessages(prev => [...prev, { role: 'model', text: response || "Entschuldigung, ich konnte keine Antwort generieren." }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Fehler beim Verbinden mit dem Assistenten. Bitte versuche es später noch einmal.", isError: true }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[450px] sm:h-[600px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-800 p-3 sm:p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 font-bold">
                 AI
             </div>
             <div>
                 <h3 className="font-bold text-white text-sm">Kurswahl Guide</h3>
                 <p className="text-[10px] sm:text-xs text-slate-400">Powered by Gemini</p>
             </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 scrollbar-hide bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-sm shadow-sm whitespace-pre-wrap ${
                msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-br-none' 
                : msg.isError 
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
            <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-slate-100 flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Frage stellen..."
            className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 border-0 rounded-full py-2.5 sm:py-3 pl-4 pr-12 text-sm sm:text-base focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-1 top-1 bottom-1 w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-full flex items-center justify-center text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;