import * as React from "react";
import classnames from "classnames";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

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
      margin: theme.spacing.unit
    },
    item: {
      margin: theme.spacing.unit / 2
    }
  });

type Props = DuplicantListProps & StyleProps<typeof styles>;
const DuplicantList: React.SFC<Props> = ({ className, classes }) => (
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
