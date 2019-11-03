import * as React from "react";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import useGameObjects from "@/services/oni-save/hooks/useGameObjects";

import DuplicantListItem from "./DuplicantListItem";

export interface DuplicantListProps {
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

type Props = DuplicantListProps & WithStyles<typeof styles>;

const DuplicantList: React.FC<Props> = ({ className, classes }) => {
  const gameObjectIds = useGameObjects("Minion");
  return (
    <div className={classnames(className, classes.root)}>
      {gameObjectIds.map(id => (
        <DuplicantListItem
          key={id}
          className={classes.item}
          gameObjectId={id}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(DuplicantList);
