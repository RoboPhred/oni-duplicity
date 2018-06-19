import styled from "styled-components";
import { getTheme } from "@/theme";

const ContentSeparator = styled.div`
  width: 1px;
  height: 100%;
  background: ${props => getTheme(props).colors.bgSeparator};
`;
export default ContentSeparator;
