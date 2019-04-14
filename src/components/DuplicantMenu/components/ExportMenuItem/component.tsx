import * as React from "react";

import { withTranslation, WithTranslation } from "react-i18next";

import MenuItem from "@material-ui/core/MenuItem";

import { MinionExportableBehaviors } from "@/exportable-behaviors";

import BehaviorChooserDialog from "@/components/BehaviorChooserDialog";

export interface ExportMenuItemProps {
  onExportBehaviors(behaviors: string[]): void;
  onClose(): void;
}

type Props = ExportMenuItemProps & WithTranslation;
const ExportMenuItem: React.FC<Props> = ({ onExportBehaviors, onClose, t }) => {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const onClick = React.useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);
  const onDialogApply = React.useCallback(
    (behaviors: string[]) => {
      onExportBehaviors(behaviors);
      onClose();
    },
    [onExportBehaviors, onClose]
  );
  const exportText = t("data.verbs.export_titlecase");
  return (
    <MenuItem onClick={onClick}>
      {exportText}
      <BehaviorChooserDialog
        open={isDialogOpen}
        title={exportText}
        applyText={exportText}
        choices={MinionExportableBehaviors}
        onApply={onDialogApply}
        onCancel={onClose}
      />
    </MenuItem>
  );
};

export default withTranslation()(ExportMenuItem);
