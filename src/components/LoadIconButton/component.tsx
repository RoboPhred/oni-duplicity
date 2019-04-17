import * as React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";

import AbstractLoadButton from "@/components/AbstractLoadButton";

type Props = WithTranslation;
const LoadIconButton: React.FC<Props> = ({ t }) => (
  <AbstractLoadButton>
    {({ disabled, onClick }) => (
      <IconButton
        title={t("save-file.verbs.load_titlecase")}
        disabled={disabled}
        onClick={onClick}
      >
        <FolderIcon />
      </IconButton>
    )}
  </AbstractLoadButton>
);

export default withTranslation()(LoadIconButton);
