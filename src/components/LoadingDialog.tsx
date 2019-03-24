import * as React from "react";

import { Trans } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import { LoadingStatus } from "@/services/oni-save/state";
import AbstractLoadStatus from "@/services/oni-save/components/AbstractLoadStatus";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing.unit * 60,
      height: theme.spacing.unit * 20
    },
    content: {
      verticalAlign: "middle"
    },
    loadingText: {
      textAlign: "center"
    },
    message: {
      textAlign: "center"
    }
  });

type Props = WithStyles<typeof styles>;

const LoadingDialog: React.SFC<Props> = ({ classes }) => (
  <AbstractLoadStatus>
    {({ status, message }) => (
      <Dialog open={status === LoadingStatus.Loading}>
        <div className={classes.root}>
          <div className={classes.content}>
            <Typography className={classes.loadingText} variant="h4">
              <Trans i18nKey="save-file.conditions.loading">Loading</Trans>
            </Typography>
            <Typography className={classes.message} variant="body1">
              {message}
            </Typography>
          </div>
        </div>
      </Dialog>
    )}
  </AbstractLoadStatus>
);
export default withStyles(styles)(LoadingDialog);
