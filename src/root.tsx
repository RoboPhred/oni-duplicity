import * as React from "react";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";

import store from "./store";
import theme from "./theme";

import App from "./App";

const Root: React.SFC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

export default hot(module)(Root);
