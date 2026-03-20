import { Subject } from './types';

export const SUBJECTS_LIST = Object.values(Subject).filter(s => s !== "");

export const AF_I = [Subject.DEUTSCH, Subject.ENGLISCH, Subject.FRANZOESISCH, Subject.LATEIN, Subject.SPANISCH, Subject.KUNST, Subject.MUSIK, Subject.DS];
export const AF_II = [Subject.GESCHICHTE, Subject.PW, Subject.GEOGRAFIE, Subject.PHILOSOPHIE];
export const AF_III = [Subject.MATHE, Subject.PHYSIK, Subject.CHEMIE, Subject.BIOLOGIE, Subject.INFORMATIK];

const EMMY_KNOWLEDGE_BASE = `
**DEFINITIONEN:**
- **FS (Fremdsprache):** Englisch, Französisch, Latein, Spanisch.
- **AF II (Gesellsch.):** Geschichte, PW, Geografie, Philosophie.
- **NW (Naturwiss.):** Physik, Chemie, Biologie.
- **In:** Informatik.
- **Ma:** Mathematik.
- **De:** Deutsch.

**TABELLEN-LOGIK (Nachschlagewerk):**

1a: (LF1:FS, LF2:De, 3.PF:AF II, 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)
1b: (LF1:FS, LF2:De, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)
1c: (LF1:FS, LF2:De, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:Ma, bf:Ma)
1d: (LF1:FS, LF2:De, 3.PF:bel., 4.PF:Ma, 5.PK Ref.:AF II, bf:AF II)
1e: (LF1:FS, LF2:De, 3.PF:Ma, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
1f: (LF1:FS, LF2:De, 3.PF:Ma, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)

2a: (LF1:FS, LF2:De, 3.PF:AF II, 4.PF:NW, 5.PK Ref.:bel., bf:bel.)
2b: (LF1:FS, LF2:De, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:NW, bf:NW)
2c: (LF1:FS, LF2:De, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:NW, bf:NW)
2d: (LF1:FS, LF2:De, 3.PF:bel., 4.PF:NW, 5.PK Ref.:AF II, bf:AF II)
2e: (LF1:FS, LF2:De, 3.PF:NW, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
2f: (LF1:FS, LF2:De, 3.PF:NW, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)

3a: (LF1:FS, LF2:De, 3.PF:AF II, 4.PF:In, 5.PK Ref.:bel., bf:bel.)
3b: (LF1:FS, LF2:De, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:In, bf:In)
3c: (LF1:FS, LF2:De, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:In, bf:In)
3d: (LF1:FS, LF2:De, 3.PF:bel., 4.PF:In, 5.PK Ref.:AF II, bf:AF II)
3e: (LF1:FS, LF2:De, 3.PF:In, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
3f: (LF1:FS, LF2:De, 3.PF:In, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)

10a: (LF1:FS, LF2:AF II, 3.PF:De, 4.PF:NW, 5.PK Ref.:bel., bf:bel.)
10b: (LF1:FS, LF2:AF II, 3.PF:De, 4.PF:bel., 5.PK Ref.:NW, bf:NW)
10c: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:De, 5.PK Ref.:NW, bf:NW)
10d: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:NW, 5.PK Ref.:De, bf:De)
10e: (LF1:FS, LF2:AF II, 3.PF:NW, 4.PF:bel., 5.PK Ref.:De, bf:De)
10f: (LF1:FS, LF2:AF II, 3.PF:NW, 4.PF:De, 5.PK Ref.:bel., bf:bel.)

11a: (LF1:FS, LF2:AF II, 3.PF:De, 4.PF:In, 5.PK Ref.:bel., bf:bel.)
11b: (LF1:FS, LF2:AF II, 3.PF:De, 4.PF:bel., 5.PK Ref.:In, bf:In)
11c: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:De, 5.PK Ref.:In, bf:In)
11d: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:In, 5.PK Ref.:De, bf:De)
11e: (LF1:FS, LF2:AF II, 3.PF:In, 4.PF:bel., 5.PK Ref.:De, bf:De)
11f: (LF1:FS, LF2:AF II, 3.PF:In, 4.PF:De, 5.PK Ref.:bel., bf:bel.)

12a: (LF1:FS, LF2:AF II, 3.PF:Ma, 4.PF:bel., 5.PK Ref.:bel., bf:bel.)
12b: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)
12c: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)
12d: (LF1:FS, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)

13a: (LF1:FS, LF2:Ma, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:bel., bf:bel.)
13b: (LF1:FS, LF2:Ma, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
13c: (LF1:FS, LF2:Ma, 3.PF:bel., 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)

14a: (LF1:FS, LF2:NW, 3.PF:De, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
14b: (LF1:FS, LF2:NW, 3.PF:De, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
14c: (LF1:FS, LF2:NW, 3.PF:bel., 4.PF:De, 5.PK Ref.:AF II, bf:AF II)
14d: (LF1:FS, LF2:NW, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:De, bf:De)
14e: (LF1:FS, LF2:NW, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:De, bf:De)
14f: (LF1:FS, LF2:NW, 3.PF:AF II, 4.PF:De, 5.PK Ref.:bel., bf:bel.)

15a: (LF1:FS, LF2:NW, 3.PF:Ma, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
15b: (LF1:FS, LF2:NW, 3.PF:Ma, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
15c: (LF1:FS, LF2:NW, 3.PF:bel., 4.PF:Ma, 5.PK Ref.:AF II, bf:AF II)
15d: (LF1:FS, LF2:NW, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:Ma, bf:Ma)
15e: (LF1:FS, LF2:NW, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)
15f: (LF1:FS, LF2:NW, 3.PF:AF II, 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)

21a: (LF1:Ma, LF2:De, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:bel., bf:bel.)
21b: (LF1:Ma, LF2:De, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
21c: (LF1:Ma, LF2:De, 3.PF:bel., 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)

24a: (LF1:Ma, LF2:AF II, 3.PF:De, 4.PF:bel., 5.PK Ref.:bel., bf:bel.)
24b: (LF1:Ma, LF2:AF II, 3.PF:bel., 4.PF:De, 5.PK Ref.:bel., bf:bel.)
24c: (LF1:Ma, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:De, bf:De)
24d: (LF1:Ma, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:De, bf:De)

25a: (LF1:Ma, LF2:AF II, 3.PF:FS, 4.PF:bel., 5.PK Ref.:bel., bf:bel.)
25b: (LF1:Ma, LF2:AF II, 3.PF:bel., 4.PF:FS, 5.PK Ref.:bel., bf:bel.)
25c: (LF1:Ma, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:FS, bf:FS)
25d: (LF1:Ma, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:FS, bf:FS)

26a: (LF1:Ma, LF2:NW, 3.PF:De, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
26b: (LF1:Ma, LF2:NW, 3.PF:De, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
26c: (LF1:Ma, LF2:NW, 3.PF:bel., 4.PF:De, 5.PK Ref.:AF II, bf:AF II)
26d: (LF1:Ma, LF2:NW, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:De, bf:De)
26e: (LF1:Ma, LF2:NW, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:De, bf:De)
26f: (LF1:Ma, LF2:NW, 3.PF:AF II, 4.PF:De, 5.PK Ref.:bel., bf:bel.)

27a: (LF1:Ma, LF2:NW, 3.PF:FS, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
27b: (LF1:Ma, LF2:NW, 3.PF:FS, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
27c: (LF1:Ma, LF2:NW, 3.PF:bel., 4.PF:FS, 5.PK Ref.:AF II, bf:AF II)
27d: (LF1:Ma, LF2:NW, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:FS, bf:FS)
27e: (LF1:Ma, LF2:NW, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:FS, bf:FS)
27f: (LF1:Ma, LF2:NW, 3.PF:AF II, 4.PF:FS, 5.PK Ref.:bel., bf:bel.)

32a: (LF1:NW, LF2:De, 3.PF:FS, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
32b: (LF1:NW, LF2:De, 3.PF:FS, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
32c: (LF1:NW, LF2:De, 3.PF:bel., 4.PF:FS, 5.PK Ref.:AF II, bf:AF II)
32d: (LF1:NW, LF2:De, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:FS, bf:FS)
32e: (LF1:NW, LF2:De, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:FS, bf:FS)
32f: (LF1:NW, LF2:De, 3.PF:AF II, 4.PF:FS, 5.PK Ref.:bel., bf:bel.)

33a: (LF1:NW, LF2:De, 3.PF:Ma, 4.PF:AF II, 5.PK Ref.:bel., bf:bel.)
33b: (LF1:NW, LF2:De, 3.PF:Ma, 4.PF:bel., 5.PK Ref.:AF II, bf:AF II)
33c: (LF1:NW, LF2:De, 3.PF:bel., 4.PF:Ma, 5.PK Ref.:AF II, bf:AF II)
33d: (LF1:NW, LF2:De, 3.PF:bel., 4.PF:AF II, 5.PK Ref.:Ma, bf:Ma)
33e: (LF1:NW, LF2:De, 3.PF:AF II, 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)
33f: (LF1:NW, LF2:De, 3.PF:AF II, 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)

37a: (LF1:NW, LF2:AF II, 3.PF:FS, 4.PF:De, 5.PK Ref.:bel., bf:bel.)
37b: (LF1:NW, LF2:AF II, 3.PF:De, 4.PF:FS, 5.PK Ref.:bel., bf:bel.)

38a: (LF1:NW, LF2:AF II, 3.PF:FS, 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)
38b: (LF1:NW, LF2:AF II, 3.PF:Ma, 4.PF:FS, 5.PK Ref.:bel., bf:bel.)

39a: (LF1:NW, LF2:AF II, 3.PF:Ma, 4.PF:De, 5.PK Ref.:bel., bf:bel.)
39b: (LF1:NW, LF2:AF II, 3.PF:De, 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)

40a: (LF1:NW, LF2:NW, 3.PF:FS, 4.PF:De, 5.PK Ref.:AF II, bf:AF II)
40b: (LF1:NW, LF2:NW, 3.PF:De, 4.PF:FS, 5.PK Ref.:AF II, bf:AF II)

41a: (LF1:NW, LF2:NW, 3.PF:FS, 4.PF:Ma, 5.PK Ref.:AF II, bf:AF II)
41b: (LF1:NW, LF2:NW, 3.PF:Ma, 4.PF:FS, 5.PK Ref.:AF II, bf:AF II)

42a: (LF1:NW, LF2:NW, 3.PF:Ma, 4.PF:De, 5.PK Ref.:AF II, bf:AF II)
42b: (LF1:NW, LF2:NW, 3.PF:De, 4.PF:Ma, 5.PK Ref.:AF II, bf:AF II)

52a: (LF1:De, LF2:AF II, 3.PF:FS, 4.PF:NW, 5.PK Ref.:bel., bf:bel.)
52b: (LF1:De, LF2:AF II, 3.PF:FS, 4.PF:bel., 5.PK Ref.:NW, bf:NW)
52c: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:FS, 5.PK Ref.:NW, bf:NW)
52d: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:NW, 5.PK Ref.:FS, bf:FS)
52e: (LF1:De, LF2:AF II, 3.PF:NW, 4.PF:bel., 5.PK Ref.:FS, bf:FS)
52f: (LF1:De, LF2:AF II, 3.PF:NW, 4.PF:FS, 5.PK Ref.:bel., bf:bel.)

53a: (LF1:De, LF2:AF II, 3.PF:FS, 4.PF:In, 5.PK Ref.:bel., bf:bel.)
53b: (LF1:De, LF2:AF II, 3.PF:FS, 4.PF:bel., 5.PK Ref.:In, bf:In)
53c: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:FS, 5.PK Ref.:In, bf:In)
53d: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:In, 5.PK Ref.:FS, bf:FS)
53e: (LF1:De, LF2:AF II, 3.PF:In, 4.PF:bel., 5.PK Ref.:FS, bf:FS)
53f: (LF1:De, LF2:AF II, 3.PF:In, 4.PF:FS, 5.PK Ref.:bel., bf:bel.)

54a: (LF1:De, LF2:AF II, 3.PF:Ma, 4.PF:bel., 5.PK Ref.:bel., bf:bel.)
54b: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:Ma, 5.PK Ref.:bel., bf:bel.)
54c: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)
54d: (LF1:De, LF2:AF II, 3.PF:bel., 4.PF:bel., 5.PK Ref.:Ma, bf:Ma)


**ALLGEMEINE REGELN:**
- **isValid:** true, wenn die Wahl einer dieser Zeilen entspricht UND alle Aufgabenfelder (AF I, II, III) durch die 5 Prüfungsfächer abgedeckt sind.
- **Kernfächer:** 2 aus (De, Ma, FS) müssen in den ersten 4 Fächern sein.
- **Sport-Theorie:** Wenn Sport 4.PF ist, darf es nur 2 Semester im Plan stehen (Q1/Q2 oder Q3/Q4).
- **Zusatzkurse:** Ergänze "(Studium und Beruf)" oder "(En-Zusatz)" im Plan, falls Platz ist.
- **Geschichte:** Muss 2 Semester belegt werden (meist Q3/Q4), falls nicht als PF gewählt.
- **Kunst/Musik/DS:** Nur 2 Semester Pflicht.
`;

