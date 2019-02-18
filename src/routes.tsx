import * as React from "react";

import { Switch, Route } from "react-router-dom";

import Overview from "@/pages/Overview";
import Duplicants from "@/pages/Duplicants";
import Settings from "@/pages/Settings";

const Routes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Overview} />
    <Route path="/duplicants" exact component={Duplicants} />
    <Route path="/settings" exact component={Settings} />
  </Switch>
);
export default Routes;
