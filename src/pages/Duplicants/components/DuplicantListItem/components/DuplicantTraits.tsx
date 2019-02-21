import * as React from "react";
import { AITraitsBehavior } from "oni-save-parser";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const TraitsEditor = AbstractBehaviorEditor.ofType(AITraitsBehavior);

export interface DuplicantTraitsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    trait: {
      textAlign: "center"
    }
  });

type Props = DuplicantTraitsProps & StyleProps<typeof styles>;
const DuplicantTraits: React.SFC<Props> = ({ classes, gameObjectId }) => (
  <TraitsEditor gameObjectId={gameObjectId}>
    {({ templateData }) => (
      <div className={classes.root}>
        {templateData.TraitIds.map(trait => (
          <Typography key={trait} className={classes.trait} variant="body2">
            {trait}
          </Typography>
        ))}
      </div>
    )}
  </TraitsEditor>
);

export default withStyles(styles)(DuplicantTraits);
