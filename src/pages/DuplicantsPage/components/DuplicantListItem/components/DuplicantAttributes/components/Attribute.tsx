import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { find } from "lodash-es";

import { Trans, WithTranslation, withTranslation } from "react-i18next";

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

type Props = AttributeNameProps & WithTranslation;
const AttributeName: React.SFC<Props> = ({ gameObjectId, attributeId, t }) => (
  <AttributeEditor gameObjectId={gameObjectId}>
    {({ templateData }) => {
      let attribute = find(
        templateData.saveLoadLevels,
        x => x.attributeId === attributeId
      );
      return (
        <Typography
          component="span"
          variant="body2"
          title={t(`oni:DUPLICANTS.ATTRIBUTES.${attributeId}.DESC`, {
            defaultValue: ""
          })}
        >
          {attribute && signPrefix(attribute.level)}
          {!attribute && <ErrorIcon />}{" "}
          <Trans i18nKey={`oni:DUPLICANTS.ATTRIBUTES.${attributeId}.NAME`}>
            {attributeId}
          </Trans>
        </Typography>
      );
    }}
  </AttributeEditor>
);

export default withTranslation()(AttributeName);

function signPrefix(x: number): string {
  if (x > 0) {
    return `+${x}`;
  } else if (x < 0) {
    return `-${x}`;
  }
  return String(x);
}
