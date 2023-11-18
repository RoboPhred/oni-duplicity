import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

import { isSaveModifiedSelector } from "@/services/oni-save/selectors/save-game";

export interface ModifiedChipProps {
  className?: string;
}

const ModifiedChip: React.FC<ModifiedChipProps> = ({ className }) => {
  const { t } = useTranslation();
  const isModified = useSelector(isSaveModifiedSelector);
  return (
    <div className={className}>
      {isModified && (
        <Chip
          color="secondary"
          label={t("save-file.conditions.modified", {
            defaultValue: "Modified",
          })}
          title={t("save-file.conditions.modified_description")}
        />
      )}
    </div>
  );
};
export default ModifiedChip;
