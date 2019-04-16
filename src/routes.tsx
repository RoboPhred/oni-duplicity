import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import OverviewPage from "@/pages/OverviewPage";
import DuplicantsPage from "@/pages/DuplicantsPage";
import DuplicantEditorPage from "@/pages/DuplicantEditorPage";
import GeysersPage from "@/pages/GeysersPage";
import PlanetsPage from "@/pages/PlanetsPage";
import MaterialsPage from "@/pages/MaterialsPage";
import RawEditorPage from "@/pages/RawEditorPage";
import SettingsPage from "@/pages/SettingsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={OverviewPage} />
    <Route path="/duplicants" exact component={DuplicantsPage} />
    <Route
      path="/duplicants/:gameObjectId"
      exact
      component={DuplicantEditorPage}
    />
    <Route path="/geysers" exact component={GeysersPage} />
    <Route path="/planets" exact component={PlanetsPage} />
    <Route path="/materials" exact component={MaterialsPage} />
    <Route path="/raw" exact component={RawEditorPage} />
    <Route path="/settings" exact component={SettingsPage} />
    <Redirect to="/" />
  </Switch>
);
export default Routes;
