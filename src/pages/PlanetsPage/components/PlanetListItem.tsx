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
    }
  });

type Props = PlanetListItemProps & WithStyles<typeof styles>;

const PlanetListItem: React.SFC<Props> = ({ classes, className, planetId }) => (
  <AbstractPlanet planetId={planetId}>
    {({ planet }) => {
      if (!planet) {
        return <div>No Data</div>;
      }
      const { type } = planet;
      return (
        <Paper className={classnames(className, classes.root)}>
          <div className={classes.titleBar}>
            <Typography variant="h6">{type}</Typography>
            <div className={classes.titleControls} />
          </div>
          <Divider />
        </Paper>
      );
    }}
  </AbstractPlanet>
);

export default withStyles(styles)(PlanetListItem);
