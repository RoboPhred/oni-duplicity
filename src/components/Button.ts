import * as React from "react";

import styled, {
  Space,
  FontSize,
  Radius,
  getThemeRadius,
  getThemeSpace
} from "@/style";

import { Intent, getTheme, intentFill } from "@/style";

export interface ButtonProps {
  intent?: Intent;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const Button = styled<ButtonProps, "button">("button")`
  ${intentFill};
  border: none;
  border-radius: ${getThemeRadius(Radius.Button)}px;
  margin: ${getThemeSpace(Space.Small)}px;
  font-size: ${props => getTheme(props).fontSizes[FontSize.Button]}px;
`;
Button.displayName = "Button";
Button.defaultProps = {
  intent: Intent.Default
};

export default Button;
