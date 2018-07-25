import styled from "@/style";

import { WidthProps, SpaceProps, width, space } from "styled-system";

import { getTheme } from "@/style";

export interface SeparatorProps extends WidthProps, SpaceProps {}
const Separator = styled<SeparatorProps, "div">("div")`
  border-bottom: 2px solid;
  border-color: ${props => getTheme(props).colors.bg.separator};
  ${width};
  ${space};
  height: 2px;
`;
Separator.displayName = "Separator";
export default Separator;
