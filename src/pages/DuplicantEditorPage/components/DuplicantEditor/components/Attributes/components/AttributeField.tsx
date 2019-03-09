import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { findIndex } from "lodash-es";

import Typography from "@material-ui/core/Typography";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import CommitTextField from "@/components/CommitTextField";

const AttributesEditor = AbstractBehaviorEditor.ofType(
  AIAttributeLevelsBehavior
);

export interface AttributeFieldProps {
  className?: string;
  gameObjectId: number;
  attributeId: string;
}

type Props = AttributeFieldProps;
const AttributeField: React.SFC<Props> = ({
  className,
  gameObjectId,
  attributeId
}) => {
  return (
    <AttributesEditor gameObjectId={gameObjectId}>
      {({ templateData: { saveLoadLevels }, onTemplateDataModify }) => {
        const attrIndex = findIndex(
          saveLoadLevels,
          x => x.attributeId === attributeId
        );
        if (attrIndex === -1) {
          return <Typography>Attribute Not Found</Typography>;
        }
        const attr = saveLoadLevels[attrIndex];
        const { level } = attr;
        return (
          <CommitTextField
            className={className}
            type="number"
            value={level}
            onCommit={value => {
              const newLevels = [...saveLoadLevels];
              newLevels[attrIndex] = { ...attr, level: Number(value) };
              onTemplateDataModify({
                saveLoadLevels: newLevels
              });
            }}
          />
        );
      }}
    </AttributesEditor>
  );
};

export default AttributeField;
