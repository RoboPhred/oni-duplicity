import styled, {
  BackgroundProps,
  IntentProps,
  background,
  intent
} from "@/theme";

import {
  AlignSelfProps,
  JustifySelfProps,
  WidthProps,
  HeightProps,
  SpaceProps,
  alignSelf,
  justifySelf,
  width,
  height,
  space
} from "styled-system";

export type BoxProps = AlignSelfProps &
  JustifySelfProps &
  WidthProps &
  HeightProps &
  SpaceProps &
  BackgroundProps &
  IntentProps;

const Box = styled<BoxProps, "div">("div")`
  ${alignSelf};
  ${justifySelf};
  ${width};
  ${height};
  ${space};
  ${background};
  ${intent.withDefault(null)};
  box-sizing: border-box;
`;
Box.displayName = "Box";
Box.defaultProps = {
  intentIsBg: true
};
export default Box;
