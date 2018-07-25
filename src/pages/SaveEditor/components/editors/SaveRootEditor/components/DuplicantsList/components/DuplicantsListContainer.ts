import styled, { Space } from "@/style";

import { getTheme } from "@/style";

const DuplicantsListContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: ${props => getTheme(props).space[Space.Small]}px;
  border: ${props => getTheme(props).borders[2]};
  border-color: ${props => getTheme(props).colors.bg.separator};
`;
DuplicantsListContainer.displayName = "DuplicantsListContainer";
export default DuplicantsListContainer;
