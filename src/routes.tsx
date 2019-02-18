import * as React from "react";

import { Switch, Route } from "react-router-dom";

import Overview from "@/pages/Overview";
import Settings from "@/pages/Settings";

const Routes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Overview} />
    <Route path="/settings" exact component={Settings} />
  </Switch>
);
export default Routes;
