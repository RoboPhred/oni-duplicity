import styled from "@/style";

import { getTheme } from "@/style";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${props => getTheme(props).colors.bg.default};
`;
AppContainer.displayName = "AppContainer";
export default AppContainer;
