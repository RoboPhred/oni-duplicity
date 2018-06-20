import * as React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";

import { createStore } from "./store";
import theme from "./theme";

import App from "./App";

const Root: React.SFC = () => (
  <ThemeProvider theme={theme}>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </ThemeProvider>
);

export default hot(module)(Root);
