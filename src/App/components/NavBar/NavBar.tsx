import * as React from "react";

import NavBarContainer from "./components/NavBarContainer";

import NavBarTitleText from "./components/NavBarTitleText";

const NavBar: React.SFC = () => (
  <NavBarContainer>
    <NavBarTitleText>Duplicity</NavBarTitleText>
  </NavBarContainer>
);
export default NavBar;
