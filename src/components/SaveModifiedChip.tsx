import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

import AbstractEditStatus from "@/services/oni-save/components/AbstractEditStatus";

type Props = WithTranslation;
const SaveModifiedChip: React.SFC<Props> = ({ t }) => (
  <AbstractEditStatus>
    {({ hasChanges }) => (
      <div>
        {hasChanges && (
          <Chip
            color="secondary"
            label={t("save-file.modified", { defaultValue: "Modified" })}
          />
        )}
      </div>
    )}
  </AbstractEditStatus>
);

export default withTranslation()(SaveModifiedChip);
