import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Chip from "@material-ui/core/Chip";

export interface ExampleChipChipProps {
  isExample: boolean;
  className?: string;
}

type Props = ExampleChipChipProps & WithTranslation;
const ExampleChip: React.FC<Props> = ({ className, isExample, t }) => (
  <div className={className}>
    {isExample && (
      <Chip
        color="secondary"
        label={t("save-file.conditions.example", {
          defaultValue: "Example"
        })}
        title={t("save-file.conditions.example_description")}
      />
    )}
  </div>
);

export default withTranslation()(ExampleChip);
