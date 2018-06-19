import styled from "styled-components";

import { getTheme } from "@/theme";

const AppContainer = styled.div`
  background: ${props => getTheme(props).colors.bgApp};
  width: 100%;
  height: 100%;
`;
export default AppContainer;
