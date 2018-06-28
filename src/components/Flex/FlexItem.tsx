import styled from "styled-components";
import { HeightProps, WidthProps, height, width } from "styled-system";

export interface FlexItemProps extends WidthProps, HeightProps {
  grow?: boolean;
  shrink?: boolean;
}

const FlexItem = styled<FlexItemProps, "div">("div")`
  flex-grow: ${props => (props.grow ? 1 : 0)};
  flex-shrink: ${props => (props.shrink ? 1 : 0)};
  flex-basis: auto;
  box-sizing: border-box;
  ${height};
  ${width};
`;
FlexItem.displayName = "FlexItem";
export default FlexItem;
