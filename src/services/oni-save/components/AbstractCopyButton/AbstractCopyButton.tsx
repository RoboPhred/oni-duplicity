import * as React from "react";
import { connect } from "react-redux";

import { Trans } from "react-i18next";

import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import { AbstractCopyButtonProps } from "./props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractCopyButtonProps & DispatchProps;
const AbstractCopyButton: React.SFC<Props> = ({
  targets,
  onCopy,
  children,
  onComplete
}) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedTargets, setSelectedTargets] = React.useState<string[]>([]);

  function addTarget(value: string) {
    if (selectedTargets.indexOf(value) !== -1) {
      return;
    }
    setSelectedTargets([...selectedTargets, value]);
  }

  function removeTarget(value: string) {
    setSelectedTargets(selectedTargets.filter(x => x !== value));
  }

  function close() {
    if (onComplete) {
      onComplete();
    }
    setDialogOpen(false);
  }

  return (
    <React.Fragment>
      {children({ onClick: () => setDialogOpen(true) })}
      <Dialog open={isDialogOpen} airia-labeledby="set-copy-targets-title">
        {isDialogOpen && (
          <React.Fragment>
            <DialogTitle id="set-copy-targets-title">
              <Trans i18nKey="data.verbs.copy_titlecase">Copy</Trans>
            </DialogTitle>
            <DialogContent>
              {targets.map(({ name, behavior }) => (
                <FormControlLabel
                  key={behavior}
                  control={
                    <Checkbox
                      checked={selectedTargets.indexOf(behavior) !== -1}
                      onChange={e =>
                        e.target.checked
                          ? addTarget(behavior)
                          : removeTarget(behavior)
                      }
                      color="primary"
                    />
                  }
                  label={name}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={close}>
                <Trans i18nKey="dialog.verbs.cancel_titlecase">Cancel</Trans>
              </Button>
              <Button
                onClick={() => {
                  onCopy(selectedTargets);
                  close();
                }}
                autoFocus
              >
                <Trans i18nKey="data.verbs.copy_titlecase">Copy</Trans>
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(AbstractCopyButton);
