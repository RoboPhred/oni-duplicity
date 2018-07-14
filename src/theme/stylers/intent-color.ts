import { css } from "../styled";
import { Intent, getTheme } from "../theme";

import { attachProps } from "@/utils";

export interface IntentColorProps {
  intent?: Intent;
}

const intentColorOf = (intent: Intent) => css`
  color: ${props => getTheme(props).colors.intent[intent]};
`;

const intentColorFromProps = css<IntentColorProps>`
  ${props => intentColorOf(props.intent || Intent.Default)};
`;

export const intentColor = attachProps(intentColorFromProps, {
  of: intentColorOf
});
