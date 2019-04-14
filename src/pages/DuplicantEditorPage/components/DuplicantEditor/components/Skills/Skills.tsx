import * as React from "react";
import { MinionResumeBehavior } from "oni-save-parser";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";
const ResumeEditor = AbstractBehaviorEditor.ofType(MinionResumeBehavior);

export interface SkillsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit
    }
  });

type Props = SkillsProps & WithStyles<typeof styles>;

const Skills: React.FC<Props> = ({ gameObjectId, classes }) => (
  <ResumeEditor gameObjectId={gameObjectId}>
    {({ templateData: { totalExperienceGained }, onTemplateDataModify }) => {
      return (
        <div className={classes.root}>
          <div>
            <Typography>Skill Points</Typography>
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
        </div>
      );
    }}
  </ResumeEditor>
);

export default withStyles(styles)(Skills);
