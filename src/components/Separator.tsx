import styled from "@/style";

import { WidthProps, SpaceProps, width, space } from "styled-system";

import { Color, getThemeColor } from "@/style";

export interface SeparatorProps extends WidthProps, SpaceProps {
  color?: Color;
}
const Separator = styled<SeparatorProps, "div">("div")`
  border-bottom: 2px solid;
  border-color: ${props =>
    getThemeColor(props.color || Color.DefaultSeparator)(props)};
  ${width};
  ${space};
  height: 2px;
`;
Separator.displayName = "Separator";
export default Separator;
