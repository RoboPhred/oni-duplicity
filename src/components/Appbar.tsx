import * as React from "react";

import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";

import SettingsButton from "./SettingsButton";
import SaveIconButton from "./SaveIconButton";
import LoadIconButton from "./LoadIconButton";
import BackButton from "./BackButton";
import ModifiedChip from "./ModifiedChip";
import DLCChip from "./DLCChip";
import ExampleChip from "./ExampleChip";

export interface AppbarProps {
  title: string;
  back?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    chip: {
      marginRight: theme.spacing(),
    },
  });

type Props = AppbarProps & WithStyles<typeof styles>;

const Appbar: React.FC<Props> = ({ classes, title, back }) => (
  <MaterialAppBar position="static">
    <Toolbar>
      {back && <BackButton />}
      <Typography className={classes.title} variant="h6" color="inherit">
        {title}
      </Typography>
      <DLCChip className={classes.chip} />
      <ModifiedChip className={classes.chip} />
      <ExampleChip className={classes.chip} />
      <SaveIconButton />
      <LoadIconButton />
      <SettingsButton />
    </Toolbar>
  </MaterialAppBar>
);
export default withStyles(styles)(Appbar);
