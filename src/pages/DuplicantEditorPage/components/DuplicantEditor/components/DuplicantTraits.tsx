import * as React from "react";
import { AITraitsBehavior } from "oni-save-parser";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const TraitsEditor = AbstractBehaviorEditor.ofType(AITraitsBehavior);

export interface DuplicantTraitsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    trait: {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2
    }
  });

type Props = DuplicantTraitsProps & StyleProps<typeof styles>;
const DuplicantTraits: React.SFC<Props> = ({ classes, gameObjectId }) => (
  <TraitsEditor gameObjectId={gameObjectId}>
    {({ templateData }) => (
      <div>
        {templateData.TraitIds.map(trait => (
          <Chip className={classes.trait} label={trait} />
        ))}
      </div>
    )}
  </TraitsEditor>
);

export default withStyles(styles)(DuplicantTraits);
