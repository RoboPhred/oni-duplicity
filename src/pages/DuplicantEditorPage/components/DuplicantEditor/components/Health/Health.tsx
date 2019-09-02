import * as React from "react";

import { Trans } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Value from "./components/Value";

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
      marginTop: theme.spacing(),
      marginLeft: theme.spacing()
    },
    divider: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing()
    },
    group: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: theme.spacing()
    },
    value: {
      width: 300,
      marginTop: theme.spacing(),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    }
  });

type Props = HealthProps & WithStyles<typeof styles>;

const Health: React.FC<Props> = ({ classes, gameObjectId }) => (
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
        max={4000000}
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
