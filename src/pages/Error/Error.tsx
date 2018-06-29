import * as React from "react";

import Flex from "@/components/Flex";

export interface ErrorProps {
  error: Error;
  onDismiss(): void;
}

const Error: React.SFC<ErrorProps> = ({ error, onDismiss }) => (
  <Flex.Container direction="column" width="100%" height="100%">
    <Flex.Item grow>
      <h2>Error</h2>
      <code>{error.stack || error.message || String(error)}</code>
    </Flex.Item>
    <Flex.Item>
      <button onClick={onDismiss}>Close</button>
    </Flex.Item>
  </Flex.Container>
);
Error.displayName = "Error";
export default Error;
