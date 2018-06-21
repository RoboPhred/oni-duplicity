import * as React from "react";

import styled from "styled-components";

import ResizePanel from "@/components/ResizePanel";

const SidebarResizePanel = styled(ResizePanel)`
  height: 100%;
`;

const SidebarInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const SidebarContainer: React.SFC = ({ children }) => (
  <SidebarResizePanel>
    <SidebarInnerContainer>{children}</SidebarInnerContainer>
  </SidebarResizePanel>
);
export default styled(SidebarContainer)`
  height: 100%;
`;
