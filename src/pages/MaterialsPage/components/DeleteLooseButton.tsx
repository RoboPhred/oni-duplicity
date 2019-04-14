import * as React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import ConfirmationDialog from "@/components/ConfirmationDialog";

export interface DeleteLooseButtonProps {
  materialName: string;
  onDelete(): void;
}

type Props = DeleteLooseButtonProps & WithTranslation;
const DeleteLooseButton: React.FC<Props> = ({ materialName, onDelete, t }) => (
  <ConfirmationDialog
    title={t("material_loose.verbs.delete_name", { name: materialName })}
    message={t("material_loose.prompts.delete")}
    onConfirm={onDelete}
  >
    {({ onClick }) => (
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    )}
  </ConfirmationDialog>
);
export default withTranslation()(DeleteLooseButton);
