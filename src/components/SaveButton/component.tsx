import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

export interface SaveButtonProps {
  disabled: boolean;
  onSave(): void;
}

type Props = SaveButtonProps;
const SaveButton: React.SFC<Props> = ({ disabled, onSave }) => (
  <IconButton disabled={disabled} onClick={onSave}>
    <SaveIcon />
  </IconButton>
);

export default SaveButton;
