import * as React from "react";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import AbstractImportWarningDialog from "@/services/oni-save/components/AbstractImportWarningDialog";

const ImportWarningDialog: React.SFC = () => (
  <AbstractImportWarningDialog>
    {({ isOpen, onConfirm, onCancel }) => (
      <Dialog open={isOpen}>
        <DialogTitle>Data Modified</DialogTitle>
        <DialogContent>
          <Typography>
            The data in this file has been modified since it was exported.
            <br />
            Imported data is not validated, and importing invalid data can
            corrupt your save
          </Typography>
          <Typography>Are you sure you want to continue?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    )}
  </AbstractImportWarningDialog>
);

export default ImportWarningDialog;
