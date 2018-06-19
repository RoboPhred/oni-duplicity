const colors = {
  bgApp: "white",
  bgPanel: "white",
  bgSeparator: "lightgrey"
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
