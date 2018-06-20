import styled, { Styles } from "styled-components";

export interface FlexContainerProps {
  direction: "row" | "column";
  width?: number | string;
  height?: number | string;
}
const FlexContainer = styled<FlexContainerProps, "div">("div")`
  display: flex;
  flex-direction: ${props => props.direction};
  ${getStyle};
`;
export default FlexContainer;

function getStyle(props: FlexContainerProps): Styles {
  return {
    width: props.width != null ? valueOrPx(props.width) : (undefined as any),
    height: props.height != null ? valueOrPx(props.height) : (undefined as any)
  };
}
function valueOrPx(value: number | string): string {
  if (typeof value === "number") {
    return `${value}px;`;
  }
  return `${value};`;
}
