import styled from "@/style";
import { WidthProps, HeightProps, width, height } from "styled-system";
import { getTheme } from "@/style";

export type BoxProps = WidthProps & HeightProps;

const Panel = styled<BoxProps, "div">("div")`
  ${width};
  ${height};
  background-color: ${props => getTheme(props).colors.bg.panel};
`;
Panel.displayName = "Panel";
export default Panel;
