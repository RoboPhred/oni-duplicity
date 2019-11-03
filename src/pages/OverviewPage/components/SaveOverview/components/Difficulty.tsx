import * as React from "react";
import { QualityLevelSettingValues } from "oni-save-parser";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useDifficulty from "@/services/oni-save/hooks/useDifficulty";
import { keysOfType } from "@/utils";

const styles = createStyles({
  table: {
    display: "grid",
    gridTemplateColumns: "minmax(min-content, 200px) auto"
  }
});

export interface DifficultyProps {
  className?: string;
}

type Props = DifficultyProps & WithStyles<typeof styles>;

const Difficulty: React.FC<Props> = ({ className, classes }) => {
  const { difficulty, onModifyDifficulty } = useDifficulty()
  return (
    <div className={className}>
      <Typography variant="h6">Difficulty</Typography>
      <Divider />
      <div className={classes.table}>
        {keysOfType(difficulty).map(name => (
          <React.Fragment key={name}>
            <Typography>{name}</Typography>
            <Select
              value={difficulty[name]}
              onChange={e =>
                onModifyDifficulty(name, e.target.value as string)
              }
            >
              {QualityLevelSettingValues[name].map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(Difficulty);
