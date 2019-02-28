import * as React from "react";

import { Switch, Route } from "react-router-dom";

import OverviewPage from "@/pages/OverviewPage";
import DuplicantsPage from "@/pages/DuplicantsPage";
import DuplicantEditorPage from "@/pages/DuplicantEditorPage";
import SettingsPage from "@/pages/SettingsPage";

const Routes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={OverviewPage} />
    <Route path="/duplicants" exact component={DuplicantsPage} />
    <Route
      path="/duplicants/:gameObjectId"
      exact
      component={DuplicantEditorPage}
    />
    <Route path="/settings" exact component={SettingsPage} />
  </Switch>
);
export default Routes;
