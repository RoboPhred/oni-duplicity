import * as React from "react";

import Flex from "@/components/Flex";

import NavBarContainer from "./components/NavBar";

import SaveEditor from "@/pages/SaveEditor";

const App: React.SFC = () => (
  <Flex.Container width="100%" height="100%" bg="bg.default" direction="column">
    <Flex.Item>
      <NavBarContainer />
    </Flex.Item>
    <Flex.Item grow shrink>
      <SaveEditor />
    </Flex.Item>
  </Flex.Container>
);

App.displayName = "App";
export default App;
