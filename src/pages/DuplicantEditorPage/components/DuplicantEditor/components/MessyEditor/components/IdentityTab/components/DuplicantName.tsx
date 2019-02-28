import * as React from "react";
import { MinionIdentityBehavior } from "oni-save-parser";
import { WithTranslation, withTranslation } from "react-i18next";

import TextField from "@material-ui/core/TextField";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const IdentityEditor = AbstractBehaviorEditor.ofType(MinionIdentityBehavior);

export interface DuplicantNameProps {
  gameObjectId: number;
}

type Props = DuplicantNameProps & WithTranslation;
const DuplicantName: React.SFC<Props> = ({ gameObjectId, t }) => (
  <IdentityEditor gameObjectId={gameObjectId}>
    {({ templateData, onTemplateDataModify }) => (
      <TextField
        id="duplicant-name"
        label={t("duplicant-editor.duplicant-name")}
        value={templateData.name}
        onChange={e => onTemplateDataModify({ name: e.target.value })}
      />
    )}
  </IdentityEditor>
);

export default withTranslation()(DuplicantName);
