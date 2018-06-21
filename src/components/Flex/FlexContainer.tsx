import styled, { Styles } from "styled-components";
import { HeightProps, WidthProps, height, width } from "styled-system";

export interface FlexContainerProps extends HeightProps, WidthProps {
  direction: "row" | "column";
}
const FlexContainer = styled<FlexContainerProps, "div">("div")`
  display: flex;
  flex-direction: ${props => props.direction};
  ${height};
  ${width};
`;
export default FlexContainer;
