import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { findIndex } from "lodash";

import Typography from "@material-ui/core/Typography";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

import CommitTextField from "@/components/CommitTextField";

export interface AttributeFieldProps {
  className?: string;
  gameObjectId: number;
  attributeId: string;
}

type Props = AttributeFieldProps;
const AttributeField: React.FC<Props> = ({
  className,
  gameObjectId,
  attributeId
}) => {
  const { templateData: { saveLoadLevels }, onTemplateDataModify } = useBehavior(gameObjectId, AIAttributeLevelsBehavior);

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
};

export default AttributeField;
