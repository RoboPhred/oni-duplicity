import styled from "@/theme";

import { getTheme, text } from "@/theme";

const Input = styled.input`
  ${text};
  padding: 2px;
  background-color: ${props => getTheme(props).colors.bg.panel};
  border: ${props => getTheme(props).borders[1]};
  border-color: ${props => getTheme(props).colors.intent.secondary};
  &:focus {
    border-color: ${props => getTheme(props).colors.intent.primary};
    outline: none;
  }
  &:invalid {
    border-color: ${props => getTheme(props).colors.intent.dangerous};
  }
`;
Input.displayName = "Input";
export default Input;
