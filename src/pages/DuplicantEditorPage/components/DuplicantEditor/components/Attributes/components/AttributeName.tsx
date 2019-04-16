import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

export interface AttributeNameProps {
  attributeId: string;
}

type Props = AttributeNameProps & WithTranslation;
const AttributeName: React.FC<Props> = ({ attributeId, t }) => (
  <Typography
    component="span"
    variant="body1"
    title={t(`oni:DUPLICANTS.ATTRIBUTES.${attributeId}.DESC`, {
      defaultValue: ""
    })}
  >
    {t(`oni:DUPLICANTS.ATTRIBUTES.${attributeId}.NAME`, {
      defaultValue: attributeId
    })}
  </Typography>
);

export default withTranslation()(AttributeName);
