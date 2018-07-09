import styled from "@/theme";

import { getTheme } from "@/theme";

const ContentContainer = styled.div`
  padding: ${props => getTheme(props).space[1]}px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: auto;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
export default ContentContainer;
