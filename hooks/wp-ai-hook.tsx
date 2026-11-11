import axios from "axios";
import { IAIHook } from "@daap/integration/core/i-hooks";

export const useAIHook = (): IAIHook => {
  const textQuery = (props: {
    query: string;
    template: string;
  }): Promise<{ output?: string; error?: string }> => {
    return axios
      .post(`${daapForcerefreshSettings.root}daap/v1/ai`, props, {
        headers: {
          "X-WP-Nonce": daapForcerefreshSettings.nonce,
        },
      })
      .then((response) => response.data)
      .catch(console.log);
  };

  return {
    textQuery,
  };
};
