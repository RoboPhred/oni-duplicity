import * as React from "react";
import { FontSizeProps } from "styled-system";

import { Intent, Space, FontSize } from "@/theme";

import Flex from "@/components/Flex";
import Box from "@/components/Box";
import Text from "@/components/Text";

export interface FormGroupProps extends FontSizeProps {
  label: string;
  inline?: boolean;
  intent?: Intent;
}
type Props = FormGroupProps;
export default class FormGroup extends React.Component<Props> {
  render() {
    const { label, intent, inline, children, fontSize } = this.props;

    return (
      <Flex direction={inline ? "row" : "column"} mb={Space.Small}>
        <Text.Label
          alignSelf="baseline"
          fontSize={fontSize != null ? fontSize : FontSize.HeadingMinor}
          mr={inline ? Space.Small : Space.None}
          intent={intent}
        >
          {label}
        </Text.Label>
        <Box alignSelf="baseline" px={inline ? Space.None : Space.Medium}>
          {children}
        </Box>
      </Flex>
    );
  }
}
