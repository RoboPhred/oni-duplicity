import { css } from "../styled";

import { attachProps } from "@/utils";

import { Border, Color, Radius } from "../theme";

import { getThemeBorder, getThemeRadius, getThemeColor } from "../theme";

export interface BorderProps {
  border?: Border;
  borderColor?: Color;
  borderRadius?: Radius;
}

const borderOf = (type: Border, color: Color, radius?: Radius) => css`
  border: ${getThemeBorder(type)};
  border-color: ${getThemeColor(color)};
  ${radius ? `border-radius: ${getThemeRadius(radius)}` : undefined};
`;

const borderFromProps = css<BorderProps>`
  ${props =>
    props.border ? `border: ${getThemeBorder(props.border)}` : undefined};

  ${props =>
    props.borderColor
      ? `border-color: ${getThemeColor(props.borderColor)}`
      : undefined};

  ${props =>
    props.borderRadius
      ? `border-radius: ${getThemeRadius(props.borderRadius)}`
      : undefined};
`;

export const border = attachProps(borderFromProps, {
  of: borderOf
});
