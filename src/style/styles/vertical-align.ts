import { VerticalAlignProperty } from "csstype";

import { style } from "styled-system";

export interface VerticalAlignProps {
  verticalAlign?: VerticalAlignProperty<string | 0>;
}
export const verticalAlign = style({
  prop: "verticalAlign",
  cssProperty: "vertical-align"
});
