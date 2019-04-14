import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";

export interface PasteMenuItemProps {
  gameObjectId: number;
  disabled: boolean;
  onPasteBehaviors(): void;
  onClose(): void;
}

type Props = PasteMenuItemProps;

const PasteMenuItem: React.FC<Props> = ({
  disabled,
  onPasteBehaviors,
  onClose
}) => {
  const onClick = React.useCallback(() => {
    onClose();
    onPasteBehaviors();
  }, [onClose, onPasteBehaviors]);
  return (
    <MenuItem disabled={disabled} onClick={onClick}>
      Paste
    </MenuItem>
  );
};

export default PasteMenuItem;
