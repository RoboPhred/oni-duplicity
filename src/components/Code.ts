import styled, { border, Border, Intent, Radii } from "@/theme";

const Code = styled.code`
  ${border.of(Border.Normal, Intent.Hint, Radii.Small)};
  margin: 0 4px;
  padding: 1px 2px;
  box-sizing: border-box;
  font-family: monospace;
`;
Code.displayName = "Code";
export default Code;
