import styled from "styled-components";

import Box, { BoxProps } from "../Box";

export interface FlexContainerProps extends BoxProps {
  direction: "row" | "column";
}
const FlexContainer = styled<FlexContainerProps, any>(Box)`
  display: flex;
  flex-direction: ${props => props.direction};
`;
FlexContainer.displayName = "FlexContainer";
export default FlexContainer;
