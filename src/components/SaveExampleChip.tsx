import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

import AbstractEditStatus from "@/services/oni-save/components/AbstractEditStatus";

export interface SaveExampleChipProps {
  className?: string;
}

type Props = SaveExampleChipProps & WithTranslation;
const SaveExampleChip: React.FC<Props> = ({ t, className }) => (
  <AbstractEditStatus>
    {({ isMock }) => (
      <div className={className}>
        {isMock && (
          <Chip
            color="secondary"
            label="Example"
            title="This is example content and cannot be saved."
          />
        )}
      </div>
    )}
  </AbstractEditStatus>
);

export default withTranslation()(SaveExampleChip);
