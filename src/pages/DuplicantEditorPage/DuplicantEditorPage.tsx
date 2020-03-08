import * as React from "react";

import { RouteComponentProps } from "react-router";

import useGameObject from "@/services/oni-save/hooks/useGameObject";

import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import DuplicantEditor from "./components/DuplicantEditor";
import DuplicantNotFound from "./components/DuplicantNotFound";

export interface DuplicantEditorRouteParams {
  gameObjectId: string;
}

export interface DuplicantEditorProps
  extends RouteComponentProps<DuplicantEditorRouteParams> {}

type Props = DuplicantEditorProps;
const DuplicantEditorPage: React.FC<Props> = ({
  match: {
    params: { gameObjectId }
  }
}) => {
  const { gameObjectType } = useGameObject(Number(gameObjectId));
  return (
    <>
      <RedirectIfNoSave />
      {gameObjectType === "Minion" && (
        <DuplicantEditor gameObjectId={Number(gameObjectId)} />
      )}
      {gameObjectType !== "Minion" && <DuplicantNotFound />}
    </>
  );
};

export default DuplicantEditorPage;
