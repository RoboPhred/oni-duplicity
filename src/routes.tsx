import * as React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import OverviewPage from "@/pages/OverviewPage";
import DuplicantsPage from "@/pages/DuplicantsPage";
import DuplicantEditorPage from "@/pages/DuplicantEditorPage";
import CreaturesPage from "@/pages/CreaturesPage";
import CreatureEditorPage from "@/pages/CreatureEditorPage";
import GeysersPage from "@/pages/GeysersPage";
// import PlanetsPage from "@/pages/PlanetsPage";
// import MaterialsPage from "@/pages/MaterialsPage";
import RawEditorPage from "@/pages/RawEditorPage";
import SettingsPage from "@/pages/SettingsPage";
import ChangelogPage from "@/pages/ChangelogPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={OverviewPage} />
    <Route path="/duplicants" exact component={DuplicantsPage} />
    <Route
      path="/duplicants/:gameObjectId"
      exact
      component={DuplicantEditorPage}
    />
    <Route path="/creatures" exact component={CreaturesPage} />
    <Route
      path="/creatures/:gameObjectId"
      exact
      component={CreatureEditorPage}
    />
    <Route path="/geysers" exact component={GeysersPage} />
    {/* <Route path="/planets" exact component={PlanetsPage} /> */}
    {/* <Route path="/materials" exact component={MaterialsPage} /> */}
    <Route path="/raw" exact component={RawEditorPage} />
    <Route path="/settings" exact component={SettingsPage} />
    <Route path="/changelog" exact component={ChangelogPage} />
    <Redirect to="/" />
  </Switch>
);
export default Routes;
