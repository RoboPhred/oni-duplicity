import * as React from "react";

import styled from "styled-components";

import { FlexItem } from "@/components/Flex";
import { getTheme } from "@/theme";

const ContentContainer: React.SFC<{ className?: string }> = ({
  children,
  className
}) => (
  <FlexItem className={className} grow shrink>
    {children}
  </FlexItem>
);
export default styled(ContentContainer)`
  padding: ${props => getTheme(props).space[1]}px;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
`;
