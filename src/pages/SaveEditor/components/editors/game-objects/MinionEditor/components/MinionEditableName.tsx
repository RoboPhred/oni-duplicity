import * as React from "react";

import { Intent } from "@/theme";

import Flex from "@/components/Flex";

import EditableTextField from "@/pages/SaveEditor/components/fields/EditableTextField";

import EditorHeader from "../../../components/EditorHeader";

export interface MinionHeaderProps {
  minionNamePath: string[];
}
const MinionHeader: React.SFC<MinionHeaderProps> = ({ minionNamePath }) => (
  <React.Fragment>
    <EditorHeader>
      <Flex direction="row">
        <Flex.Item mr={1}>Name</Flex.Item>
        <Flex.Item grow shrink>
          <EditableTextField intent={Intent.Primary} path={minionNamePath} />
        </Flex.Item>
      </Flex>
    </EditorHeader>
  </React.Fragment>
);
MinionHeader.displayName = "MinionHeader";
export default MinionHeader;
