import styled from "styled-components";

import { getTheme } from "@/theme";

const DuplicantsListContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: ${props => getTheme(props).space[1]}px;
  border: ${props => getTheme(props).borders[2]};
  border-color: ${props => getTheme(props).colors.bg.separator};
`;
DuplicantsListContainer.displayName = "DuplicantsListContainer";
export default DuplicantsListContainer;
