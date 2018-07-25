import { css } from "../styled";

import { attachProps } from "@/utils";

import { Intent } from "../intent";

import { colorFromIntent, getThemeColor } from "../theme";

export interface IntentFillProps {
  intent?: Intent;
}

const intentFillOf = (intent: Intent) => css`
  color: ${getThemeColor(colorFromIntent(intent, true))};
  background-color: ${getThemeColor(colorFromIntent(intent))};
`;

const intentFillFromProps = css<IntentFillProps>`
  ${props => (props.intent ? intentFillOf(props.intent) : undefined)};
`;

export const intentFill = attachProps(intentFillFromProps, {
  of: intentFillOf
});
