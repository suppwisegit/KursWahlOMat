export enum Subject {
  DEUTSCH = "Deutsch",
  ENGLISCH = "Englisch",
  FRANZOESISCH = "Französisch",
  LATEIN = "Latein",
  SPANISCH = "Spanisch",
  KUNST = "Kunst",
  MUSIK = "Musik",
  DS = "Darstellendes Spiel",
  GESCHICHTE = "Geschichte",
  PW = "Politikwissenschaft",
  GEOGRAFIE = "Geografie",
  PHILOSOPHIE = "Philosophie",
  MATHE = "Mathematik",
  PHYSIK = "Physik",
  CHEMIE = "Chemie",
  BIOLOGIE = "Biologie",
  INFORMATIK = "Informatik",
  SPORT = "Sport",
  NONE = ""
}

export interface SelectionState {
  lf1: Subject | string;
  lf2: Subject | string;
  pf3: Subject | string;
  pf4: Subject | string;
  pk5_ref: Subject | string; // Referenzfach
  pk5_bez: Subject | string; // Bezugsfach
}

export interface ValidationResult {
  isValid: boolean;
  rowId: string | null; // e.g., "27a"
  messages: string[];
  missingRequirements: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface GeneratedPlan {
  summary: string;
  semesters: {
    q1: string[];
    q2: string[];
    q3: string[];
    q4: string[];
  };
}