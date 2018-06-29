import * as React from "react";

import AppContainer from "./components/AppContainer";
import AppContent from "./components/AppContent";
import NavBarContainer from "./components/NavBar";

import SaveEditor from "@/pages/SaveEditor";

const App: React.SFC = () => (
  <AppContainer>
    <NavBarContainer />
    <AppContent>
      <SaveEditor />
    </AppContent>
  </AppContainer>
);

App.displayName = "App";
export default App;
