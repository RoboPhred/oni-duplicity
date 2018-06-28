export namespace Intent {
  export const Primary = "primary";
  export const Default = "default";
}

const intentColors: Record<Indexer<typeof Intent>, string> = {
  default: "#5C6672",
  primary: "#137cbd"
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
