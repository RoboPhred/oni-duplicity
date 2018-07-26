import { css } from "../styled";

import { attachProps } from "@/utils";

import { Intent } from "../intent";

import { Color, getThemeColor } from "../theme";

export interface IntentColorProps {
  intent?: Intent;
}

const intentColorOf = (intent: Intent) => css`
  color: ${getThemeColor(Color.fromIntent(intent))};
`;

const intentColorFromProps = css<IntentColorProps>`
  ${props => intentColorOf(props.intent || Intent.Default)};
`;

export const intentColor = attachProps(intentColorFromProps, {
  of: intentColorOf
});
