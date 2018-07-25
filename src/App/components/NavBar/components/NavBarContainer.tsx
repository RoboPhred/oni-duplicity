import styled from "@/style";

import { getTheme } from "@/style";

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: "row";
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  box-sizing: border-box;
  background-color: ${props => getTheme(props).colors.bg.navbar};
`;
NavBarContainer.displayName = "NavBarContainer";
export default NavBarContainer;
