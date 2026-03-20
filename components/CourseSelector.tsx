import React from 'react';
import { SelectionState, Subject } from '../types';
import { SUBJECTS_LIST } from '../constants';

interface Props {
  selection: SelectionState;
  onChange: (field: keyof SelectionState, value: string) => void;
  validationRowId: string | null;
}

const CourseSelector: React.FC<Props> = ({ selection, onChange, validationRowId }) => {

  // Function to filter available options for a specific field
  const getAvailableSubjects = (field: keyof SelectionState) => {
    return SUBJECTS_LIST.filter(subj => {
        // Always include the currently selected value for this field so it doesn't disappear
        if (selection[field] === subj) return true;

        // 1. Exclude subjects already selected in OTHER fields
        const isSelectedElsewhere = Object.entries(selection).some(([key, value]) => {
            return key !== field && value === subj;
        });
        if (isSelectedElsewhere) return false;

        // 2. Specific Restrictions for Emmy/Berlin
        
        // LK Restrictions (LF1, LF2)
        // Sport, DS, Musik, Kunst are rarely LKs
        const RESTRICTED_LKS = [Subject.SPORT, Subject.DS, Subject.MUSIK, Subject.KUNST];
        if ((field === 'lf1' || field === 'lf2') && RESTRICTED_LKS.includes(subj)) {
            return false;
        }

        // PF3 Restrictions
        // Sport usually not allowed as 3rd PF (Written)
        if (field === 'pf3' && subj === Subject.SPORT) {
            return false;
        }

        return true;
    });
  };

  const renderSelect = (label: string, field: keyof SelectionState, subLabel?: string, highlight?: boolean) => {
    const availableSubjects = getAvailableSubjects(field);

    return (
        <div className={`flex flex-col p-3 sm:p-4 rounded-xl border transition-all ${highlight ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                {label}
            </label>
            <div className="relative">
                <select
                value={selection[field]}
                onChange={(e) => onChange(field, e.target.value)}
                className="w-full appearance-none bg-transparent border-b-2 border-slate-300 py-2 pl-1 pr-8 text-base sm:text-lg font-medium text-slate-800 focus:outline-none focus:border-slate-900 cursor-pointer touch-manipulation disabled:text-slate-300"
                >
                <option value="" disabled>Fach wählen...</option>
                {availableSubjects.map((subj) => (
                    <option key={subj} value={subj}>
                        {subj}
                    </option>
                ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            {subLabel && <span className="text-[10px] sm:text-xs text-slate-400 mt-1.5">{subLabel}</span>}
        </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Deine Kurswahl</h2>
        {validationRowId && (
            <span className="self-start sm:self-auto bg-green-100 text-green-800 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border border-green-200 whitespace-nowrap">
                Zeile: {validationRowId}
            </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {renderSelect("1. Leistungsfach", "lf1", "5 Std/Woche • Doppelt", true)}
        {renderSelect("2. Leistungsfach", "lf2", "5 Std/Woche • Doppelt", true)}
        {renderSelect("3. Prüfungsfach", "pf3", "3 Std/Woche • Schriftlich")}
        {renderSelect("4. Prüfungsfach", "pf4", "3 Std/Woche • Mündlich")}
      </div>
      
      <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-3 sm:mb-4 uppercase tracking-wide">5. Prüfungskomponente (5. PK)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {renderSelect("Referenzfach", "pk5_ref", "Präsentation oder BLL")}
            {renderSelect("Bezugsfach", "pk5_bez", "Fächerübergreifend")}
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;