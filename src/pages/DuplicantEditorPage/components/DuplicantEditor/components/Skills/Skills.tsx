import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Experience from "./components/Experience";

export interface SkillsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing.unit
    }
  });

type Props = SkillsProps & WithStyles<typeof styles>;

const Skills: React.FC<Props> = ({ gameObjectId, classes }) => (
  <div className={classes.root}>
    <Experience gameObjectId={gameObjectId} />
  </div>
);

export default withStyles(styles)(Skills);
