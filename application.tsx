/// <reference path="./@types/wp-globals.d.ts" />
import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  MemoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import cx from "classnames";
import App from "@daap/App";
import { IStore, store } from "@daap/store/store";
import { connect, Provider } from "react-redux";
import { IntegrationContextProvider, useAppRootSelector } from "@daap/integration";
import "@daap/objects/register-object";
import "@daap/objects/font-preloader";
import {
  registerExternalObject,
  unregisterObject,
} from "webslider-sdk/lib/objects/objects-register";
import DevelopmentManager from "@daap/utils/development/DevelopmentManager";
import { DevelopmentContextProvider } from "@daap/utils/development/DevelopmentProvider";
import { PreviewTimelineContextProvider } from "@daap/utils/preview-timeline-provider/PreviewTimelineProvider";
import {
  registerExternalAnimation,
  unregisterAnimation,
} from "webslider-sdk/lib/animations/animations-register";
import { registerPlugin } from "webslider-sdk/lib/plugins/plugins-register";
import css from "@daap/App.module.scss";
import MainHeader from "@daap/integration/components/main-header/SassMainHeader";
import { HotkeysProvider, PortalProvider } from "@blueprintjs/core";
import { ExportProvider } from "@daap/utils/export-provider/ExportProvider";
import SearchPage from "@daap/pages/search/search";
import IntroPage from "@daap/pages/intro/Intro";
import "@daap/global.scss";
import MobileRestriction from "@daap/integration/components/mobile-restriction/MobileRestriction";
import { IGlobals } from "@daap/globals";

const global = window as unknown as IGlobals;

const Editor = (_props: ReturnType<typeof mapStateToProps>) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [portalRoot, setPortalRoot] = useState<any>();

  useEffect(() => {
    setPortalRoot(
      document.getElementsByClassName("daap-forcerefresh-app")?.[0],
    );
  });

  return (
    <PortalProvider portalContainer={portalRoot}>
      <DevelopmentContextProvider>
        <DevelopmentManager />
        <ExportProvider>
          <PreviewTimelineContextProvider>
            <div className={cx(css.main, "daap-forcerefresh-app")}>
              <div>
                <MobileRestriction />
                <MainHeader className={css.header} />
                <App className={css.editor} />
              </div>
            </div>
            <div ref={overlayRef} />
          </PreviewTimelineContextProvider>
        </ExportProvider>
      </DevelopmentContextProvider>
    </PortalProvider>
  );
};

function mapStateToProps(state: IStore) {
  return { userData: state.account.userData };
}

const EditorConnected = connect(mapStateToProps)(Editor);

function application(): {
  component: React.ReactElement;
  useAppRootSelector: any;
} {
  const homePage = daapForcerefreshSettings?.homePage || "intro";

  return {
    component: (
      <MemoryRouter initialEntries={[`/${homePage}`]}>
        <Provider store={store}>
          <IntegrationContextProvider>
            <HotkeysProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/search" />} />
                <Route path="/intro" element={<IntroPage onSelect={() => {}} />} />
                <Route path="/editor" element={<EditorConnected />} />
                <Route path="/search" element={<SearchPage onClose={() => {}} />} />
                <Route
                  path="*"
                  element={
                    <div style={{ padding: "20px" }}>
                      <Navigate to="/search" replace />
                    </div>
                  }
                />
              </Routes>
            </HotkeysProvider>
          </IntegrationContextProvider>
        </Provider>
      </MemoryRouter>
    ),
    useAppRootSelector: useAppRootSelector,
  };
}

const data = application();

const container = document.getElementById((data.useAppRootSelector as any)());
const root = createRoot(container!);
root.render(data.component);


if (!global.WebSlider_GlobalScope) {
  global.WebSlider_GlobalScope = {};
}

global.WebSlider_GlobalScope.registerExternalObject = registerExternalObject;
global.WebSlider_GlobalScope.unregisterObject = unregisterObject;
global.WebSlider_GlobalScope.registerExternalAnimation = registerExternalAnimation;
global.WebSlider_GlobalScope.unregisterAnimation = unregisterAnimation;
global.WebSlider_GlobalScope.registerPlugin = registerPlugin;
