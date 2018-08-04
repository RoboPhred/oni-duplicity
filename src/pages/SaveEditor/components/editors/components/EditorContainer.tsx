import * as React from "react";

import Flex from "@/components/Flex";

import EditorHeader from "./EditorHeader";
import { Space } from "@/style";

export interface EditorContainerProps {
  header: React.ReactNode;
}
const EditorContainer: React.SFC<EditorContainerProps> = ({
  header,
  children
}) => (
  <Flex direction="column" width="100%" height="100%">
    <EditorHeader>{header}</EditorHeader>
    <Flex.Item fillParent constrain="column" p={Space.Small}>
      {children}
    </Flex.Item>
  </Flex>
);
EditorContainer.displayName = "EditorContainer";
export default EditorContainer;
