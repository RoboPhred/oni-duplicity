import * as React from "react";
import { hot } from "react-hot-loader";

import "typeface-roboto";

import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import "@/style.css";

import I18NProvider from "@/services/i18n/components/I18NProvider";
import StoreProvider from "@/store/components/StoreProvider";

import theme from "@/theme";

import App from "@/App";

const Root: React.SFC = () => (
  <I18NProvider>
    <StoreProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </StoreProvider>
  </I18NProvider>
);

export default hot(module)(Root);
