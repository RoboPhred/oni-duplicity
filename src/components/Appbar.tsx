import * as React from "react";

import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { createStyles, withStyles } from "@material-ui/core/styles";

import SettingsButton from "./SettingsButton";
import SaveModifiedChip from "./SaveModifiedChip";

export interface AppbarProps {
  title: string;
}

const styles = createStyles({
  title: {
    flexGrow: 1
  }
});

type Props = AppbarProps & StyleProps<typeof styles>;
const Appbar: React.SFC<Props> = ({ classes, title }) => (
  <MaterialAppBar position="static">
    <Toolbar>
      <Typography className={classes.title} variant="h6" color="inherit">
        {title}
      </Typography>
      <SaveModifiedChip />
      <SettingsButton />
    </Toolbar>
  </MaterialAppBar>
);
export default withStyles(styles)(Appbar);
