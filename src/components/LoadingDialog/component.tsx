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

export interface LoadingDialogProps {
  isLoading: boolean;
  message: string | null;
}

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

type Props = LoadingDialogProps & WithStyles<typeof styles>;

const LoadingDialog: React.SFC<Props> = ({ isLoading, message, classes }) => (
  <Dialog open={isLoading}>
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
);
export default withStyles(styles)(LoadingDialog);
