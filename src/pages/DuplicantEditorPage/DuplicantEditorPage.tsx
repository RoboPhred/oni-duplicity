import * as React from "react";

import { RouteComponentProps } from "react-router";

import AbstractGameObject from "@/services/oni-save/components/AbstractGameObject";

import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import DuplicantEditor from "./components/DuplicantEditor";
import DuplicantNotFound from "./components/DuplicantNotFound";

export interface DuplicantEditorRouteParams {
  gameObjectId: string;
}

export interface DuplicantEditorProps
  extends RouteComponentProps<DuplicantEditorRouteParams> {}

type Props = DuplicantEditorProps;
const DuplicantEditorPage: React.SFC<Props> = ({
  match: {
    params: { gameObjectId }
  }
}) => (
  <AbstractGameObject gameObjectId={Number(gameObjectId)}>
    {({ gameObjectType }) => (
      <React.Fragment>
        <RedirectIfNoSave />

        {gameObjectType === "Minion" && (
          <DuplicantEditor gameObjectId={Number(gameObjectId)} />
        )}
        {gameObjectType !== "Minion" && <DuplicantNotFound />}
      </React.Fragment>
    )}
  </AbstractGameObject>
);
export default DuplicantEditorPage;
