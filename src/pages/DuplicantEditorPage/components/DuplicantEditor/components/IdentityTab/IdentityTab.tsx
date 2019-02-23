import * as React from "react";

import FormGroup from "@material-ui/core/FormGroup";

import DuplicantName from "./components/DuplicantName";
import DuplicantGender from "./components/DuplicantGender";
import DuplicantVoice from "./components/DuplicantVoice";

export interface IdentityTabProps {
  gameObjectId: number;
}

type Props = IdentityTabProps;

const IdentityTab: React.SFC<Props> = ({ gameObjectId }) => (
  <FormGroup>
    <DuplicantName gameObjectId={gameObjectId} />
    <DuplicantGender gameObjectId={gameObjectId} />
    <DuplicantVoice gameObjectId={gameObjectId} />
  </FormGroup>
);

export default IdentityTab;
