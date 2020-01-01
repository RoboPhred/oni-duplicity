import * as React from "react";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import usePlanets from "@/services/oni-save/hooks/usePlanets";

import PlanetListItem from "./PlanetListItem";

export interface PlanetListProps {
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      margin: theme.spacing()
    },
    item: {
      margin: theme.spacing(0.5)
    }
  });

type Props = PlanetListProps & WithStyles<typeof styles>;

const PlanetList: React.FC<Props> = ({ className, classes }) => {
  const { planetIds } = usePlanets();
  return (
    <div className={classnames(className, classes.root)}>
      {planetIds.map(id => (
        <PlanetListItem key={id} className={classes.item} planetId={id} />
      ))}
    </div>
  );
};

export default withStyles(styles)(PlanetList);
