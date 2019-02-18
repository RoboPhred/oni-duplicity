import * as React from "react";
import { hot } from "react-hot-loader";

import "es6-promise/auto";

import "typeface-roboto";

import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { ConnectedRouter } from "connected-react-router";

import "@/style.css";

import I18NProvider from "@/services/i18n/components/I18NProvider";
import StoreProvider from "@/store/components/StoreProvider";

import theme from "@/theme";

import Routes from "@/routes";

import history from "@/history";

const Root: React.SFC = () => (
  <I18NProvider>
    <StoreProvider>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </StoreProvider>
  </I18NProvider>
);

export default hot(module)(Root);
