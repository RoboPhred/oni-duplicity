import { css, ThemedOuterStyledProps } from "../styled";

import { attachProps } from "@/utils";

import { Intent, Border, Background, getTheme, Radii } from "../theme";

import { ColorValue, colorValue } from "./color";

export interface BorderCssProps {
  border?: Border;
  borderColor?: ColorValue;
  borderRadius?: Radii;
}

// Things that use this do not always flatten.  css``, for example
export const borderValue = (type: Border, color: Background | Intent) => (
  props: ThemedOuterStyledProps<BorderCssProps>
) => `${getTheme(props).borders[type]} ${colorValue.of(color)(props)}`;

const borderOf = (
  type: Border,
  color: Background | Intent,
  radius?: Radii
) => css`
  border: ${borderValue(type, color)};
  ${props =>
    radius ? `border-radius: ${getTheme(props).radii[radius]}px;` : undefined};
`;

const borderFromProps = css<BorderCssProps>`
  ${props =>
    borderOf(
      props.border || Border.None,
      props.borderColor || Background.Separator,
      props.borderRadius
    )};
`;

export const border = attachProps(borderFromProps, {
  of: borderOf
});
