import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

export interface ModifiedChipProps {
  className?: string;
  isModified: boolean;
}

type Props = ModifiedChipProps & WithTranslation;
const ModifiedChip: React.FC<Props> = ({ className, isModified, t }) => (
  <div className={className}>
    {isModified && (
      <Chip
        color="secondary"
        label={t("save-file.conditions.modified", {
          defaultValue: "Modified"
        })}
        title={t("save-file.conditions.modified_description")}
      />
    )}
  </div>
);

export default withTranslation()(ModifiedChip);
