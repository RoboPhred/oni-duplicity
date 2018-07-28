import * as styledComponents from "styled-components";
import {
  ThemedStyledComponentsModule,
  ThemedOuterStyledProps as _ThemedOuterStyledProps
} from "styled-components";

import { Theme } from "./theme";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export type ThemeProps = {
  theme?: Theme;
};
export type ThemedOuterStyledProps<P> = _ThemedOuterStyledProps<P, Theme>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
