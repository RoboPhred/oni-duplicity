import { createMuiTheme } from "@material-ui/core/styles";

// Theme settings can be adjusted here.
//  https://material-ui.com/style/color/

const theme = createMuiTheme({
  typography: {
    // Opt in to using the newer set of font styles.
    //  The old styles are deprecated and will be
    //  removed.
    useNextVariants: true
  }
});

export default theme;
