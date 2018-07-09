import styled from "@/theme";
import { WidthProps, HeightProps, width, height } from "styled-system";
import { getTheme } from "@/theme";

export type BoxProps = WidthProps & HeightProps;

const Panel = styled<BoxProps, "div">("div")`
  ${width};
  ${height};
  background-color: ${props => getTheme(props).colors.bg.panel};
  overflow: auto;
`;
Panel.displayName = "Panel";
export default Panel;
