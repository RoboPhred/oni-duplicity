import { themeGet } from "styled-system";

import { ThemeProps } from "../styled";

export const enum Space {
  None,
  Small,
  Medium,
  Large
}

export const space = [0, 4, 8, 12];

export function getThemeSpace(space: Space): (props: ThemeProps) => string {
  return themeGet("space." + space, "space." + Space.None);
}
