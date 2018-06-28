export namespace Intent {
  export const Primary = "primary";
  export const Default = "default";
  export const Dangerous = "dangerous";
  export const Hint = "hint";
}

// https://coolors.co/33658a-ffb238-86bbd8-f34213-758e4f
const intentColors: Record<Indexer<typeof Intent>, string> = {
  default: "#FFB238",
  primary: "#758E4F",
  dangerous: "#F34213",
  hint: "#86BBD8"
};

// https://coolors.co/313e50-3a435e-455561-5c6672-6c6f7f
const backgroundColors = {
  default: "#3A435E",
  navbar: "#313E50",
  separator: "#6C6F7F"
};

const colors = {
  intent: intentColors,
  bg: backgroundColors
};

const space = [0, 4];

const theme = {
  colors,
  space
};

export type Theme = typeof theme;
export default theme;

export function getTheme(props: any): Theme {
  return props.theme || theme;
}
