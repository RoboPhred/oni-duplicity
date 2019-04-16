import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Nav from "./Nav";
import GithubButton from "./GithubButton";

export interface SidebarProps {
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      display: "flex",
      paddingLeft: theme.spacing.unit * 3,
      alignItems: "center"
    },
    ghButton: {
      marginLeft: "auto",
      marginRight: theme.spacing.unit
    }
  });

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
