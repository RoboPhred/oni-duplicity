import { includes } from "lodash-es";

export enum Intent {
  Primary = "primary",
  Secondary = "secondary",
  Default = "default",
  Dangerous = "dangerous",
  Hint = "hint"
}

export function isIntent(str: string | null | undefined): str is Intent {
  return includes(Intent, str);
}

export enum Background {
  Default = "default",
  Navbar = "navbar",
  Panel = "panel",
  Separator = "separator"
}

export function isBackground(
  str: string | null | undefined
): str is Background {
  return includes(Background, str);
}

// https://coolors.co/33658a-ffb238-86bbd8-f34213-758e4f
const intentColors: Record<Intent, string> = {
  default: "#86BBD8",
  primary: "#FFB238",
  secondary: "#658E27",
  dangerous: "#F34213",
  hint: "#86BBD8"
};

/**
 * Colors to use when the background is an intent.
 */
const textIntentContrastColors: Record<Intent, string> = {
  default: "black",
  primary: "black",
  secondary: "black",
  dangerous: "white",
  hint: "black"
};

// https://coolors.co/313e50-3a435e-455561-5c6672-6c6f7f
const backgroundColors: Record<Background, string> = {
  default: "#3A435E",
  navbar: "#313E50",
  panel: "#455561",
  separator: "#6C6F7F"
};

const colors = {
  text: intentColors.default,
  intent: intentColors,
  textIntentContrast: textIntentContrastColors,
  bg: backgroundColors
};

export const enum Space {
  None,
  Small,
  Medium,
  Large
}
const space = [0, 4, 8, 12];

export const enum FontSize {
  Default = 2,
  HeadingMinor = 3,
  Heading = 4
}
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];

// border-radius
const radii = [0, 2, 4, 8];

const borders = [0, "1px solid", "2px solid"];

export const theme = {
  colors,
  space,
  fontSizes,
  radii,
  borders
};

export type Theme = typeof theme;

export function getTheme(props: any): Theme {
  return props.theme || theme;
}
