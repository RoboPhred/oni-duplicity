import styled from "styled-components";
import { getTheme } from "@/theme";

const ResizeHandleVisual = styled.div`
  width: 2px;
  height: 100%;
  background: ${props => getTheme(props).colors.bg.separator};
  flex: none;
  cursor: ew-resize;
`;
export default ResizeHandleVisual;
