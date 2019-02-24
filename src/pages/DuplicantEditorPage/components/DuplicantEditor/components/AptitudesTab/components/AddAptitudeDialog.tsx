import * as React from "react";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export interface AddAptitudeDialogProps {
  open: boolean;
  availableAptitudes: string[];
  onClose(): void;
  onAddAptitude(aptitude: string): void;
}

type Props = AddAptitudeDialogProps & WithTranslation;
const AddAptitudeDialog: React.SFC<Props> = ({
  open,
  availableAptitudes,
  onClose,
  onAddAptitude,
  t
}) => {
  const [selectedAptitude, setSelectedAptitude] = React.useState("");
  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Trans i18nKey="dialog-editor.add-aptitude">Add Aptitude</Trans>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="duplicant-aptitude">
              <Trans i18nKey="duplicant-editor.aptitude">Aptitude</Trans>
            </InputLabel>
            <Select
              value={selectedAptitude}
              onChange={e => setSelectedAptitude(e.target.value)}
              inputProps={{ id: "duplicant-aptitude" }}
            >
              {availableAptitudes.map(aptitude => (
                <MenuItem key={aptitude} value={aptitude}>
                  <Trans i18nKey={`oni:todo-trans.aptitudes.${aptitude}`}>
                    {aptitude}
                  </Trans>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          <Trans i18nKey="dialog-editor.cancel">Cancel</Trans>
        </Button>
        <Button
          disabled={selectedAptitude === ""}
          onClick={() => {
            setSelectedAptitude("");
            onAddAptitude(selectedAptitude);
          }}
          color="primary"
        >
          <Trans i18nKey="dialog-editor.add-aptitude">Add Aptitude</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(AddAptitudeDialog);
