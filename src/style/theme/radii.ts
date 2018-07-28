import { themeGet } from "styled-system";

import { ThemeProps } from "../styled";

export const enum Radius {
  None = 0,

  Small = 1,
  Button = 1,

  Medium = 2,
  Large = 3
}

export const radii = [0, 2, 4, 8];

export function getThemeRadius(radius: Radius): (props: ThemeProps) => string {
  return themeGet("radii." + radius, "radii." + Radius.None);
}
