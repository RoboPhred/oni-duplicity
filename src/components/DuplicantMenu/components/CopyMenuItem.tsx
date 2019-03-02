import * as React from "react";
import {
  AccessorizerBehavior,
  AIAttributeLevelsBehavior,
  AITraitsBehavior,
  MinionResumeBehavior
} from "oni-save-parser";

import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import AbstractCopyButton from "@/services/oni-save/components/AbstractCopyButton";

export interface CopyMenuItemProps {
  gameObjectId: number;
  onClose(): void;
}

interface CopyTarget {
  name: string;
  behavior: string;
}

const copyTargets: CopyTarget[] = [
  {
    name: "Appearance",
    behavior: AccessorizerBehavior
  },
  {
    name: "Attributes",
    behavior: AIAttributeLevelsBehavior
  },
  {
    name: "Traits",
    behavior: AITraitsBehavior
  },
  {
    name: "Job Skills",
    behavior: MinionResumeBehavior
  }
];

type Props = CopyMenuItemProps;
const CopyMenuItem: React.SFC<Props> = ({ gameObjectId, onClose }) => {
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

  return (
    <AbstractCopyButton gameObjectId={gameObjectId}>
      {({ onCopy }) => (
        <>
          <MenuItem
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Copy
          </MenuItem>
          <Dialog open={isDialogOpen} airia-labeledby="set-copy-targets-title">
            <DialogTitle id="set-copy-targets-title">
              Copy Duplicant Settings
            </DialogTitle>
            <DialogContent>
              {copyTargets.map(({ name, behavior }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTargets.indexOf(behavior) !== -1}
                      onChange={e =>
                        e.target.checked
                          ? addTarget(behavior)
                          : removeTarget(behavior)
                      }
                      value="checkedB"
                      color="primary"
                    />
                  }
                  label={name}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => onClose()} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  onCopy(selectedTargets);
                }}
                color="primary"
                autoFocus
              >
                Copy
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </AbstractCopyButton>
  );
};

export default CopyMenuItem;
