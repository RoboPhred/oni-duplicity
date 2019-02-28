import * as React from "react";
import { AI_TRAIT_IDS, AITraitsBehavior } from "oni-save-parser";
import { difference } from "lodash-es";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";
import AddTraitDialog from "./components/AddTraitDialog";

const TraitsEditor = AbstractBehaviorEditor.ofType(AITraitsBehavior);

export interface TraitsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    chip: {
      margin: theme.spacing.unit / 2
    }
  });

type Props = TraitsProps & StyleProps<typeof styles> & WithTranslation;
const Traits: React.SFC<Props> = ({ classes, gameObjectId, t }) => {
  const [isAddingTrait, setIsAddingTrait] = React.useState(false);
  return (
    <TraitsEditor gameObjectId={gameObjectId}>
      {({ templateData, onTemplateDataModify }) => {
        const { TraitIds } = templateData;
        const availableTraits = difference(AI_TRAIT_IDS, TraitIds);
        return (
          <div className={classes.root}>
            {TraitIds.map((trait, i) => (
              <Chip
                key={trait}
                className={classes.chip}
                label={t(`oni:todo-trans.traits.${trait}`, {
                  defaultValue: trait
                })}
                onDelete={() => {
                  const newTraitIds = [...TraitIds];
                  newTraitIds.splice(i, 1);
                  onTemplateDataModify({
                    TraitIds: newTraitIds
                  });
                }}
              />
            ))}
            <Chip
              className={classes.chip}
              color="primary"
              label={t(`duplicant-editor.add-trait`)}
              clickable
              onClick={() => setIsAddingTrait(true)}
            />
            <AddTraitDialog
              open={isAddingTrait}
              availableTraits={availableTraits}
              onClose={() => setIsAddingTrait(false)}
              onAddTrait={trait => {
                setIsAddingTrait(false);
                onTemplateDataModify({
                  TraitIds: [...TraitIds, trait]
                });
              }}
            />
          </div>
        );
      }}
    </TraitsEditor>
  );
};

export default withStyles(styles)(withTranslation()(Traits));
