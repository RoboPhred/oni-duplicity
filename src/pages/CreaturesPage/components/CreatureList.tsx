import * as React from "react";
import classnames from "classnames";

import { Theme, makeStyles } from "@material-ui/core/styles";

import useGameObjects from "@/services/oni-save/hooks/useGameObjects";
import { CREATURE_GAMEOBJECT_TYPES } from "@/services/oni-save/creatures";

import CreatureListItem from "./CreatureListItem";

export interface DuplicantListProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.spacing()
  },
  item: {
    margin: theme.spacing(0.5)
  }
}));

type Props = DuplicantListProps;

const CreatureList: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const gameObjectIds = useGameObjects(CREATURE_GAMEOBJECT_TYPES);
  return (
    <div className={classnames(className, classes.root)}>
      {gameObjectIds.map(id => (
        <CreatureListItem key={id} className={classes.item} gameObjectId={id} />
      ))}
    </div>
  );
};

export default CreatureList;
