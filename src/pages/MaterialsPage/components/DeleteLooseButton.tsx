import * as React from "react";
import { SimHashName } from "oni-save-parser";

import { withTranslation, WithTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDeleteMaterials } from "@/services/oni-save/hooks/useMaterials";

import ConfirmationDialog from "@/components/ConfirmationDialog";

export interface DeleteLooseButtonProps {
  className?: string;
  materialType?: SimHashName;
}

type Props = DeleteLooseButtonProps & WithTranslation;
const DeleteLooseButton: React.FC<Props> = ({ className, materialType, t }) => {
  const onDeleteMaterial = useDeleteMaterials();
  const onDeleteConfirm = React.useCallback(() => {
    onDeleteMaterial(materialType);
  }, [onDeleteMaterial, materialType]);

  return (
    <ConfirmationDialog
      title={t("material_loose.verbs.delete_name", {
        name: materialType || t("material.all_titlecase")
      })}
      message={t("material_loose.prompts.delete")}
      onConfirm={onDeleteConfirm}
    >
      {({ onClick }) => (
        <IconButton className={className} onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      )}
    </ConfirmationDialog>
  );
};
export default withTranslation()(DeleteLooseButton);
