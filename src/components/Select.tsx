import styled from "styled-components";
import { WidthProps, width } from "styled-system";

import ReactSelect, { ReactSelectProps } from "react-select";

import { TextProps, text } from "@/theme";

export interface SelectProps extends ReactSelectProps, WidthProps, TextProps {}
export { Option } from "react-select";

const Select = styled<SelectProps>(ReactSelect)`
  ${text};
  ${width};
`;
Select.displayName = "Select";
export default Select;
