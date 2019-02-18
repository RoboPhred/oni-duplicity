import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Nav from "./Nav";

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
    }
  });

type Props = SidebarProps & StyleProps<typeof styles>;
const Sidebar: React.SFC<Props> = ({ className, classes }) => (
  <div className={className}>
    <div className={classes.toolbar}>
      <Typography variant="h6" color="textSecondary">
        Duplicity
      </Typography>
    </div>
    <Divider />
    <Nav />
  </div>
);
export default withStyles(styles)(Sidebar);
