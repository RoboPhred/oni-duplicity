import { css } from "../styled";

import { attachProps } from "@/utils";

import { Intent } from "../theme";

import { intentColor, IntentColorProps } from "./intent-color";
import { intentFill } from "./intent-fill";

export interface IntentCssProps extends IntentColorProps {
  intentIsBg?: boolean;
}

const intentDefault = (defaultIntent: Intent | null) => css<IntentCssProps>`
  ${props => {
    return props.intent
      ? props.intentIsBg
        ? intentFill
        : intentColor
      : defaultIntent;
  }};
`;

const intentOf = (intent: Intent, isBg: boolean = false) => css`
  ${isBg ? intentFill.of(intent) : intentColor.of(intent)};
`;

const intentFromProps = css<IntentCssProps>`
  ${props => {
    return props.intentIsBg ? intentFill : intentColor;
  }};
`;

export const intent = attachProps(intentFromProps, {
  withDefault: intentDefault,
  of: intentOf
});
