import { css } from "../styled";

import { attachProps } from "@/utils";

import { Intent } from "../intent";

import {
  Border,
  Radius,
  getThemeBorder,
  getThemeRadius,
  getThemeColor,
  colorFromIntent
} from "../theme";

export interface IntentBorderProps {
  intent?: Intent;
}

const borderOf = (intent: Intent) => css`
  border: ${getThemeBorder(Border.Normal)};
  border-color: ${getThemeColor(colorFromIntent(intent))};
  ${intent !== Intent.Default
    ? `border-radius: ${getThemeRadius(Radius.Medium)}`
    : undefined};
`;

const borderFromProps = css<IntentBorderProps>`
  ${props => (props.intent ? borderOf(props.intent) : undefined)};
`;

export const intentBorder = attachProps(borderFromProps, {
  of: borderOf
});
