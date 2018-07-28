import styled from "@/style";
import { getTheme } from "@/style";

const NavBarTitleText = styled.span`
  font-size: 2em;
  margin-left: 5px;
  color: ${props => getTheme(props).colors.intent.primary};
`;
NavBarTitleText.displayName = "NavBarTitleText";
export default NavBarTitleText;
