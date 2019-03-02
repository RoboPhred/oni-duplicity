import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";

import AbstractSaveButton from "@/services/oni-save/components/AbstractSaveButton/AbstractSaveButton";

const SaveFab: React.SFC = () => (
  <AbstractSaveButton>
    {({ onClick }) => (
      <IconButton onClick={onClick}>
        <SaveIcon />
      </IconButton>
    )}
  </AbstractSaveButton>
);

export default SaveFab;
