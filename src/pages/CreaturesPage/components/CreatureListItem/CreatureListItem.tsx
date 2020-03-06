import * as React from "react";

import classnames from "classnames";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useGameObject from "@/services/oni-save/hooks/useGameObject";

import EditButton from "./components/EditButton";

export interface CreatureListItemProps {
  className?: string;
  gameObjectId: number;
}

const useStyles = makeStyles((theme: Theme) => ({
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
  content: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing()
  },
  portraitColumn: {
    marginRight: theme.spacing(2)
  },
  attributes: {
    marginLeft: "auto"
  },
  editButton: {
    marginLeft: "auto"
  }
}));

type Props = CreatureListItemProps;

const CreatureListItem: React.FC<Props> = ({ className, gameObjectId }) => {
  const classes = useStyles();
  const { gameObjectType, position } = useGameObject(gameObjectId);
  if (!gameObjectType || !position) {
    return null;
  }

  return (
    <Paper className={classnames(classes.root, className)}>
      <div className={classes.titleBar}>
        <Typography variant="h5">{gameObjectType}</Typography>
        <Typography variant="caption">
          ({position.x.toFixed()}, {position.y.toFixed()})
        </Typography>
        <div className={classes.titleControls}>
          <EditButton
            className={classes.editButton}
            gameObjectId={gameObjectId}
          />
        </div>
      </div>
      <Divider />
      <div className={classes.content}>
        <div className={classes.portraitColumn}>
          <svg width={72} height={81}>
            {/* TODO: Creature portrait */}
            <line stroke="red" strokeWidth={1} x1={0} y1={0} x2={72} y2={81} />
            <line stroke="red" strokeWidth={1} x1={0} y1={81} x2={72} y2={0} />
          </svg>
        </div>
        {/* TODO: Creature overview */}
      </div>
    </Paper>
  );
};

export default CreatureListItem;
