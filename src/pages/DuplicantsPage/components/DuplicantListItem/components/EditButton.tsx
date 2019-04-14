import * as React from "react";

import EditIcon from "@material-ui/icons/Edit";

import { WithTranslation, withTranslation } from "react-i18next";

import ButtonLink from "@/components/ButtonLink";

export interface EditButtonProps {
  className?: string;
  gameObjectId: number;
}
type Props = EditButtonProps & WithTranslation;
const EditButton: React.FC<Props> = ({ className, gameObjectId, t }) => (
  <ButtonLink
    className={className}
    to={`/duplicants/${gameObjectId}`}
    size="small"
    title={t("duplicant.verbs.edit_titlecase")}
  >
    <EditIcon />
  </ButtonLink>
);
export default withTranslation()(EditButton);
