import * as React from "react";
import {
  AccessorizerBehavior,
  AIAttributeLevelsBehavior,
  AITraitsBehavior,
  MinionResumeBehavior
} from "oni-save-parser";

import { Trans } from "react-i18next";

import MenuItem from "@material-ui/core/MenuItem";

import AbstractCopyButton, {
  CopyTarget
} from "@/services/oni-save/components/AbstractCopyButton";

export interface CopyMenuItemProps {
  gameObjectId: number;
  onClose(): void;
}
const copyTargets: CopyTarget[] = [
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

type Props = CopyMenuItemProps;
const CopyMenuItem: React.SFC<Props> = ({ gameObjectId, onClose }) => {
  return (
    <AbstractCopyButton
      gameObjectId={gameObjectId}
      targets={copyTargets}
      onComplete={onClose}
    >
      {({ onClick }) => (
        <MenuItem onClick={onClick}>
          <Trans i18nKey="data.verbs.copy_titlecase">Copy</Trans>
        </MenuItem>
      )}
    </AbstractCopyButton>
  );
};

export default CopyMenuItem;
