import * as React from "react";
import { MinionIdentityBehavior } from "oni-save-parser";

import Typography from "@material-ui/core/Typography";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

export interface DuplicantNameProps {
  gameObjectId: number;
}

const DuplicantName: React.FC<DuplicantNameProps> = ({ gameObjectId }) => {
  const { templateData: { name } } = useBehavior(gameObjectId, MinionIdentityBehavior);
  return (
    <Typography variant="h5">{name}</Typography>
  );
}
export default DuplicantName;
