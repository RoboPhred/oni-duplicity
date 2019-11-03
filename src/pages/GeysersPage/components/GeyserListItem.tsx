import * as React from "react";
import { GeyserType } from "oni-save-parser";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";

import useGeyser from "@/services/oni-save/hooks/useGeyser";

import { keysOfType } from "@/utils";

export interface GeyserListItemProps {
  gameObjectId: number;
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
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
    sliderSection: {
      marginTop: theme.spacing()
    },
    valueLabel: {
      marginBottom: theme.spacing()
    }
  });

type Props = GeyserListItemProps & WithStyles<typeof styles>;

const GeyserListItem: React.FC<Props> = ({
  classes,
  className,
  gameObjectId
}) => {
  const { geyserType, emitRate, onChangeEmitRate, onChangeGeyserType } = useGeyser(gameObjectId);
  return (
    <Paper className={classnames(className, classes.root)}>
      <div className={classes.titleBar}>
        <Typography variant="h6">{geyserType}</Typography>
        <div className={classes.titleControls} />
      </div>
      <Divider />
      <Select
        value={geyserType || ""}
        onChange={e => onChangeGeyserType(e.target.value as string)}
      >
        {keysOfType(GeyserType).map(typeName => (
          <MenuItem key={typeName} value={typeName}>
            {typeName}
          </MenuItem>
        ))}
      </Select>
      <div className={classes.sliderSection}>
        <Typography className={classes.valueLabel} id="rate-label">
          Rate
          </Typography>
        <Slider
          aria-labelledby="rate-label"
          defaultValue={(emitRate || 0) * 100}
          onChangeCommitted={(_, value) => onChangeEmitRate((value as number) / 100)}
        />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(GeyserListItem);
