import * as React from "react";
import { FontSizeProps } from "styled-system";

import { Intent, Space } from "@/style";

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
    const { label, intent, inline, fontSize } = this.props;

    let children = this.props.children;

    return (
      <Flex direction={inline ? "row" : "column"} mb={Space.Small}>
        <Text.Label
          alignSelf="baseline"
          fontSize={fontSize}
          mr={inline ? Space.Small : Space.None}
          intent={intent}
        >
          {label}
        </Text.Label>
        <Box
          width="100%"
          alignSelf="baseline"
          px={inline ? Space.None : Space.Medium}
        >
          {children}
        </Box>
      </Flex>
    );
  }
}
