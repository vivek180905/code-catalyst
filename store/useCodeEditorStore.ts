import { CodeEditorState } from "./../types/index";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
import type { editor as MonacoEditor } from "monaco-editor";
// import { Monaco } from "@monaco-editor/react";

const getInitialState = () => {
  // if we're on the server, return default values
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  // if we're on the client, return values from local storage bc localStorage is a browser API.
  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: null,
    editor: null,
    executionResult: null,
    stdin: "",

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor:  MonacoEditor.IStandaloneCodeEditor) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);
      if (savedCode) editor.setValue(savedCode);

      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setStdin: (stdin: string) => {
      set({ stdin });
    },

    setLanguage: (language: string) => {
      // Save current language code before switching
      const currentCode = get().editor?.getValue();
      if (currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      });
    },

    runCode: async () => {
      const { language, getCode, stdin } = get();
      const code = getCode();

      if (!code) {
        set({ error: "Please enter some code" });
        return;
      }

      set({ isRunning: true, error: null, output: "" });

      try {
    const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
};

const response = await fetch(
  "https://ce.judge0.com/submissions?base64_encoded=true&wait=true",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_code: btoa(code),
      language_id: languageMap[language],
      stdin: btoa(stdin),
    }),
  }
);

const data = await response.json();

console.log("data from judge0:", data);

        const decodeBase64 = (str: string | null) => {
          if (!str) return "";
          try {
            const binaryStr = atob(str);
            const bytes = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
              bytes[i] = binaryStr.charCodeAt(i);
            }
            return new TextDecoder("utf-8").decode(bytes);
          } catch (e) {
            return str;
          }
        };

        const parsedStdout = decodeBase64(data.stdout);
        const parsedStderr = decodeBase64(data.stderr);
        const parsedCompile = decodeBase64(data.compile_output);

        const output =
          parsedStdout ||
          parsedStderr ||
          parsedCompile ||
          data.message ||
          data.error ||
          "No output";

        const errorMsg = parsedStderr || parsedCompile || data.message || data.error || null;

        set({
          output: output.trim(),
          error: errorMsg ? errorMsg.trim() : null,
          executionResult: {
            code,
            output: output.trim(),
            error: errorMsg ? errorMsg.trim() : null,
          },
        });
        
        //re uploading the code to local storage after execution in case user made changes while code was running
      } catch (error) {
        console.log("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;