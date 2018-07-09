import { css } from "../styled";

import { Background, Intent, isBackground, isIntent, getTheme } from "../theme";
import { attachProps } from "@/utils";

export interface BackgroundProps {
  background?: Background | Intent;
}

export const backgroundOf = (background: Background | Intent) => css<
  BackgroundProps
>`
  ${props => {
    const colors = getTheme(props).colors;
    if (isIntent(background)) {
      return `background-color: ${colors.intent[background]}`;
    } else if (isBackground(background)) {
      return `background-color: ${colors.bg[background]}`;
    } else {
      return undefined;
    }
  }};
`;

export const backgroundFromProps = css<BackgroundProps>`
  ${props => {
    let { background } = props;
    if (!background) {
      return undefined;
    }
    return backgroundOf(background);
  }};
`;

export const background = attachProps(backgroundFromProps, {
  of: backgroundOf
});
