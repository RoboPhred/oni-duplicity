import { attachProps } from "@/utils";

import { Background, Intent, isBackground, isIntent, getTheme } from "../theme";
import { ThemeProps, ThemedOuterStyledProps } from "../styled";

export type ColorValue = Background | Intent;
export interface ColorCssProps {
  color?: ColorValue;
}

const colorOf = (color: ColorValue) => (props: ThemedOuterStyledProps<{}>) => {
  const colors = getTheme(props).colors;
  if (isIntent(color)) {
    return `${colors.intent[color]}`;
  } else if (isBackground(color)) {
    return `${colors.bg[color]}`;
  } else {
    return undefined;
  }
};

const colorFromProps = (props: ThemedOuterStyledProps<ColorCssProps>) => {
  let { color } = props;
  if (!color) {
    return undefined;
  }
  return colorOf(color);
};

export const colorValue = attachProps(colorFromProps, {
  of: colorOf
});
