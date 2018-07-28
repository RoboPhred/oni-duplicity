import * as React from "react";

import { FontSize, Space } from "@/style";

import Box from "@/components/Box";
import Text from "@/components/Text";

const EditorHeader: React.SFC = ({ children }) => (
  <Box width="100%" alignSelf="baseline" pb={Space.Small}>
    <Text fontSize={FontSize.Heading} fontWeight="bold">
      {children}
    </Text>
  </Box>
);
EditorHeader.displayName = "EditorHeader";
export default EditorHeader;
