import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Experience from "./components/Experience";
import Masteries from "./components/Masteries";

export interface SkillsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing()
    }
  });

type Props = SkillsProps & WithStyles<typeof styles>;

const Skills: React.FC<Props> = ({ gameObjectId, classes }) => (
  <div className={classes.root}>
    <Experience gameObjectId={gameObjectId} />
    <Masteries gameObjectId={gameObjectId} />
  </div>
);

export default withStyles(styles)(Skills);
