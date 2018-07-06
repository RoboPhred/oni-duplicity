import * as React from "react";

import SidebarContainer from "./components/SidebarContainer";

import EditorModeSelector from "./components/EditorModeSelector";
import SaveStructureTree from "./components/SaveStructureTree";

const Sidebar: React.SFC = () => (
  <SidebarContainer>
    <EditorModeSelector />
    <SaveStructureTree />
  </SidebarContainer>
);
Sidebar.displayName = "Sidebar";
export default Sidebar;
