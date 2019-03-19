import * as React from "react";
import classnames from "classnames";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import AbstractPlanetList from "@/services/oni-save/components/AbstractPlanetList";

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
      margin: theme.spacing.unit
    },
    item: {
      margin: theme.spacing.unit / 2
    }
  });

type Props = PlanetListProps & StyleProps<typeof styles>;
const PlanetList: React.SFC<Props> = ({ className, classes }) => (
  <AbstractPlanetList>
    {({ planetIds }) => (
      <div className={classnames(className, classes.root)}>
        {planetIds.map(id => (
          <PlanetListItem key={id} className={classes.item} planetId={id} />
        ))}
      </div>
    )}
  </AbstractPlanetList>
);

export default withStyles(styles)(PlanetList);
