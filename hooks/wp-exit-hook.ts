import { useSelector } from "react-redux";
import { IStore } from "@daap/store/store";
import { IExitHook } from "@daap/integration/core/i-hooks";

export const useExitHook: IExitHook = () => {
  const sliderChanged = useSelector(
    (state: IStore) => state.editor.sliderChanged
  );

  // NOTE: sets global DAAP_isDirty which will be used in WP plugin
  window.DAAP_isDirty = sliderChanged;
};
