import * as React from "react";

import { Trans } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export interface ConfirmationDialogProps {
  title: string;
  message: string;
  onConfirm(): void;
  onCancel?(): void;
  children(props: ConfirmationDialogRenderProps): React.ReactChild;
}
export interface ConfirmationDialogRenderProps {
  onClick(): void;
}

type Props = ConfirmationDialogProps;
const ConfirmationDialog: React.FC<Props> = ({
  title,
  message,
  onConfirm,
  onCancel,
  children
}) => {
  const [isOpen, setOpen] = React.useState(false);

  const onCancelClick = React.useCallback(() => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const onConfirmClick = React.useCallback(() => {
    setOpen(false);
    onConfirm();
  }, [onConfirm]);

  return (
    <>
      {children({ onClick: () => setOpen(true) })}
      <Dialog open={isOpen}>
        {isOpen && (
          <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onCancelClick}>
                <Trans i18nKey="dialog.verbs.cancel_titlecase" />
              </Button>
              <Button onClick={onConfirmClick}>
                <Trans i18nKey="dialog.verbs.confirm_titlecase" />
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};
export default ConfirmationDialog;
