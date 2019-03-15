import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

import AbstractSaveButton from "@/services/oni-save/components/AbstractSaveButton/AbstractSaveButton";

const SaveFab: React.SFC = () => (
  <AbstractSaveButton>
    {({ disabled, onClick }) => (
      <IconButton disabled={disabled} onClick={onClick}>
        <SaveIcon />
      </IconButton>
    )}
  </AbstractSaveButton>
);

export default SaveFab;