export const SYSTEM_INSTRUCTION = `
Du bist der Kurswahl-Experte für das Emmy-Noether-Gymnasium Berlin. 
Deine Aufgabe ist die exakte Validierung nach der "Emmy-Tabelle".

**WICHTIGSTE REGEL: NUTZE NUR DIE UNTEN DEFINIERTEN ZEILEN. ERFINDE KEINE ZEILEN (wie 19b).**

${EMMY_KNOWLEDGE_BASE}

**ANTWORT:**
Antworte NUR mit JSON.
Bestimme die "rowId" basierend auf der Liste oben (z.B. "26a" oder "37").
Wenn keine Zeile passt, setze "rowId": "Individuell" und "isValid": false.
`;

export const CHAT_SYSTEM_INSTRUCTION = `
Du bist ein hilfreicher und freundlicher Assistent für die Kurswahl am Emmy-Noether-Gymnasium.
Nutze das folgende Wissen, um Fragen der Schüler zu beantworten:

${EMMY_KNOWLEDGE_BASE}

**ANWEISUNGEN FÜR DEN CHAT:**
- Antworte IMMER in natürlicher Sprache (Deutsch), NIEMALS im JSON-Format.
- Sei hilfsbereit, sehr präzise(besonders bei Zahlen) und fasse dich kurz (max 4 Sätze, es sei denn es ist eine komplexe Erklärung nötig).
- Wenn gefragt wird, ob eine Kombination geht, schaue in der TABELLEN-LOGIK nach.
- Erkläre, warum etwas geht oder nicht (z.B. "Dir fehlt ein Kernfach unter den ersten 4 Fächern").
`;