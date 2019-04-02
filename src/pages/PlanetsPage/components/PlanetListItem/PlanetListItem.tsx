import * as React from "react";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import AbstractPlanet from "@/services/oni-save/components/AbstractPlanet";

import RecoverableElement from "./components/RecoverableElement";

export interface PlanetListItemProps {
  planetId: number;
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing.unit * 45,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit * 2
    },
    titleBar: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing.unit
    },
    titleControls: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto"
    },
    divider: {
      marginBottom: theme.spacing.unit
    },
    contentLayout: {
      display: "flex",
      flexDirection: "row"
    },
    planetContainer: {
      width: 100,
      height: 100
    },
    planetImg: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  });

type Props = PlanetListItemProps & WithStyles<typeof styles>;

const PlanetListItem: React.SFC<Props> = ({ classes, className, planetId }) => (
  <AbstractPlanet planetId={planetId}>
    {({ planet }) => {
      if (!planet) {
        return <Typography>No Data</Typography>;
      }
      const { type } = planet;
      return (
        <Paper className={classnames(className, classes.root)}>
          <div className={classes.titleBar}>
            <Typography variant="h6">{type}</Typography>
            <div className={classes.titleControls} />
          </div>
          <Divider className={classes.divider} />
          <div className={classes.contentLayout}>
            <div className={classes.planetImg}>
              <svg
                viewBox="0 0 70 70"
                width={70}
                height={70}
                className={classes.planetImg}
              >
                <circle cx={35} cy={35} r={35} fill="red" />
              </svg>
            </div>
            <div>
              {planet.recoverableElements.map(([hash, chance]) => (
                <RecoverableElement hash={hash} chance={chance} />
              ))}
            </div>
          </div>
        </Paper>
      );
    }}
  </AbstractPlanet>
);

export default withStyles(styles)(PlanetListItem);
