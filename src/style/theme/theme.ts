import { themeGet } from "styled-system";

import { borders } from "./borders";
import { colors } from "./colors";
import { fontSizes } from "./font-sizes";
import { radii } from "./radii";
import { space } from "./space";
import { ThemeProps } from "@/style/styled";

export const theme = {
  borders,
  colors,
  fontSizes,
  radii,
  space
};

export type Theme = typeof theme;

export function getTheme(props: any): Theme {
  return props.theme || theme;
}

export function getThemeProp<T>(
  getter: ((theme: Theme) => T) | string,
  defaultValue?: T
): (props: ThemeProps) => string | undefined {
  return (props: ThemeProps) => {
    if (typeof getter === "string") {
      return themeGet(getter, defaultValue as any);
    }

    const val = getter(getTheme(props));
    if (val === undefined) {
      return defaultValue;
    }
    return val;
  };
}
