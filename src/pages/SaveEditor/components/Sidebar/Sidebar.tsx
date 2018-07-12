import * as React from "react";

import Flex from "@/components/Flex";

import SidebarContainer from "./components/SidebarContainer";

import EditorModeSelector from "./components/EditorModeSelector";
import SaveStructureTree from "./components/SaveStructureTree";

const Sidebar: React.SFC = () => (
  <SidebarContainer>
    <Flex direction="column" height="100%">
      <EditorModeSelector />
      <Flex.Item fillParent constrain="column">
        <SaveStructureTree />
      </Flex.Item>
    </Flex>
  </SidebarContainer>
);
Sidebar.displayName = "Sidebar";
export default Sidebar;
