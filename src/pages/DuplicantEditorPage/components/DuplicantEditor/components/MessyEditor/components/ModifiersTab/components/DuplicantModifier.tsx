import * as React from "react";
import { MinionModifiersBehavior } from "oni-save-parser";
import { findIndex, merge } from "lodash-es";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ErrorIcon from "@material-ui/icons/Error";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import CommitTextField from "@/components/CommitTextField";

const ModifierEditor = AbstractBehaviorEditor.ofType(MinionModifiersBehavior);

export interface DuplicantModifierProps {
  className?: string;
  gameObjectId: number;
  modifierId: string;
}

const styles = (theme: Theme) =>
  createStyles({
    errorIndicator: {
      marginTop: theme.spacing.unit * 2
    }
  });

type Props = DuplicantModifierProps &
  WithTranslation &
  StyleProps<typeof styles>;
const DuplicantModifier: React.SFC<Props> = ({
  className,
  classes,
  gameObjectId,
  modifierId,
  t
}) => (
  <ModifierEditor gameObjectId={gameObjectId}>
    {({ extraData, onExtraDataModify }) => {
      const attributeIndex = findIndex(
        extraData.amounts,
        x => x.name === modifierId
      );
      const attribute =
        attributeIndex >= 0 ? extraData.amounts[attributeIndex] : null;
      if (!attribute) {
        return (
          <FormControl className={className}>
            <InputLabel shrink={true}>
              <Trans i18nKey={`oni:todo-trans.modifier.${modifierId}`}>
                {modifierId}
              </Trans>
            </InputLabel>
            <div
              className={classes.errorIndicator}
              title={t("duplicant-editor.missing-data")}
            >
              <ErrorIcon />
            </div>
          </FormControl>
        );
      }
      return (
        <CommitTextField
          label={t(`oni:todo-trans.modifier.${modifierId}`, {
            defaultValue: modifierId
          })}
          type="number"
          value={attribute.value.value}
          onCommit={value =>
            onExtraDataModify({
              amounts: merge([], extraData.amounts, {
                [attributeIndex]: {
                  value: {
                    value
                  }
                }
              })
            })
          }
        />
      );
    }}
  </ModifierEditor>
);

export default withTranslation()(withStyles(styles)(DuplicantModifier));
