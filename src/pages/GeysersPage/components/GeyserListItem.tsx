import * as React from "react";
import { GeyserType } from "oni-save-parser";
import classnames from "classnames";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";
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
  sliderSection: {
    marginTop: theme.spacing()
  },
  valueLabel: {
    marginBottom: theme.spacing()
  }
}));

type Props = GeyserListItemProps & WithTranslation;

const GeyserListItem: React.FC<Props> = ({ className, gameObjectId, t }) => {
  const styles = useStyles();

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
    <Paper className={classnames(className, styles.root)}>
      <div className={styles.titleBar}>
        <Typography variant="h6">{geyserType}</Typography>
        <div className={styles.titleControls} />
      </div>
      <Divider />
      <Select value={geyserType || ""} onChange={onGeyserTypeSelected}>
        {keysOfType(GeyserType).map(typeName => (
          <MenuItem key={typeName} value={typeName}>
            {typeName}
          </MenuItem>
        ))}
      </Select>
      <div className={styles.sliderSection}>
        <Typography className={styles.valueLabel} id="lifecycle-label">
          {t("geyser.total_lifecycle_time")}
        </Typography>
        <Slider
          aria-labelledby="lifecycle-label"
          defaultValue={(yearLength || 0) * 100}
          onChangeCommitted={onGeyserYearLengthChanged}
        />
      </div>
      <div className={styles.sliderSection}>
        <Typography className={styles.valueLabel} id="active-label">
          {t("geyser.active_time")}
        </Typography>
        <Slider
          aria-labelledby="active-label"
          defaultValue={(yearActive || 0) * 100}
          onChangeCommitted={onGeyserYearActiveChanged}
        />
      </div>
      <div className={styles.sliderSection}>
        <Typography className={styles.valueLabel} id="emitting-label">
          {t("geyser.emission_length")}
        </Typography>
        <Slider
          aria-labelledby="emitting-label"
          defaultValue={(emitActive || 0) * 100}
          onChangeCommitted={onGeyserEmissionLengthChanged}
        />
      </div>
      <div className={styles.sliderSection}>
        <Typography className={styles.valueLabel} id="rate-label">
          {t("geyser.emission_rate")}
        </Typography>
        <Slider
          aria-labelledby="rate-label"
          defaultValue={(emitRate || 0) * 100}
          onChangeCommitted={onGeyserRateChanged}
        />
      </div>
    </Paper>
  );
};

export default withTranslation()(GeyserListItem);
