import * as React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { ThemeProvider, theme } from "@/style";

import store from "./store";

import i18n from "./i18n";

import App from "./App";

const Root: React.SFC = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </I18nextProvider>
);

export default hot(module)(Root);
