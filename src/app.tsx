
import * as React from "react";

import { hot } from "react-hot-loader";
import { withRouter } from "react-router";

import App from "./components/App";

// react-router wants to wrap every element we have in a new element.  Because composability!
//  without wrapping this in a <Route/> from the outside, the PureComponent hot will not see
//  any changes, and the broken context system is ignored.
//  Every other library out their uses an external context store similar to the new react context
//  pattern, but router just blames everyone else for honoring shouldComponentUpdate and says wontfix.
// Might be better off removing route altogether and staying a SPA.
export default withRouter(hot(module)(App) as any);
