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

import usePlanet from "@/services/oni-save/hooks/usePlanet";

import RecoverableElement from "./components/RecoverableElement";

export interface PlanetListItemProps {
  planetId: number;
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(45),
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2)
    },
    titleBar: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing()
    },
    titleControls: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto"
    },
    divider: {
      marginBottom: theme.spacing()
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
      marginLeft: theme.spacing(),
      marginRight: theme.spacing()
    }
  });

type Props = PlanetListItemProps & WithStyles<typeof styles>;

const PlanetListItem: React.FC<Props> = ({ classes, className, planetId }) => {
  const { planet } = usePlanet(planetId);

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
          {planet.recoverableElements.map((_, index) => (
            <RecoverableElement
              key={index}
              planetId={planetId}
              resourceId={index}
            />
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(PlanetListItem);
