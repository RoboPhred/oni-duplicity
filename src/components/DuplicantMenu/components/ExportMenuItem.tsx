import * as React from "react";
import {
  AccessorizerBehavior,
  AIAttributeLevelsBehavior,
  AITraitsBehavior,
  MinionResumeBehavior
} from "oni-save-parser";

import { Trans } from "react-i18next";

import MenuItem from "@material-ui/core/MenuItem";

import AbstractExportButton, {
  ExportTarget
} from "@/services/oni-save/components/AbstractExportButton";

export interface ExportMenuItemProps {
  gameObjectId: number;
  onClose(): void;
}
const exportTargets: ExportTarget[] = [
  {
    name: "Appearance",
    behavior: AccessorizerBehavior
  },
  {
    name: "Attributes",
    behavior: AIAttributeLevelsBehavior
  },
  {
    name: "Traits",
    behavior: AITraitsBehavior
  },
  {
    name: "Job Skills",
    behavior: MinionResumeBehavior
  }
];

type Props = ExportMenuItemProps;
const ExportMenuItem: React.SFC<Props> = ({ gameObjectId, onClose }) => {
  return (
    <AbstractExportButton
      gameObjectId={gameObjectId}
      targets={exportTargets}
      onComplete={onClose}
    >
      {({ onClick }) => (
        <MenuItem
          onClick={() => {
            onClick();
          }}
        >
          <Trans i18nKey="data.verbs.export_titlecase">Export</Trans>
        </MenuItem>
      )}
    </AbstractExportButton>
  );
};

export default ExportMenuItem;
