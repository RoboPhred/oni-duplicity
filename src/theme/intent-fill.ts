import { css } from "styled-components";
import { Intent, getTheme } from "./theme";

export interface IntentFillProps {
  intent?: Intent;
}

export const intentFill = css<IntentFillProps>`
  color: ${props =>
    getTheme(props).colors.textIntent[props.intent || "default"]};
  background-color: ${props =>
    getTheme(props).colors.intent[props.intent || "default"]};
`;
