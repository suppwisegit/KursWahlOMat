
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION, CHAT_SYSTEM_INSTRUCTION } from "../constants";
import { SelectionState, ValidationResult, GeneratedPlan } from "../types";

const getAIClient = (apiKey: string) => new GoogleGenAI({ apiKey });

const withTimeout = <T>(promise: Promise<T>, ms: number, errorMsg: string): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) => 
            setTimeout(() => reject(new Error(errorMsg)), ms)
        )
    ]);
};

export const validateSelectionWithAI = async (selection: SelectionState, apiKey: string): Promise<ValidationResult & { generatedPlan?: GeneratedPlan }> => {
  const ai = getAIClient(apiKey);
  const prompt = `
    Analysiere diese spezifische Kurswahl am Emmy-Noether-Gymnasium:
    - 1. LF: ${selection.lf1}
    - 2. LF: ${selection.lf2}
    - 3. PF: ${selection.pf3}
    - 4. PF: ${selection.pf4}
    - 5. PK Ref: ${selection.pk5_ref}
    - 5. PK Bez: ${selection.pk5_bez}

    Antworte NUR mit validem JSON:
    {
      "isValid": boolean,
      "rowId": "string",
      "messages": ["Präzise Kritik oder Lob"],
      "missingRequirements": ["z.B. 2. Kernfach fehlt"],
      "plan": {
        "summary": "Kurze Analyse der Wahl.",
        "semesters": {
           "q1": ["Kurs 1", "..."],
           "q2": ["..."],
           "q3": ["..."],
           "q4": ["..."]
        }
      }
    }
  `;

  try {
    const response = await withTimeout<GenerateContentResponse>(
        ai.models.generateContent({
        model: "gemini-3-flash-preview", // Wechsel auf Flash für stabilere API-Quoten
        contents: prompt,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            temperature: 0.1,
        }
        }),
        30000,
        "Die Analyse dauert zu lange. Bitte versuche es gleich noch einmal."
    );

    if (response && response.text) {
        const data = JSON.parse(response.text);
        return {
            isValid: data.isValid,
            rowId: data.rowId,
            messages: data.messages || [],
            missingRequirements: data.missingRequirements || [],
            generatedPlan: data.plan
        };
    }
    throw new Error("Leere Antwort vom Server.");

  } catch (error: any) {
    console.error("AI Validation Error:", error);
    
    // Benutzerfreundliche Fehlermeldungen statt Raw-JSON
    let userFriendlyMessage = "Ein unerwarteter Fehler ist aufgetreten.";
    if (error.message?.includes("429") || error.message?.includes("quota")) {
        userFriendlyMessage = "Der Google-Server ist aktuell überlastet oder das Limit deines Keys ist erreicht. Bitte warte 30 Sekunden.";
    } else if (error.message?.includes("Timeout")) {
        userFriendlyMessage = "Die Verbindung zum Server hat zu lange gedauert.";
    }

    return {
      isValid: false,
      rowId: null,
      messages: [userFriendlyMessage],
      missingRequirements: []
    };
  }
};

export const chatWithAssistant = async (history: {role: string, parts: {text: string}[]}[], message: string, currentSelection: SelectionState, apiKey: string) => {
    const ai = getAIClient(apiKey);
    const context = `Aktuelle Auswahl: ${JSON.stringify(currentSelection)}. 
    Antworte als Emmy-Experte. Antworte kurz. Benutze KEIN MARKDOWN.`;
    
    try {
        const chat = ai.chats.create({
            model: "gemini-3-flash-preview",
            history: history,
            config: {
                systemInstruction: CHAT_SYSTEM_INSTRUCTION + "\n\n" + context,
            }
        });

        const result = await withTimeout<GenerateContentResponse>(
            chat.sendMessage({ message }),
            20000,
            "Timeout"
        );
        
        return result.text || "Ich konnte leider keine Antwort generieren.";
    } catch (e: any) {
        console.error("Chat error", e);
        if (e.message?.includes("429")) return "Der Server ist gerade überlastet. Bitte kurz warten.";
        return "Verbindungsproblem. Bitte prüfe dein Internet.";
    }
}
