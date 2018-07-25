import { themeGet } from "styled-system";

import { ThemeProps } from "../styled";

export const enum Border {
  None,
  Normal,
  Thick
}

export const borders = [0, "1px solid", "2px solid"];

export function getThemeBorder(border: Border): (props: ThemeProps) => string {
  return themeGet("borders." + border, "borders." + Border.Normal);
}
