const colors = {
  bgApp: "white",
  bgPanel: "white",
  bgSeperator: "lightgrey"
};

const space = [0, 4];

const theme = {
  colors,
  space,
  primitives: {
    app: {
      background: colors.bgApp
    },
    panel: {
      background: colors.bgPanel,
      padding: space[1]
    }
  }
};

export type Theme = typeof theme;
export default theme;

export function getTheme(props: any): Theme {
  return props.theme || theme;
}
