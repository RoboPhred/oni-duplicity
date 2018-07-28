import { css } from "../styled";

import { attachProps } from "@/utils";

import { Intent } from "../intent";

import { intentColor, IntentColorProps } from "./intent-color";
import { intentFill } from "./intent-fill";

export interface IntentProps extends IntentColorProps {
  intentIsBg?: boolean;
}

const intentOf = (intent: Intent, isBg: boolean = false) => css`
  ${isBg ? intentFill.of(intent) : intentColor.of(intent)};
`;

const intentFromProps = css<IntentProps>`
  ${props => {
    if (props.intent == null) {
      return undefined;
    }
    return props.intentIsBg ? intentFill : intentColor;
  }};
`;

export const intent = attachProps(intentFromProps, {
  of: intentOf
});
