import * as React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import MenuItem from "@material-ui/core/MenuItem";

import { MinionExportableBehaviors } from "@/exportable-behaviors";

import BehaviorChooserDialog from "@/components/BehaviorChooserDialog";

export interface CopyMenuItemProps {
  onCopyBehaviors(behaviors: string[]): void;
  onClose(): void;
}

type Props = CopyMenuItemProps & WithTranslation;
const CopyMenuItem: React.FC<Props> = ({ onCopyBehaviors, onClose, t }) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onClick = React.useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onDialogApply = React.useCallback(
    (behaviors: string[]) => {
      onCopyBehaviors(behaviors);
      onClose();
    },
    [onCopyBehaviors, onClose]
  );

  const copyText = t("data.verbs.copy_titlecase");

  return (
    <MenuItem onClick={onClick}>
      {copyText}
      <BehaviorChooserDialog
        open={isDialogOpen}
        title={copyText}
        applyText={copyText}
        choices={MinionExportableBehaviors}
        onApply={onDialogApply}
        onCancel={onClose}
      />
    </MenuItem>
  );
};

export default withTranslation()(CopyMenuItem);
