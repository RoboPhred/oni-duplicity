import * as React from "react";

import { FlexItem } from "@/components/Flex";

const ContentContainer: React.SFC = ({ children }) => (
  <FlexItem grow shrink>
    {children}
  </FlexItem>
);
export default ContentContainer;
