import { css, ThemedOuterStyledProps } from "../styled";

import { attachProps } from "@/utils";

import { Intent, Border, Background, getTheme } from "../theme";

import { ColorCssProps, colorValue } from "./color";

export interface BorderCssProps extends ColorCssProps {
  border?: Border;
}

// Things that use this do not always flatten.  css``, for example
export const borderValue = (type: Border, color: Background | Intent) => (
  props: ThemedOuterStyledProps<BorderCssProps>
) => `${getTheme(props).borders[type]} ${colorValue.of(color)(props)}`;

const borderOf = (type: Border, color: Background | Intent) => css`
  border: ${borderValue(type, color)};
`;

const borderFromProps = css<BorderCssProps>`
  ${props =>
    borderOf(props.border || Border.None, props.color || Background.Separator)};
`;

export const border = attachProps(borderFromProps, {
  of: borderOf
});
