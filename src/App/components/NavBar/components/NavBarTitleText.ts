import styled from "styled-components";
import { getTheme } from "@/theme";

const NavBarTitleText = styled.span`
  font-size: 2em;
  color: ${props => getTheme(props).colors.intent.default};
`;
NavBarTitleText.displayName = "NavBarTitleText";
export default NavBarTitleText;
