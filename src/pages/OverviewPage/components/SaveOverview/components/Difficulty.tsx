import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import AbstractCustomSettings from "@/services/oni-save/components/AbstractCustomSettings";

const styles = (theme: Theme) =>
  createStyles({
    table: {
      display: "grid",
      gridTemplateColumns: "minmax(min-content, 200px) auto"
    }
  });

type Props = StyleProps<typeof styles>;

const Difficulty: React.SFC<Props> = ({ classes }) => (
  <AbstractCustomSettings>
    {({ difficulty }) => (
      <div>
        <Typography variant="h6">Difficulty</Typography>
        <Divider />
        <div className={classes.table}>
          {Object.keys(difficulty).map(name => (
            <>
              <Typography>{name}</Typography>
              <Typography>{difficulty[name]}</Typography>
            </>
          ))}
        </div>
      </div>
    )}
  </AbstractCustomSettings>
);

export default withStyles(styles)(Difficulty);
