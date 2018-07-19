import styled, {
  BackgroundCssProps,
  BorderCssProps,
  IntentCssProps,
  background,
  border,
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
  BackgroundCssProps &
  BorderCssProps &
  IntentCssProps;

const Box = styled<BoxProps, "div">("div")`
  ${alignSelf};
  ${justifySelf};
  ${width};
  ${height};
  ${space};
  ${background};
  ${border};
  ${intent.withDefault(null)};
  box-sizing: border-box;
`;
Box.displayName = "Box";
Box.defaultProps = {
  intentIsBg: false
};
export default Box;
