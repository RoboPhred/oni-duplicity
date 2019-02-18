import * as React from "react";
import { hot } from "react-hot-loader";

import "es6-promise/auto";

import "typeface-roboto";

import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import { ConnectedRouter } from "connected-react-router";

import "@/style.css";

import history from "@/history";
import theme from "@/theme";

import I18NProvider from "@/services/i18n/components/I18NProvider";
import StoreProvider from "@/store/components/StoreProvider";

import LoadingDialog from "@/components/LoadingDialog/LoadingDialog";

import Routes from "@/routes";

const Root: React.SFC = () => (
  <I18NProvider>
    <StoreProvider>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <LoadingDialog />
          <Routes />
        </MuiThemeProvider>
      </ConnectedRouter>
    </StoreProvider>
  </I18NProvider>
);

export default hot(module)(Root);
