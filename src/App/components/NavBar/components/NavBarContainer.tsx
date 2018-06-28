import styled from "styled-components";
import { getTheme } from "@/theme";

const NavBarContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: ${props => getTheme(props).colors.bg.navbar};
`;
NavBarContainer.displayName = "NavBarContainer";
export default NavBarContainer;
