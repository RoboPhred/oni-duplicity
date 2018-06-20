import * as React from "react";
import { hot } from "react-hot-loader";

import { ThemeProvider } from "styled-components";

import theme from "./theme";

import App from "./App";

const Root: React.SFC = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default hot(module)(Root);
