import * as React from "react";

import MenuItem from "@material-ui/core/MenuItem";

export interface CloneMenuItemProps {
  onCloneDuplicant(): void;
  onClick(): void;
}

type Props = CloneMenuItemProps;
const CloneMenuItem: React.FC<Props> = ({ onCloneDuplicant, onClick }) => {
  const onMenuItemClick = React.useCallback(() => {
    onCloneDuplicant();
    onClick();
  }, []);
  return <MenuItem onClick={onMenuItemClick}>Clone</MenuItem>;
};

export default CloneMenuItem;
