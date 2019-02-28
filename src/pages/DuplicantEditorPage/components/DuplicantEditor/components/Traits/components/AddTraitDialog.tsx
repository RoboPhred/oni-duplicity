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

export interface AddTraitDialogProps {
  open: boolean;
  availableTraits: string[];
  onClose(): void;
  onAddTrait(trait: string): void;
}

type Props = AddTraitDialogProps & WithTranslation;
const AddTraitDialog: React.SFC<Props> = ({
  open,
  availableTraits,
  onClose,
  onAddTrait,
  t
}) => {
  const [selectedTrait, setSelectedTrait] = React.useState("");
  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Trans i18nKey="dialog-editor.add-trait">Add Trait</Trans>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="duplicant-trait">
              <Trans i18nKey="duplicant-editor.trait">Trait</Trans>
            </InputLabel>
            <Select
              value={selectedTrait}
              onChange={e => setSelectedTrait(e.target.value)}
              inputProps={{ id: "duplicant-trait" }}
            >
              {availableTraits.map(trait => (
                <MenuItem key={trait} value={trait}>
                  <Trans
                    i18nKey={`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.NAME`}
                  >
                    {trait}
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
          disabled={selectedTrait === ""}
          onClick={() => {
            setSelectedTrait("");
            onAddTrait(selectedTrait);
          }}
          color="primary"
        >
          <Trans i18nKey="dialog-editor.add-trait">Add Trait</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withTranslation()(AddTraitDialog);
