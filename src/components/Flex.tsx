import { attachProps } from "@/utils";

import Box, { BoxProps } from "./Box";

export interface FlexItemProps extends BoxProps {
  grow?: boolean;
  shrink?: boolean;
  fillParent?: boolean;
  constrain?: "row" | "column";
}

const FlexItem = Box.extend<FlexItemProps>`
  ${props => props.grow && "flex-grow: 1"};
  ${props => props.shrink && "flex-shrink: 1"};
  ${props =>
    props.fillParent &&
    (props.constrain ? "flex: 0 1 auto" : "flex: 1 1 auto")};
  ${props =>
    props.constrain &&
    (props.constrain === "row"
      ? ["min-width: 0;", "width: 100%;"]
      : ["min-height: 0;", "height: 100%;"])};
  ${props => props.shrink && "min-height: 0;"};
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
