import styled from "styled-components";

export interface FlexItemProps {
  grow?: boolean;
  shrink?: boolean;
}

const FlexItem = styled<FlexItemProps, "div">("div")`
  flex-grow: ${props => (props.grow ? 1 : 0)};
  flex-shrink: ${props => (props.shrink ? 1 : 0)};
  flex-basis: auto;
`;
export default FlexItem;
