# Emmy-Kurswahl-O-Mat

Ein intelligenter Assistent für die Oberstufen-Kurswahl am Emmy-Noether-Gymnasium Berlin. Die App hilft Schülerinnen und Schülern dabei, ihre Prüfungsfächer gemäß der "Emmy-Tabelle" und der Berliner Verordnung über die gymnasiale Oberstufe (VO-GO) korrekt zu wählen.

## Features
- **Interaktive Kurswahl:** Einfaches Hinzufügen und Entfernen von Leistungskursen (LK) und Grundkursen (GK).
- **KI-Unterstützung:** Ein integrierter Chat-Assistent (basiert auf Google Gemini) beantwortet spezifische Fragen zur Wahl und validiert diese nach den schulinternen Regeln.
- **Automatische Validierung:** Prüft auf Kernfächerstellungen, Anzahl der Prüfungsfächer, Klausuren und weitere Vorgaben.
- **Profil-Übersicht:** Klar strukturierte Liste der gewählten Kurse (mit Semesterwochenstunden).

## Tech Stack
- Frontend: React 19, TypeScript, Tailwind CSS
- Build Tool: Vite
- Mobile (Optional): Capacitor (für iOS/Android Builds bereit)
- KI Integration: `@google/genai` (Google Gemini API)

## Setup & Ausführen

1. **Repository klonen**
   ```bash
   git clone <repository_url>
   cd KursWahlOMat
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```
   Die App läuft nun unter `http://localhost:3000/`.

4. **Für mobile Geräte bauen** (optional)
   ```bash
   npm run build
   npx cap sync
   # Anschließend über Android Studio oder Xcode öffnen
   ```

## Nutzung der KI
Die App benötigt einen gültigen Google Gemini API-Key. Dieser kann direkt in der App eingegeben und im lokalen Speicher (LocalStorage) des Browsers gespeichert werden. Es werden keine API-Keys vom Entwickler auf externen Servern gespeichert, abgesehen von der direkten Kommunikation mit der Google Gemini API.

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz zertifiziert. Weitere Details in der `LICENSE` Datei.
