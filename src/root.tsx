import * as React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { ThemeProvider, theme } from "@/style";

import store from "./store";

import i18n from "./i18n";

import App from "./App";

const Root: React.SFC = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </Provider>
);

export default hot(module)(Root);
