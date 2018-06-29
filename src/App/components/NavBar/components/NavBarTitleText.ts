import styled from "styled-components";
import { getTheme } from "@/theme";

const NavBarTitleText = styled.span`
  font-size: 2em;
  margin-left: 5px;
  color: ${props => getTheme(props).colors.intent.primary};
`;
NavBarTitleText.displayName = "NavBarTitleText";
export default NavBarTitleText;
