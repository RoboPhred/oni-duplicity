import { Intent, Space, FontSize } from "@/theme";
import * as React from "react";

import Flex from "@/components/Flex";
import Box from "@/components/Box";
import Text from "@/components/Text";

export interface FormGroupProps {
  label: string;
  inline?: boolean;
  intent?: Intent;
}
type Props = FormGroupProps;
export default class FormGroup extends React.Component<Props> {
  render() {
    const { label, intent, inline, children } = this.props;

    return (
      <Flex direction={inline ? "row" : "column"} mb={Space.Small}>
        <Text.Label
          fontSize={inline ? FontSize.Default : FontSize.HeadingMinor}
          mr={inline ? Space.Small : Space.None}
          intent={intent}
        >
          {label}
        </Text.Label>
        <Box pl={inline ? Space.Small : Space.None}>{children}</Box>
      </Flex>
    );
  }
}
