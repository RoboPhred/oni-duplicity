import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import OverviewPage from "@/pages/OverviewPage";
import DuplicantsPage from "@/pages/DuplicantsPage";
import DuplicantEditorPage from "@/pages/DuplicantEditorPage";
import MaterialsPage from "@/pages/MaterialsPage";
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
    <Route path="/materials" exact component={MaterialsPage} />
    <Route path="/settings" exact component={SettingsPage} />
    <Redirect to="/" />
  </Switch>
);
export default Routes;
