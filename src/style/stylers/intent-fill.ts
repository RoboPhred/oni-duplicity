import { css } from "../styled";

import { Intent, getTheme } from "../theme";
import { attachProps } from "@/utils";

export interface IntentFillProps {
  intent?: Intent;
}

const intentFillOf = (intent: Intent) => css<IntentFillProps>`
  color: ${props => getTheme(props).colors.textIntentContrast[intent]};
  background-color: ${props => getTheme(props).colors.intent[intent]};
`;

const intentFillFromProps = css<IntentFillProps>`
  ${props => intentFillOf(props.intent || Intent.Default)};
`;

export const intentFill = attachProps(intentFillFromProps, {
  of: intentFillOf
});
