import * as React from "react";

export interface TabProps {
  tabKey: string | number;
  header: React.ReactChild;
}

const Tab: React.SFC<TabProps> = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);
Tab.displayName = "Tab";
export default Tab;
