import styled from "styled-components";
import {
  BgColorProps,
  WidthProps,
  HeightProps,
  bgColor,
  width,
  height
} from "styled-system";

export type BoxProps = BgColorProps & WidthProps & HeightProps;

const Box = styled<BoxProps, "div">("div")`
  ${bgColor}
  ${width}
  ${height}
`;
export default Box;
