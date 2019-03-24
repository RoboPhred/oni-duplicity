import * as React from "react";
import { AITraitsBehavior } from "oni-save-parser";

import { WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
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
      textAlign: "center",
      whiteSpace: "nowrap"
    }
  });

type Props = DuplicantTraitsProps & WithStyles<typeof styles> & WithTranslation;

const DuplicantTraits: React.SFC<Props> = ({ classes, gameObjectId, t }) => (
  <TraitsEditor gameObjectId={gameObjectId}>
    {({ templateData }) => (
      <div className={classes.root}>
        {(templateData || { TraitIds: [] }).TraitIds.map(trait => (
          <Typography
            key={trait}
            className={classes.trait}
            variant="body2"
            component="div"
            title={t(`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.DESC`, {
              defaultValue: ""
            })}
          >
            {t(`oni:DUPLICANTS.TRAITS.${trait.toUpperCase()}.NAME`, {
              defaultValue: trait
            })}
          </Typography>
        ))}
      </div>
    )}
  </TraitsEditor>
);

export default withStyles(styles)(withTranslation()(DuplicantTraits));
