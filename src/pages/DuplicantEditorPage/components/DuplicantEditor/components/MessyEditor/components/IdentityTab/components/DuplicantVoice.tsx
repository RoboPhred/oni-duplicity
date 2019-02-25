import * as React from "react";
import {
  MinionIdentityBehavior,
  MINION_IDENTITY_VOICES
} from "oni-save-parser";

import { WithTranslation, withTranslation, Trans } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const IdentityEditor = AbstractBehaviorEditor.ofType(MinionIdentityBehavior);

export interface DuplicantGenderProps {
  gameObjectId: number;
}

type Props = DuplicantGenderProps & WithTranslation;
const DuplicantVoice: React.SFC<Props> = ({ gameObjectId, t }) => (
  <IdentityEditor gameObjectId={gameObjectId}>
    {({ templateData, onTemplateDataModify }) => (
      <FormControl>
        <InputLabel htmlFor="duplicant-voice">
          <Trans i18nKey="duplicant-editor.duplicant-voice">Voice</Trans>
        </InputLabel>
        <Select
          value={templateData.voiceIdx}
          inputProps={{ id: "duplicant-voice" }}
          onChange={e =>
            onTemplateDataModify({
              voiceIdx: Number(e.target.value)
            })
          }
        >
          {MINION_IDENTITY_VOICES.map(voice => (
            <MenuItem key={voice} value={voice}>
              {voice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  </IdentityEditor>
);

export default withTranslation()(DuplicantVoice);
