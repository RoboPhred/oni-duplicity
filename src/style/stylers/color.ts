import { attachProps } from "@/utils";

import { Background, Intent, isBackground, isIntent, getTheme } from "../theme";
import { ThemedOuterStyledProps } from "../styled";

export type ColorValue = Background | Intent;
export interface ColorCssProps {
  color?: ColorValue;
}

const colorValueOf = (color: ColorValue) => (
  props: ThemedOuterStyledProps<{}>
) => {
  const colors = getTheme(props).colors;
  if (isIntent(color)) {
    return `${colors.intent[color]}`;
  } else if (isBackground(color)) {
    return `${colors.bg[color]}`;
  } else {
    return undefined;
  }
};

const colorValueFromProps = (props: ThemedOuterStyledProps<ColorCssProps>) => {
  let { color } = props;
  if (!color) {
    return undefined;
  }
  return colorValueOf(color);
};

export const colorValue = attachProps(colorValueFromProps, {
  of: colorValueOf
});
