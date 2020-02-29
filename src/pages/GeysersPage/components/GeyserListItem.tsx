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
  const {
    geyserType,
    emitRate,
    yearLength,
    yearActive,
    emitActive,
    onChangeEmitRate,
    onChangeGeyserType,
    onChangeYearLength,
    onChangeYearActive,
    onChangeEmitActive
  } = useGeyser(gameObjectId);

  const onGeyserTypeSelected = React.useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      onChangeGeyserType(e.target.value as string);
    },
    [onChangeGeyserType]
  );

  const onGeyserRateChanged = React.useCallback(
    (_: any, value: unknown) => {
      const emitRate = (value as number) / 100;
      onChangeEmitRate(emitRate);
    },
    [onChangeEmitRate]
  );

  const onGeyserYearLengthChanged = React.useCallback(
    (_: any, value: unknown) => {
      const fraction = (value as number) / 100;
      onChangeYearLength(fraction);
    },
    [onChangeYearLength]
  );

  const onGeyserYearActiveChanged = React.useCallback(
    (_: any, value: unknown) => {
      const fraction = (value as number) / 100;
      onChangeYearActive(fraction);
    },
    [onChangeYearActive]
  );

  const onGeyserEmissionLengthChanged = React.useCallback(
    (_: any, value: unknown) => {
      const fraction = (value as number) / 100;
      onChangeEmitActive(fraction);
    },
    [onChangeEmitActive]
  );

  return (
    <Paper className={classnames(className, classes.root)}>
      <div className={classes.titleBar}>
        <Typography variant="h6">{geyserType}</Typography>
        <div className={classes.titleControls} />
      </div>
      <Divider />
      <Select value={geyserType || ""} onChange={onGeyserTypeSelected}>
        {keysOfType(GeyserType).map(typeName => (
          <MenuItem key={typeName} value={typeName}>
            {typeName}
          </MenuItem>
        ))}
      </Select>
      <div className={classes.sliderSection}>
        <Typography className={classes.valueLabel} id="rate-label">
          Emission Rate
        </Typography>
        <Slider
          aria-labelledby="rate-label"
          defaultValue={(emitRate || 0) * 100}
          onChangeCommitted={onGeyserRateChanged}
        />
      </div>
      <div className={classes.sliderSection}>
        <Typography className={classes.valueLabel} id="lifecycle-label">
          Total Lifecycle Time (dormant + active)
        </Typography>
        <Slider
          aria-labelledby="lifecycle-label"
          defaultValue={(yearLength || 0) * 100}
          onChangeCommitted={onGeyserYearLengthChanged}
        />
      </div>
      <div className={classes.sliderSection}>
        <Typography className={classes.valueLabel} id="active-label">
          Active Lifecycle Time
        </Typography>
        <Slider
          aria-labelledby="active-label"
          defaultValue={(yearActive || 0) * 100}
          onChangeCommitted={onGeyserYearActiveChanged}
        />
      </div>
      <div className={classes.sliderSection}>
        <Typography className={classes.valueLabel} id="emitting-label">
          Emission Length
        </Typography>
        <Slider
          aria-labelledby="emitting-label"
          defaultValue={(emitActive || 0) * 100}
          onChangeCommitted={onGeyserEmissionLengthChanged}
        />
      </div>
    </Paper>
  );
};

export default withStyles(styles)(GeyserListItem);
