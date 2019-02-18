import * as React from "react";
import { connect } from "react-redux";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";

import mapStateToProps, { StateProps } from "./state-props";

const styles = (theme: Theme) =>
  createStyles({
    content: {
      width: theme.spacing.unit * 60,
      height: theme.spacing.unit * 40
    }
  });

type Props = StateProps & StyleProps<typeof styles>;
const LoadingDialog: React.SFC<Props> = ({ classes, isLoading }) => (
  <Dialog open={isLoading}>
    <div className={classes.content}>Loading</div>
  </Dialog>
);
export default connect(mapStateToProps)(withStyles(styles)(LoadingDialog));
