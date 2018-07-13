import styled, {
  BackgroundProps,
  IntentProps,
  background,
  intent
} from "@/theme";

import {
  AlignSelfProps,
  WidthProps,
  HeightProps,
  SpaceProps,
  alignSelf,
  width,
  height,
  space
} from "styled-system";

export type BoxProps = AlignSelfProps &
  WidthProps &
  HeightProps &
  SpaceProps &
  BackgroundProps &
  IntentProps;

const Box = styled<BoxProps, "div">("div")`
  ${alignSelf};
  ${width};
  ${height};
  ${space} ${background};
  ${intent.withDefault(null)};
  box-sizing: border-box;
`;
Box.displayName = "Box";
Box.defaultProps = {
  intentIsBg: true
};
export default Box;
