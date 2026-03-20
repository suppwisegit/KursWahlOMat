import React, { useState, useEffect } from 'react';
import CourseSelector from './components/CourseSelector';
import ChatAssistant from './components/ChatAssistant';
import Overview from './components/Overview';
import ApiKeyInput from './components/ApiKeyInput';
import { SelectionState, ValidationResult, GeneratedPlan } from './types';
import { validateSelectionWithAI } from './services/geminiService';

const initialSelection: SelectionState = {
  lf1: "",
  lf2: "",
  pf3: "",
  pf4: "",
  pk5_ref: "",
  pk5_bez: ""
};

const ProgressBar = () => (
  <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden relative">
    <div className="bg-blue-600 h-2 rounded-full absolute top-0 left-0 w-full animate-progress-indeterminate origin-left"></div>
    <style>{`
      @keyframes progress-indeterminate {
        0% { transform: translateX(-100%) scaleX(0.2); }
        50% { transform: translateX(0%) scaleX(0.5); }
        100% { transform: translateX(100%) scaleX(0.2); }
      }
      .animate-progress-indeterminate {
        animation: progress-indeterminate 1.8s infinite ease-in-out;
      }
    `}</style>
  </div>
);

export default function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [selection, setSelection] = useState<SelectionState>(initialSelection);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load API Key from localStorage on startup
  useEffect(() => {
    const storedKey = localStorage.getItem('emmy_api_key');
    if (storedKey) {
        setApiKey(storedKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
      setApiKey(key);
      localStorage.setItem('emmy_api_key', key);
  };

  const handleClearKey = () => {
      setApiKey(null);
      localStorage.removeItem('emmy_api_key');
      setGeneratedPlan(null);
      setValidation(null);
  }

  const handleSelectionChange = (field: keyof SelectionState, value: string) => {
    setSelection(prev => ({ ...prev, [field]: value }));
    if(validation) {
        setValidation(null); 
        setGeneratedPlan(null);
        setErrorMsg(null);
    }
  };

  const handleValidation = async () => {
    if (!apiKey) return;

    // Check if at least some fields are filled
    if (!selection.lf1 || !selection.lf2) {
        setErrorMsg("Bitte wähle mindestens beide Leistungskurse aus.");
        return;
    }

    setIsAnalysing(true);
    setErrorMsg(null);
    setValidation(null);
    
    try {
        const result = await validateSelectionWithAI(selection, apiKey);
        setValidation(result);
        if (result.generatedPlan) {
            setGeneratedPlan(result.generatedPlan);
        }
        
        // If the API returned a custom error message
        if (result.messages.length > 0 && result.messages[0].includes("Timeout")) {
            setErrorMsg(result.messages[0]);
        }
    } catch (err) {
        setErrorMsg("Netzwerkfehler. Bitte prüfe deine Internetverbindung und deinen API Key.");
    } finally {
        setIsAnalysing(false);
    }
  };

  if (!apiKey) {
      return <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
               EN
             </div>
             <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">Emmy-Kurswahl-O-Mat</h1>
                <p className="text-xs text-slate-500">Oberstufen Kurswahl-Helfer</p>
             </div>
          </div>
          <button onClick={handleClearKey} className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase tracking-wider">
              Key entfernen
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 transition-all">
              <CourseSelector 
                selection={selection} 
                onChange={handleSelectionChange} 
                validationRowId={validation?.rowId || null}
              />
              
              <div className="mt-8 pt-6 border-t border-slate-100">
                {isAnalysing && (
                    <div className="mb-6 animate-pulse">
                        <ProgressBar />
                        <p className="text-center text-sm text-slate-500 font-medium">KI analysiert Wahl nach Emmy-Tabelle...</p>
                    </div>
                )}
                
                {!isAnalysing && (
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <p className="text-xs text-slate-400 max-w-sm">
                          Basierend auf der aktuellen Emmy-Tabelle und Berliner VO-GO.
                      </p>
                      <button
                        onClick={handleValidation}
                        className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold shadow-xl transition-all transform active:scale-95 hover:-translate-y-0.5"
                      >
                        Wahl prüfen & Plan erstellen
                      </button>
                  </div>
                )}
                
                {errorMsg && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-2xl border border-red-100 flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {errorMsg}
                    </div>
                )}
              </div>

              {validation && !isAnalysing && (
                <div className={`mt-8 p-6 rounded-2xl border ${validation.isValid ? 'bg-green-50/50 border-green-200' : 'bg-orange-50/50 border-orange-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center ${validation.isValid ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                        {validation.isValid ? '✓' : '!'}
                    </div>
                    <div className="flex-1">
                        <h4 className={`font-bold text-lg ${validation.isValid ? 'text-green-900' : 'text-orange-900'}`}>
                            {validation.isValid ? 'Gültige Kombination' : 'Hinweise zu deiner Wahl'}
                        </h4>
                        <div className="mt-3 space-y-2">
                            {validation.messages.map((msg, i) => (
                                <p key={i} className="text-sm text-slate-700 leading-relaxed">• {msg}</p>
                            ))}
                            {validation.missingRequirements.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-200/50">
                                    <p className="text-sm font-bold text-slate-800 mb-1">Kritische Mängel:</p>
                                    {validation.missingRequirements.map((req, i) => (
                                        <p key={i} className="text-sm text-red-600 font-medium">• {req}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {generatedPlan && !isAnalysing && (
                <div className="animate-fade-in">
                    <Overview plan={generatedPlan} rowId={validation?.rowId || null} />
                </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="lg:sticky lg:top-24">
                <ChatAssistant currentSelection={selection} apiKey={apiKey} />
                <div className="mt-4 p-5 bg-blue-50 border border-blue-100 rounded-3xl">
                    <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" /></svg>
                        Info zur 5. PK
                    </h4>
                    <p className="text-xs text-blue-800 leading-relaxed">
                        Das Referenzfach der 5. PK zählt zur Abdeckung der Aufgabenfelder. Das Bezugsfach dient zur fächerübergreifenden Ergänzung.
                    </p>
                </div>
             </div>
          </div>

        </div>
      </main>
      
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}