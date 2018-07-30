import * as React from "react";

import { SpaceProps, space } from "styled-system";

import styled, {
  Space,
  FontSize,
  Radius,
  VerticalAlignProps,
  getThemeRadius,
  verticalAlign
} from "@/style";

import { Intent, getTheme, intentFill } from "@/style";

export interface ButtonProps extends SpaceProps, VerticalAlignProps {
  intent?: Intent;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const Button = styled<ButtonProps, "button">("button")`
  ${intentFill};
  ${verticalAlign};
  ${space} border: none;
  border-radius: ${getThemeRadius(Radius.Button)}px;
  font-size: ${props => getTheme(props).fontSizes[FontSize.Button]}px;
  cursor: pointer;
`;
Button.displayName = "Button";
Button.defaultProps = {
  intent: Intent.Default,
  m: Space.Small
};

export default Button;
