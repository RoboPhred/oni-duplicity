import * as React from "react";
import { MinionIdentityBehavior } from "oni-save-parser";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const MinionIdentityEditor = AbstractBehaviorEditor.ofType(
  MinionIdentityBehavior
);

export interface DuplicantListItemProps {
  gameObjectId: number;
}
const DuplicantListItem: React.SFC<DuplicantListItemProps> = ({
  gameObjectId
}) => (
  <MinionIdentityEditor gameObjectId={gameObjectId}>
    {({ templateData }) => <div>{templateData.name}</div>}
  </MinionIdentityEditor>
);

export default DuplicantListItem;
