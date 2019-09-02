import * as React from "react";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import AbstractGameObjectList from "@/services/oni-save/components/AbstractGameObjectList";

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

const DuplicantList: React.FC<Props> = ({ className, classes }) => (
  <AbstractGameObjectList gameObjectType="Minion">
    {({ gameObjectIds }) => (
      <div className={classnames(className, classes.root)}>
        {gameObjectIds.map(id => (
          <DuplicantListItem
            key={id}
            className={classes.item}
            gameObjectId={id}
          />
        ))}
      </div>
    )}
  </AbstractGameObjectList>
);

export default withStyles(styles)(DuplicantList);
