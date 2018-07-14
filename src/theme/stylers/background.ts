import { attachProps } from "@/utils";

import { css } from "../styled";

import { ColorValue, colorValue } from "./color";

export interface BackgroundProps {
  background?: ColorValue;
}

export const backgroundOf = (background: ColorValue) => css<BackgroundProps>`
  background-color: ${colorValue.of(background)};
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
