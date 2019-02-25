import * as React from "react";
import { MinionIdentityBehavior } from "oni-save-parser";
import { Trans } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const IdentityEditor = AbstractBehaviorEditor.ofType(MinionIdentityBehavior);

export interface DuplicantGenderProps {
  gameObjectId: number;
}

type Props = DuplicantGenderProps;
const DuplicantGender: React.SFC<Props> = ({ gameObjectId }) => (
  <IdentityEditor gameObjectId={gameObjectId}>
    {({ templateData, onTemplateDataModify }) => (
      <FormControl>
        <InputLabel htmlFor="duplicant-gender">
          <Trans i18nKey="duplicant-editor.duplicant-gender">Gender</Trans>
        </InputLabel>
        <Select
          value={templateData.gender}
          inputProps={{ id: "duplicant-gender" }}
          onChange={e =>
            onTemplateDataModify({
              gender: e.target.value as any,
              genderStringKey: e.target.value as any
            })
          }
        >
          <MenuItem value="MALE">
            <Trans i18nKey="oni:todo-trans.gender.male">M</Trans>
          </MenuItem>
          <MenuItem value="FEMALE">
            <Trans i18nKey="oni:todo-trans.gender.female">F</Trans>
          </MenuItem>
          <MenuItem value="NB">
            <Trans i18nKey="oni:todo-trans.gender.nb">NB</Trans>
          </MenuItem>
        </Select>
      </FormControl>
    )}
  </IdentityEditor>
);

export default DuplicantGender;
