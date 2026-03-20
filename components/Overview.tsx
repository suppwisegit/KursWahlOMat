import React from 'react';
import { GeneratedPlan } from '../types';

interface Props {
  plan: GeneratedPlan;
  rowId: string | null;
}

const Overview: React.FC<Props> = ({ plan, rowId }) => {
  const semesters = [
    { key: 'q1', label: 'Q1', desc: '11.1' },
    { key: 'q2', label: 'Q2', desc: '11.2' },
    { key: 'q3', label: 'Q3', desc: '12.1' },
    { key: 'q4', label: 'Q4', desc: '12.2' },
  ] as const;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="bg-slate-900 p-8 text-white relative">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Voraussichtlicher Belegungsplan</h2>
            {rowId && (
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Emmy-Tabelle</p>
                    <p className="text-xl font-black text-blue-400">Zeile {rowId}</p>
                </div>
            )}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl border-l-2 border-blue-500 pl-4 py-1">
          {plan.summary}
        </p>
      </div>
      
      <div className="p-4 sm:p-8 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {semesters.map((sem) => (
             <div key={sem.key} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex justify-between items-end mb-4 border-b border-slate-50 pb-2">
                    <div>
                        <h3 className="font-black text-slate-900 text-xl">{sem.label}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{sem.desc}</p>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold">
                        {plan.semesters[sem.key].length} KURSE
                    </span>
                </div>
                <ul className="space-y-2.5 flex-1">
                    {plan.semesters[sem.key].length > 0 ? (
                        plan.semesters[sem.key].map((course, idx) => {
                            const isOptional = course.includes('(');
                            return (
                                <li key={idx} className={`text-sm flex items-start gap-2.5 group ${isOptional ? 'text-slate-400 italic' : 'text-slate-700 font-medium'}`}>
                                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-150 ${isOptional ? 'bg-slate-200' : 'bg-blue-500 shadow-sm shadow-blue-200'}`}></span>
                                    <span className="leading-tight">{course}</span>
                                </li>
                            );
                        })
                    ) : (
                        <li className="text-sm text-slate-300 italic py-4 text-center">Keine Daten</li>
                    )}
                </ul>
             </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Prüfungsfächer & Pflicht</span>
            <span className="w-3 h-3 rounded-full bg-slate-200 ml-4"></span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Zusatz & Wahl</span>
        </div>
        <p className="text-[10px] text-slate-400 text-center max-w-xs leading-tight font-medium">
          Dieser Plan dient der Orientierung. Maßgeblich ist das Beratungsgespräch mit der Oberstufenkoordination.
        </p>
      </div>
    </div>
  );
};

export default Overview;