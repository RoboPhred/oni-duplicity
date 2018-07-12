import styled, { Intent } from "@/theme";
import * as React from "react";

import { getTheme } from "@/theme";

import FormGroupLabel from "./components/FormGroupLabel";
import FormGroupContent from "./components/FormGroupContent";

const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: ${props => getTheme(props).space[1]}px;
`;
FormGroupContainer.displayName = "FormGroupContainer";

export interface FormGroupProps {
  label: string;
  intent?: Intent;
}
type Props = FormGroupProps;
export default class FormGroup extends React.Component<Props> {
  render() {
    const { label, intent, children } = this.props;

    return (
      <FormGroupContainer>
        <FormGroupLabel intent={intent}>{label}</FormGroupLabel>
        <FormGroupContent>{children}</FormGroupContent>
      </FormGroupContainer>
    );
  }
}
