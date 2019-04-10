import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

import AbstractEditStatus from "@/services/oni-save/components/AbstractEditStatus";

export interface SaveExampleChipProps {
  className?: string;
}

type Props = SaveExampleChipProps & WithTranslation;
const SaveExampleChip: React.FC<Props> = ({ className, t }) => (
  <AbstractEditStatus>
    {({ isMock }) => (
      <div className={className}>
        {isMock && (
          <Chip
            color="secondary"
            label={t("save-file.conditions.example", {
              defaultValue: "Example"
            })}
            title={t("save-file.conditions.example_description")}
          />
        )}
      </div>
    )}
  </AbstractEditStatus>
);

export default withTranslation()(SaveExampleChip);
