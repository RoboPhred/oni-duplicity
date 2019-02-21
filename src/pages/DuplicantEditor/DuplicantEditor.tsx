import * as React from "react";

import { RouteComponentProps } from "react-router";

export interface DuplicantEditorRouteParams {
  gameObjectId: string;
}

export interface DuplicantEditorProps
  extends RouteComponentProps<DuplicantEditorRouteParams> {}

type Props = DuplicantEditorProps;
const DuplicantEditor: React.SFC<Props> = ({
  match: {
    params: { gameObjectId }
  }
}) => <div>Hello World {gameObjectId}</div>;
export default DuplicantEditor;
