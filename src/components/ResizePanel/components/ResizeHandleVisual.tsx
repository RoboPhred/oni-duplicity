import styled, { Intent, intentFill, getThemeColor, Color } from "@/style";

export interface ResizeHandleVisualProps {
  isResizing: boolean;
}
const ResizeHandleVisual = styled<ResizeHandleVisualProps, "div">("div")`
  width: 4px;
  height: 100%;
  background-color: ${props =>
    getThemeColor(
      props.isResizing ? Color.PrimaryIntent : Color.DefaultSeparator
    )};
  flex: none;
  cursor: ew-resize;

  :hover {
    ${intentFill.of(Intent.Primary)};
  }
`;
export default ResizeHandleVisual;
