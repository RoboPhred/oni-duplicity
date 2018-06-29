import * as React from "react";

import styled from "styled-components";

import { Intent, getTheme } from "@/theme";

export interface ButtonProps {
  intent?: Intent;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const Button = styled<ButtonProps, "button">("button")`
  border: ${props => getTheme(props).borders[1]};
  border-radius: ${props => getTheme(props).radii[1]}px;
  font-size: ${props => getTheme(props).fontSizes[1]}px;
  background-color: ${props =>
    getTheme(props).colors.intent[props.intent || "default"]};
`;
Button.displayName = "Button";
export default Button;
