import * as React from "react";

import Flex from "@/components/Flex";

const TabContent: React.SFC = ({ children }) => (
  <Flex.Item grow shrink pl={1}>
    {children}
  </Flex.Item>
);
TabContent.displayName = "TabContent";
export default TabContent;
