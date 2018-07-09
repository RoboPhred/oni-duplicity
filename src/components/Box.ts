import styled, {
  BackgroundProps,
  IntentProps,
  background,
  intent
} from "@/theme";

import { WidthProps, HeightProps, width, height } from "styled-system";

export type BoxProps = WidthProps & HeightProps & BackgroundProps & IntentProps;

const Box = styled<BoxProps, "div">("div")`
  ${width};
  ${height};
  ${background};
  ${intent.withDefault(null)};
`;
Box.displayName = "Box";
Box.defaultProps = {
  intentIsBg: true
};
export default Box;
