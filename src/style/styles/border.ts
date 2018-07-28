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
    props.border != null
      ? `border: ${getThemeBorder(props.border)(props)}`
      : undefined};

  ${props =>
    props.borderColor != null
      ? `border-color: ${getThemeColor(props.borderColor)(props)}`
      : undefined};

  ${props =>
    props.borderRadius != null
      ? `border-radius: ${getThemeRadius(props.borderRadius)(props)}px`
      : undefined};
`;

export const border = attachProps(borderFromProps, {
  of: borderOf
});
