import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { find } from "lodash-es";

import { Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const AttributeEditor = AbstractBehaviorEditor.ofType(
  AIAttributeLevelsBehavior
);

export interface AttributeNameProps {
  gameObjectId: number;
  attributeId: string;
}

const styles = (theme: Theme) =>
  createStyles({
    notFound: {
      color: `#${theme.palette.error}`
    }
  });

type Props = AttributeNameProps & StyleProps<typeof styles>;
const AttributeName: React.SFC<Props> = ({
  classes,
  gameObjectId,
  attributeId
}) => (
  <AttributeEditor gameObjectId={gameObjectId}>
    {({ templateData }) => {
      console.log(templateData.saveLoadLevels);
      let attribute = find(
        templateData.saveLoadLevels,
        x => x.attributeId === attributeId
      );
      return (
        <Typography component="span" variant="body2">
          {attribute && signPrefix(attribute.level)}
          {!attribute && <ErrorIcon className={classes.notFound} />}{" "}
          <Trans i18nKey={`oni:todo-trans.${attributeId}`}>{attributeId}</Trans>
        </Typography>
      );
    }}
  </AttributeEditor>
);

export default withStyles(styles)(AttributeName);

function signPrefix(x: number): string {
  if (x > 0) {
    return `+${x}`;
  } else if (x < 0) {
    return `-${x}`;
  }
  return String(x);
}
