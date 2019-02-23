import * as React from "react";
import { MinionModifiersBehavior } from "oni-save-parser";
import { findIndex } from "lodash-es";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import ErrorIcon from "@material-ui/icons/Error";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

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
    {({ extraData }) => {
      const attributeIndex = findIndex(
        extraData.amounts,
        x => x.name === modifierId
      );
      const attribute =
        attributeIndex > -1 ? extraData.amounts[attributeIndex] : null;
      const id = `duplicant-modifier-${modifierId}`;
      return (
        <FormControl className={className}>
          <InputLabel htmlFor={id} shrink={true}>
            <Trans i18nKey={`oni:todo-trans.modifier.${modifierId}`}>
              {modifierId}
            </Trans>
          </InputLabel>
          {attribute && <Input id={id} value={attribute.value.value} />}
          {!attribute && (
            <div
              className={classes.errorIndicator}
              title={t("duplicant-editor.missing-data")}
            >
              <ErrorIcon />
            </div>
          )}
        </FormControl>
      );
    }}
  </ModifierEditor>
);

export default withTranslation()(withStyles(styles)(DuplicantModifier));
