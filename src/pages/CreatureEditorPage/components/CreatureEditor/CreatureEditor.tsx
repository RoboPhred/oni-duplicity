import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import useGameObject from "@/services/oni-save/hooks/useGameObject";

import PageContainer from "@/components/PageContainer";

export interface CreatureEditorProps {
  gameObjectId: number;
}

type Props = WithTranslation & CreatureEditorProps;
const CreatureEditor: React.FC<Props> = ({ t, gameObjectId }) => {
  const { gameObjectType } = useGameObject(gameObjectId);
  return (
    <PageContainer title={t("creature.verbs.edit_titlecase")} back>
      <div>Type: {gameObjectType}</div>
      <div>Not Implemented.</div>
    </PageContainer>
  );
};

export default withTranslation()(CreatureEditor);
