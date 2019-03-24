import * as React from "react";

import { Trans } from "react-i18next";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import AbstractImportWarningDialog from "@/services/oni-save/components/AbstractImportWarningDialog";

const styles = createStyles({
  description: {
    whiteSpace: "pre-line"
  }
});

type Props = WithStyles<typeof styles>;

const ImportWarningDialog: React.SFC<Props> = ({ classes }) => (
  <AbstractImportWarningDialog>
    {({ isOpen, onConfirm, onCancel }) => (
      <Dialog open={isOpen}>
        <DialogTitle>
          <Trans i18nKey="data.conditions.modified_titlecase">
            Data Modified
          </Trans>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.description}>
            <Trans i18nKey="data.prompts.modified-description" />
          </Typography>
          <Typography>
            <Trans i18nKey="dialog.queries.continue" />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>
            <Trans i18nKey="dialog.verbs.cancel_titlecase">Cancel</Trans>
          </Button>
          <Button onClick={onConfirm}>
            <Trans i18nKey="data.verbs.import_titlecase">Import</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </AbstractImportWarningDialog>
);

export default withStyles(styles)(ImportWarningDialog);
