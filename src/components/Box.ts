import styled, {
  BackgroundProps,
  IntentProps,
  background,
  intent
} from "@/theme";

import {
  WidthProps,
  HeightProps,
  SpaceProps,
  width,
  height,
  space
} from "styled-system";

export type BoxProps = WidthProps &
  HeightProps &
  SpaceProps &
  BackgroundProps &
  IntentProps;

const Box = styled<BoxProps, "div">("div")`
  ${width};
  ${height};
  ${space} ${background};
  ${intent.withDefault(null)};
`;
Box.displayName = "Box";
Box.defaultProps = {
  intentIsBg: true
};
export default Box;
