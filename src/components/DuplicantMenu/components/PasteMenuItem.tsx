import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";

import AbstractPasteButton from "@/services/oni-save/components/AbstractPasteButton";

export interface PasteMenuItemProps {
  gameObjectId: number;
  onClose(): void;
}

type Props = PasteMenuItemProps;

const PasteMenuItem: React.SFC<Props> = ({ gameObjectId, onClose }) => (
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
);

export default PasteMenuItem;
