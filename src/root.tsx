import * as React from "react";
import { hot } from "react-hot-loader";

import I18NProvider from "@/services/i18n/components/I18NProvider";
import StoreProvider from "@/store/components/StoreProvider";

import App from "./App";

const Root: React.SFC = () => (
  <I18NProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </I18NProvider>
);

export default hot(module)(Root);
