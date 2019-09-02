import * as React from "react";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import FormGroup from "@material-ui/core/FormGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export interface AddEffectDialogProps {
  open: boolean;
  availableEffects: string[];
  onClose(): void;
  onAddEffect(effect: string, time: number): void;
}

const styles = (theme: Theme) =>
  createStyles({
    cycleTime: {
      marginTop: theme.spacing()
    }
  });

type Props = AddEffectDialogProps & WithTranslation & WithStyles<typeof styles>;

const AddEffectDialog: React.FC<Props> = ({
  classes,
  open,
  availableEffects,
  onClose,
  onAddEffect,
  t
}) => {
  const [selectedEffect, setSelectedEffect] = React.useState("");
  const [timeRemaining, setTimeRemaining] = React.useState(5);
  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Trans i18nKey="duplicant_effects.verbs.add_titlecase">
          Add Effect
        </Trans>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor="duplicant-effect">
              <Trans i18nKey="duplicant_effect.noun_titlecase">Effect</Trans>
            </InputLabel>
            <Select
              value={selectedEffect}
              onChange={e => setSelectedEffect(e.target.value as string)}
              inputProps={{ id: "duplicant-effect" }}
            >
              {availableEffects.map(effect => (
                <MenuItem key={effect} value={effect}>
                  <Trans i18nKey={`oni:todo-trans.effects.${effect}`}>
                    {effect}
                  </Trans>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.cycleTime}
            label={t("time_cycles.noun_titlecase")}
            type="number"
            value={timeRemaining}
            onChange={e => setTimeRemaining(Number(e.target.value))}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>
          <Trans i18nKey="dialog.verbs.cancel_titlecase">Cancel</Trans>
        </Button>
        <Button
          disabled={selectedEffect === "" || timeRemaining <= 0}
          onClick={() => {
            setSelectedEffect("");
            onAddEffect(selectedEffect, timeRemaining * 200);
          }}
        >
          <Trans i18nKey="duplicant_effects.verbs.add_titlecase">
            Add Effect
          </Trans>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(withTranslation()(AddEffectDialog));
