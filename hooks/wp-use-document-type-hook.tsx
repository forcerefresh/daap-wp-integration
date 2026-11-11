import documents from "./data.json";
import { IDocumentsTypeHook } from "@daap/integration/core/i-hooks";

export const useDocumentsTypeHook = (): IDocumentsTypeHook => {
  const getDocumentTypeTree = (): Promise<{ documents: Document[] }> => {
    return new Promise((resolve) => {
      return resolve({ documents } as unknown as { documents: Document[] });
    });
  };

  return {
    getDocumentTypeTree,
  };
};
