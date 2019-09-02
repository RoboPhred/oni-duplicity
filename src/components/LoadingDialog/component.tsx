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

export interface LoadingDialogProps {
  isLoading: boolean;
  isSaving: boolean;
  message: string | null;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(60),
      height: theme.spacing(20)
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

const LoadingDialog: React.FC<Props> = ({
  isLoading,
  isSaving,
  message,
  classes
}) => (
  <Dialog open={isLoading || isSaving}>
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.loadingText} variant="h4">
          {isLoading && (
            <Trans i18nKey="save-file.conditions.loading">Loading</Trans>
          )}
          {isSaving && (
            <Trans i18nKey="save-file.conditions.saving">Saving</Trans>
          )}
        </Typography>
        <Typography className={classes.message} variant="body1">
          {message}
        </Typography>
      </div>
    </div>
  </Dialog>
);
export default withStyles(styles)(LoadingDialog);
