import styled, { Background, Intent, background, intentFill } from "@/style";

export interface ResizeHandleVisualProps {
  isResizing: boolean;
}
const ResizeHandleVisual = styled<ResizeHandleVisualProps, "div">("div")`
  width: 4px;
  height: 100%;
  ${props =>
    props.isResizing
      ? intentFill.of(Intent.Primary)
      : background.of(Background.Separator)};
  flex: none;
  cursor: ew-resize;

  :hover {
    ${intentFill.of(Intent.Primary)};
  }
`;
export default ResizeHandleVisual;
