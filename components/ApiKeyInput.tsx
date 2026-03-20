import React, { useState } from 'react';

interface Props {
  onApiKeySubmit: (key: string) => void;
}

const ApiKeyInput: React.FC<Props> = ({ onApiKeySubmit }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('Bitte akzeptiere die Datenschutzbestimmungen und AGB, um fortzufahren.');
      return;
    }
    if (!inputKey.trim() || !inputKey.startsWith('AIza')) {
      setError('Bitte gib einen gültigen Gemini API Key ein (beginnt mit AIza).');
      return;
    }
    onApiKeySubmit(inputKey.trim());
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-md w-full border border-slate-200 animate-fade-in">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-6 mx-auto transform -rotate-3">
           EN
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Kurswahl-Assistent</h2>
        <p className="text-center text-slate-500 text-sm mb-8 px-2">
          Verwende deinen <span className="text-blue-600 font-bold">kostenlosen</span> Google API Key, um die KI-Analyse zu starten.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Dein Gemini API Key</label>
            <input 
              type="password"
              value={inputKey}
              onChange={(e) => {
                  setInputKey(e.target.value);
                  setError('');
              }}
              placeholder="AIza..."
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition-all text-slate-800 font-mono text-sm"
            />
          </div>
          
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-start pt-0.5">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (e.target.checked && error.includes('Datenschutzbestimmungen')) setError('');
                  }}
                  className="w-5 h-5 rounded-md border-2 border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer group-hover:border-blue-500"
                />
              </div>
              <span className="text-xs text-slate-600 leading-relaxed font-medium">
                Ich habe die <a href="https://github.com/Dein-Username/KursWahlOMat/blob/main/PrivacyPolicy.md" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Datenschutzerklärung</a> und die <a href="https://github.com/Dein-Username/KursWahlOMat/blob/main/TermsOfService.md" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AGB</a> gelesen und akzeptiere diese Bedingungen bezüglich der KI-Datenverarbeitung.
              </span>
            </label>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
               {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transform active:scale-[0.97] transition-all text-lg"
          >
            App starten
          </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-50 pt-6">
          <p className="text-xs text-slate-400 mb-3 font-medium">Noch keinen kostenlosen Key?</p>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 font-black text-sm hover:underline bg-blue-50 px-4 py-2 rounded-full"
          >
            Key gratis erstellen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <div className="mt-6 flex flex-col gap-1">
             <p className="text-[9px] text-slate-300 uppercase tracking-widest font-bold">Datenschutz-Garantie</p>
             <p className="text-[10px] text-slate-400 italic">
                Dein Key wird ausschließlich lokal auf diesem Gerät gespeichert und niemals an uns übertragen.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyInput;