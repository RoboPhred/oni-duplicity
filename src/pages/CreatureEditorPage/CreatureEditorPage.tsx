import * as React from "react";
import { RouteComponentProps } from "react-router";
import { includes } from "lodash";

import useGameObject from "@/services/oni-save/hooks/useGameObject";
import { CREATURE_GAMEOBJECT_TYPES } from "@/services/oni-save/creatures";

import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import CreatureNotFound from "./components/CreatureNotFound";
import CreatureEditor from "./components/CreatureEditor";

export interface RouteParams {
  gameObjectId: string;
}

type Props = RouteComponentProps<RouteParams>;

const CreatureEditorPage: React.FC<Props> = ({
  match: {
    params: { gameObjectId }
  }
}) => {
  const goid = Number(gameObjectId);
  const { gameObjectType } = useGameObject(goid);

  const supportedCreature = includes(CREATURE_GAMEOBJECT_TYPES, gameObjectType);

  return (
    <>
      <RedirectIfNoSave />
      {supportedCreature && <CreatureEditor gameObjectId={goid} />}
      {!supportedCreature && <CreatureNotFound />}
    </>
  );
};

export default CreatureEditorPage;
