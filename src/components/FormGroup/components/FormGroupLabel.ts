import styled, { getTheme, text } from "@/theme";

import { TextProps } from "@/components/Text";

export type FormLabelProps = TextProps;
const FormGroupLabel = styled<FormLabelProps, "label">("label")`
  ${text};
  margin-right: ${props => getTheme(props).space[1]}px;
`;
FormGroupLabel.displayName = "FormGroupLabel";
export default FormGroupLabel;
