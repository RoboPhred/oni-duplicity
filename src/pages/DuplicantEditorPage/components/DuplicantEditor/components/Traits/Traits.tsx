import * as React from "react";
import { AI_TRAIT_IDS, AITraitsBehavior } from "oni-save-parser";
import { difference } from "lodash";

import { WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

import AddTraitButton from "./components/AddTraitButton";

const CANDIDATE_TRAITS = AI_TRAIT_IDS.filter(x => x !== "None");

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
      margin: theme.spacing(0.5)
    }
  });

type Props = TraitsProps & WithStyles<typeof styles> & WithTranslation;

const Traits: React.FC<Props> = ({ classes, gameObjectId, t }) => {
  const { templateData, onTemplateDataModify } = useBehavior(gameObjectId, AITraitsBehavior);
  const { TraitIds } = templateData;
  const availableTraits = difference(CANDIDATE_TRAITS, TraitIds);
  return (
    <div className={classes.root}>
      {TraitIds.map((trait, i) => (
        <Chip
          key={trait}
          className={classes.chip}
          label={t(`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.NAME`, {
            defaultValue: trait
          })}
          title={t(`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.DESC`, {
            defaultValue: ""
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
      <AddTraitButton
        className={classes.chip}
        availableTraits={availableTraits}
        onAddTrait={trait =>
          onTemplateDataModify({ TraitIds: [...TraitIds, trait] })
        }
      />
    </div>
  );
};

export default withStyles(styles)(withTranslation()(Traits));
