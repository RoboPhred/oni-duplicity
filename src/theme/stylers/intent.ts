import { css } from "../styled";

import { attachProps } from "@/utils";

import { Intent } from "../theme";

import { intentColor } from "./intent-color";
import { intentFill } from "./intent-fill";

export interface IntentProps {
  intentIsBg?: boolean;
  intent?: Intent;
}

const intentDefault = (defaultIntent: Intent | null) => css<IntentProps>`
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

const intentFromProps = css<IntentProps>`
  ${props => {
    return props.intentIsBg ? intentFill : intentColor;
  }};
`;

export const intent = attachProps(intentFromProps, {
  withDefault: intentDefault,
  of: intentOf
});
