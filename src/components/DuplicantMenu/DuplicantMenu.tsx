import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import AbstractCopyButton from "@/services/oni-save/components/AbstractCopyButton";
import {
  AccessorizerBehavior,
  AIAttributeLevelsBehavior
} from "oni-save-parser";
import AbstractPasteButton from "@/services/oni-save/components/AbstractPasteButton";

export interface DuplicantMenuProps {
  gameObjectId: number;
}

type Props = DuplicantMenuProps;
const DuplicantMenu: React.SFC<Props> = ({ gameObjectId }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  function onClose() {
    setAnchorEl(null);
  }
  return (
    <div>
      <IconButton
        aria-owns={anchorEl ? "duplicant-menu" : undefined}
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="duplicant-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <AbstractCopyButton gameObjectId={gameObjectId}>
          {({ onCopy }) => (
            <>
              <MenuItem
                onClick={() => {
                  onClose();
                  onCopy([AccessorizerBehavior]);
                }}
              >
                Copy Appearance
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onClose();
                  onCopy([AIAttributeLevelsBehavior]);
                }}
              >
                Copy Attributes
              </MenuItem>
            </>
          )}
        </AbstractCopyButton>
        <AbstractPasteButton gameObjectId={gameObjectId}>
          {({ disabled, availableBehaviors, onPaste }) => (
            <MenuItem
              disabled={disabled}
              onClick={() => {
                onClose();
                onPaste(availableBehaviors);
              }}
            >
              Paste
            </MenuItem>
          )}
        </AbstractPasteButton>
      </Menu>
    </div>
  );
};

export default DuplicantMenu;
