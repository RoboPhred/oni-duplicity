import styled from "@/theme";
import { WidthProps, width } from "styled-system";

import ReactSelect, {
  Creatable as ReactSelectCreatable,
  ReactSelectProps,
  ReactCreatableSelectProps
} from "react-select";

import { TextProps, text } from "@/theme";
import { attachProps } from "@/utils";

export { Option } from "react-select";

export interface SelectCreatableProps
  extends ReactCreatableSelectProps,
    WidthProps,
    TextProps {}
const Creatable = styled<SelectCreatableProps>(ReactSelectCreatable)`
  ${text};
  ${width};
`;
Creatable.displayName = "Select.Creatable";

export interface SelectProps extends ReactSelectProps, WidthProps, TextProps {}
// TODO: We need to pass the generated className to the specific className structure
//  for the various sub-components of Select.
const Select = styled<SelectProps>(ReactSelect)`
  ${text};
  ${width};
`;
Select.displayName = "Select";
export default attachProps(Select, {
  Creatable
});
