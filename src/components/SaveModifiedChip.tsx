import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

import AbstractEditStatus from "@/services/oni-save/components/AbstractEditStatus";

export interface SaveModifiedChipProps {
  className?: string;
}

type Props = SaveModifiedChipProps & WithTranslation;
const SaveModifiedChip: React.FC<Props> = ({ className, t }) => (
  <AbstractEditStatus>
    {({ hasChanges }) => (
      <div className={className}>
        {hasChanges && (
          <Chip
            color="secondary"
            label={t("save-file.conditions.modified", {
              defaultValue: "Modified"
            })}
            title={t("save-file.conditions.modified_description")}
          />
        )}
      </div>
    )}
  </AbstractEditStatus>
);

export default withTranslation()(SaveModifiedChip);
