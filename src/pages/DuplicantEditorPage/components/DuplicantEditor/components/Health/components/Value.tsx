import * as React from "react";
import { MinionModifiersBehavior } from "oni-save-parser";
import { find, findIndex, merge } from "lodash-es";

import { Trans } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const ModifierBehaviorEditor = AbstractBehaviorEditor.ofType(
  MinionModifiersBehavior
);

const styles = (theme: Theme) =>
  createStyles({
    valueLabel: {
      marginBottom: theme.spacing.unit
    }
  });

export interface ValueProps {
  className?: string;
  gameObjectId: number;
  modifier: string;
  max?: number;
}

type Props = ValueProps & WithStyles<typeof styles>;

const Value: React.SFC<Props> = ({
  className,
  classes,
  gameObjectId,
  modifier,
  max
}) => (
  <ModifierBehaviorEditor gameObjectId={gameObjectId}>
    {({ extraData: { amounts }, onExtraDataModify }) => {
      const amount = find(amounts, x => x.name === modifier);
      const value = (amount && amount.value.value) || 0;
      function setAmount(value: number) {
        const i = findIndex(amounts, x => x.name === modifier);
        if (i === -1) {
          return;
        }
        onExtraDataModify({
          amounts: merge([], amounts, {
            [i]: { name: modifier, value: { value } }
          })
        });
      }
      return (
        <div className={className}>
          <Typography className={classes.valueLabel} id={`${modifier}-label`}>
            <Trans i18nKey={`oni:todo-trans.modifiers.${modifier}`}>
              {modifier}
            </Trans>
            {": "}
            {String(value)}
          </Typography>
          <Slider
            aria-labeledby={`${modifier}-label`}
            value={value}
            min={0}
            max={max || 100}
            onChange={(_, value) => setAmount(value)}
          />
        </div>
      );
    }}
  </ModifierBehaviorEditor>
);

export default withStyles(styles)(Value);
