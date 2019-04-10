import * as React from "react";
import { MinionIdentityBehavior } from "oni-save-parser";

import Typography from "@material-ui/core/Typography";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const MinionIdentityEditor = AbstractBehaviorEditor.ofType(
  MinionIdentityBehavior
);

export interface DuplicantNameProps {
  gameObjectId: number;
}

const DuplicantName: React.FC<DuplicantNameProps> = ({ gameObjectId }) => (
  <MinionIdentityEditor gameObjectId={gameObjectId}>
    {({ templateData }) => (
      <Typography variant="h5">{templateData.name}</Typography>
    )}
  </MinionIdentityEditor>
);
export default DuplicantName;
