import * as React from "react";
import { MinionResumeBehavior } from "oni-save-parser";

import { Trans } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";
const ResumeEditor = AbstractBehaviorEditor.ofType(MinionResumeBehavior);

export interface ExperienceProps {
  gameObjectId: number;
}

const Experience: React.FC<ExperienceProps> = ({ gameObjectId }) => (
  <ResumeEditor gameObjectId={gameObjectId}>
    {({ templateData: { totalExperienceGained }, onTemplateDataModify }) => (
      <div>
        <Typography>
          <Trans i18nKey="duplicant_skills.experience_titlecase">
            Experience
          </Trans>
        </Typography>
        <TextField
          type="number"
          value={totalExperienceGained || 0}
          onChange={e => {
            onTemplateDataModify({
              totalExperienceGained: Number(e.target.value)
            });
          }}
        />
      </div>
    )}
  </ResumeEditor>
);

export default Experience;
