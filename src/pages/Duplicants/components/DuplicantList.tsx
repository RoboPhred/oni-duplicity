import * as React from "react";

import AbstractGameObjectList from "@/services/oni-save/components/AbstractGameObjectList";

import DuplicantListItem from "./DuplicantListItem";

const DuplicantList: React.SFC = () => (
  <AbstractGameObjectList gameObjectType="Minion">
    {({ gameObjectIds }) => (
      <div>
        {gameObjectIds.map(id => (
          <DuplicantListItem key={id} gameObjectId={id} />
        ))}
      </div>
    )}
  </AbstractGameObjectList>
);

export default DuplicantList;
