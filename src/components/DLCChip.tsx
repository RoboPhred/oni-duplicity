import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

import { dlcIdSelector } from "@/services/oni-save/selectors/dlc";

export interface DLCChipProps {
  className?: string;
}

const DLCChip: React.FC<DLCChipProps> = ({ className }) => {
  const { t } = useTranslation();
  const dlcId = useSelector(dlcIdSelector);
  return (
    <div className={className}>
      {dlcId && (
        <Chip
          color="secondary"
          label={t(`oni:dlc_id.${dlcId}`, {
            defaultValue: "Unknown DLC",
          })}
        />
      )}
    </div>
  );
};
export default DLCChip;
