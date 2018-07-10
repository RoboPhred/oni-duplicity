import styled from "@/theme";

import { attachProps } from "@/utils";

import Box, { BoxProps } from "./Box";

export interface FlexItemProps extends BoxProps {
  grow?: boolean;
  shrink?: boolean;
}

const FlexItem = styled<FlexItemProps, "div">("div")`
  flex-grow: ${props => (props.grow ? 1 : 0)};
  flex-shrink: ${props => (props.shrink ? 1 : 0)};
  flex-basis: auto;
  box-sizing: border-box;
`;
FlexItem.displayName = "FlexItem";

export interface FlexProps extends BoxProps {
  direction: "row" | "column";
}
const Flex = Box.extend<FlexProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  align-items: stretch;
`;
Flex.displayName = "Flex";

export default attachProps(Flex, {
  Item: FlexItem
});
