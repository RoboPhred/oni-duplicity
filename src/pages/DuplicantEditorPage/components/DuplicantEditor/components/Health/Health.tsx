import * as React from "react";
import { find, findIndex, merge } from "lodash-es";
import { MinionModifiersBehavior } from "oni-save-parser";

import { Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";
import Value from "./components/Value";

const ModifierBehaviorEditor = AbstractBehaviorEditor.ofType(
  MinionModifiersBehavior
);

export interface HealthProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    header: {
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit
    },
    divider: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    group: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: theme.spacing.unit
    },
    value: {
      width: 300,
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2
    }
  });

type Props = HealthProps & StyleProps<typeof styles>;
const Health: React.SFC<Props> = ({ classes, gameObjectId }) => (
  <div className={classes.root}>
    <Typography className={classes.header} variant="h6">
      <Trans>Fitness</Trans>
    </Typography>
    <Divider className={classes.divider} />
    <div className={classes.group}>
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="HitPoints"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Stamina"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Calories"
        max={4000}
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Breath"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Bladder"
      />
    </div>
    <Typography className={classes.header} variant="h6">
      <Trans>Mind</Trans>
    </Typography>
    <Divider className={classes.divider} />
    <div className={classes.group}>
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Stress"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Decor"
      />
    </div>
    <Typography className={classes.header} variant="h6">
      <Trans>Disease</Trans>
    </Typography>
    <Divider className={classes.divider} />
    <div className={classes.group}>
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="ImmuneLevel"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Toxicity"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="FoodPoisoning"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="ColdBrain"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="HeatRash"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="SlimeLung"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Sunburn"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="PutridOdour"
      />
      <Value
        className={classes.value}
        gameObjectId={gameObjectId}
        modifier="Spores"
      />
    </div>
  </div>
);

export default withStyles(styles)(Health);
