import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import PageContainer from "@/components/PageContainer";

type Props = WithTranslation;

const CreatureEditorPage: React.FC<Props> = ({ t }) => {
  return (
    <PageContainer title={t("creature.verbs.edit_titlecase")} back>
      Not Implemented
    </PageContainer>
  );
};

export default withTranslation()(CreatureEditorPage);
