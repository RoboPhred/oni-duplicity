import { themeGet } from "styled-system";

import { Intent } from "../intent";
import { ThemeProps } from "../styled";

const intentColors: Record<Intent, string> = {
  default: "#86BBD8",
  primary: "#FFB238",
  secondary: "#658E27",
  dangerous: "#F34213",
  hint: "#86BBD8"
};

const intentContrastColors: Record<Intent, string> = {
  default: "black",
  primary: "black",
  secondary: "black",
  dangerous: "white",
  hint: "black"
};

const backgroundColors = {
  default: "#313a57", //"#3A435E",
  navbar: "#355d95", //"#313E50",
  panel: "#36444f" //"#455561",
};

export enum Color {
  DefaultIntent = "intent.default",
  PrimaryIntent = "intent.primary",
  SecondaryIntent = "intent.secondary",
  DangerousIntent = "intent.dangerous",
  HintIntent = "intent.hint",

  DefaultIntentContrast = "intent.contrast.default",
  PrimaryIntentContrast = "intent.contrast.primary",
  SecondaryIntentContrast = "intent.contrast.secondary",
  DangerousIntentContrast = "intent.contrast.dangerous",
  HintIntentContrast = "intent.contrast.hint",

  DefaultBackground = "bg.default",
  NavbarBackground = "bg.navbar",
  PanelBackground = "bg.panel",

  DefaultSeparator = "separator"
}
export namespace Color {
  export function fromIntent(intent: Intent, contrast?: boolean) {
    switch (intent) {
      default:
        return contrast ? Color.DefaultIntentContrast : Color.DefaultIntent;
      case Intent.Primary:
        return contrast ? Color.PrimaryIntentContrast : Color.PrimaryIntent;
      case Intent.Secondary:
        return contrast ? Color.SecondaryIntentContrast : Color.SecondaryIntent;
      case Intent.Dangerous:
        return contrast ? Color.DangerousIntentContrast : Color.DangerousIntent;
      case Intent.Hint:
        return contrast ? Color.HintIntentContrast : Color.HintIntent;
    }
  }
}

export const colors = {
  intent: {
    ...intentColors,
    contrast: intentContrastColors
  },
  bg: backgroundColors,

  separator: "#6C6F7F"
};

export function getThemeColor(color: Color): (props: ThemeProps) => string {
  return themeGet("colors." + color, "colors." + Color.DefaultIntent);
}
