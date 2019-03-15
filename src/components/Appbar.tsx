import * as React from "react";

import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { createStyles, withStyles } from "@material-ui/core/styles";

import SettingsButton from "./SettingsButton";
import SaveModifiedChip from "./SaveModifiedChip";
import SaveButton from "./SaveButton";
import BackButton from "./BackButton";
import SaveExampleChip from "./SaveExampleChip";

export interface AppbarProps {
  title: string;
  back?: boolean;
}

const styles = createStyles({
  title: {
    flexGrow: 1
  }
});

type Props = AppbarProps & StyleProps<typeof styles>;
const Appbar: React.SFC<Props> = ({ classes, title, back }) => (
  <MaterialAppBar position="static">
    <Toolbar>
      {back && <BackButton />}
      <Typography className={classes.title} variant="h6" color="inherit">
        {title}
      </Typography>
      <SaveModifiedChip />
      <SaveExampleChip />
      <SaveButton />
      <SettingsButton />
    </Toolbar>
  </MaterialAppBar>
);
export default withStyles(styles)(Appbar);
