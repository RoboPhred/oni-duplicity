import * as React from "react";

import { Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

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
    spinner: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    message: {
      textAlign: "center"
    }
  });

type Props = StyleProps<typeof styles>;
const LoadingDialog: React.SFC<Props> = ({ classes }) => (
  <AbstractLoadStatus>
    {({ isLoading, message }) => (
      <Dialog open={isLoading}>
        <div className={classes.root}>
          <div className={classes.content}>
            <Typography className={classes.loadingText} variant="h4">
              <Trans i18nKey="save-file.loading">Loading</Trans>
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
