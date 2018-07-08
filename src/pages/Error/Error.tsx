import * as React from "react";

import Flex from "@/components/Flex";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Intent } from "@/theme";

export interface ErrorProps {
  error: Error;
  onDismiss(): void;
}

const Error: React.SFC<ErrorProps> = ({ error, onDismiss }) => (
  <Flex.Container direction="column" width="100%" height="100%">
    <Flex.Item grow>
      <Text intent={Intent.Dangerous}>
        <h2>Error</h2>
        <code>{error.stack || error.message || String(error)}</code>
      </Text>
    </Flex.Item>
    <Flex.Item>
      <Button intent={Intent.Primary} onClick={onDismiss}>
        Close
      </Button>
    </Flex.Item>
  </Flex.Container>
);
Error.displayName = "Error";
export default Error;
