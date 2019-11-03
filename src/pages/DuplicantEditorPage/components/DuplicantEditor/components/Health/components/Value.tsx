import * as React from "react";
import { MinionModifiersBehavior } from "oni-save-parser";
import { find, findIndex, merge } from "lodash";

import { Trans } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

const styles = (theme: Theme) =>
  createStyles({
    valueLabel: {
      marginBottom: theme.spacing()
    }
  });

export interface ValueProps {
  className?: string;
  gameObjectId: number;
  modifier: string;
  max?: number;
}

type Props = ValueProps & WithStyles<typeof styles>;

const Value: React.FC<Props> = ({
  className,
  classes,
  gameObjectId,
  modifier,
  max
}) => {
  const [transientValue, setTransientValue] = React.useState(-1);
  const { extraData: { amounts }, onExtraDataModify } = useBehavior(gameObjectId, MinionModifiersBehavior);

  const amount = find(amounts, x => x.name === modifier);
  const value = (amount && amount.value.value) || 0;

  const setAmount = React.useCallback((_: any, value: number | number[]) => {
    const i = findIndex(amounts, x => x.name === modifier);
    if (i === -1) {
      return;
    }
    onExtraDataModify({
      amounts: merge([], amounts, {
        [i]: { name: modifier, value: { value: value as number } }
      })
    });
  }, [onExtraDataModify, amounts, modifier]);

  const setTransientAmount = React.useCallback((_: any, value: number | number[]) => {
    setTransientValue(value as number);
  }, []);

  return (
    <div className={className}>
      <Typography className={classes.valueLabel} id={`${modifier}-label`}>
        <Trans i18nKey={`oni:todo-trans.modifiers.${modifier}`}>
          {modifier}
        </Trans>
        {": "}
        {String(transientValue !== -1 ? transientValue : value)}
      </Typography>
      <Slider
        aria-labelledby={`${modifier}-label`}
        value={transientValue !== -1 ? transientValue : value}
        min={0}
        max={max || 100}
        onChange={setTransientAmount}
        onChangeCommitted={setAmount}
      />
    </div>
  );
}

export default withStyles(styles)(Value);
