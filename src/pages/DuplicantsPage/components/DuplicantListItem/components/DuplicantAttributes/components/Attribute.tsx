import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { find } from "lodash-es";

import { Trans } from "react-i18next";

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

type Props = AttributeNameProps;
const AttributeName: React.SFC<Props> = ({ gameObjectId, attributeId }) => (
  <AttributeEditor gameObjectId={gameObjectId}>
    {({ templateData }) => {
      let attribute = find(
        templateData.saveLoadLevels,
        x => x.attributeId === attributeId
      );
      return (
        <Typography component="span" variant="body2">
          {attribute && signPrefix(attribute.level)}
          {!attribute && <ErrorIcon />}{" "}
          <Trans i18nKey={`oni:todo-trans.${attributeId}`}>{attributeId}</Trans>
        </Typography>
      );
    }}
  </AttributeEditor>
);

export default AttributeName;

function signPrefix(x: number): string {
  if (x > 0) {
    return `+${x}`;
  } else if (x < 0) {
    return `-${x}`;
  }
  return String(x);
}
