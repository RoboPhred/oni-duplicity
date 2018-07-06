import { css } from "styled-components";
import { Intent, getTheme } from "./theme";

export interface IntentColorProps {
  intent?: Intent;
}

export const intentColor = css<IntentColorProps>`
  color: ${props => getTheme(props).colors.intent[props.intent || "default"]};
`;
