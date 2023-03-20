import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  StyleRulesCallback,
} from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Nav from "./Nav";
import GithubButton from "./GithubButton";

export interface SidebarProps {
  className?: string;
}

// Note: The old dependencies are rotting away.  Using the injected theme now creates baffling typescript errors.
const styles: StyleRulesCallback<Theme, {}> = ((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      display: "flex",
      paddingLeft: theme.spacing(3),
      alignItems: "center",
    },
    ghButton: {
      marginLeft: "auto",
      marginRight: theme.spacing(),
    },
  })) as any;

type Props = SidebarProps & WithStyles<typeof styles>;

const Sidebar: React.FC<Props> = ({ className, classes }) => (
  <div className={className}>
    <div className={classes.toolbar}>
      <Typography variant="h6" color="textSecondary">
        Duplicity
      </Typography>
      <GithubButton className={classes.ghButton} />
    </div>
    <Divider />
    <Nav />
  </div>
);
export default withStyles(styles)(Sidebar);
