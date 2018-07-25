import * as React from "react";
import { IntentCssProps, Border, Radii, Intent, Space } from "@/style";

import Box from "@/components/Box";
import Text from "@/components/Text";

export interface NonIdealStatProps extends IntentCssProps {
  header?: React.ReactNode;
}

const Header = Text.H4.extend`
  margin-top: 0;
  width: auto;
`;
Header.displayName = "Header";
const NonIdealState: React.SFC<NonIdealStatProps> = ({
  intent,
  header,
  children
}) => (
  <Box width="100%" height="100%">
    <Box
      width="75%"
      border={Border.Thick}
      borderColor={intent}
      borderRadius={Radii.Medium}
      intent={intent}
      p={Space.Medium}
      mx="auto"
      mt={Space.Large}
    >
      {header && (
        <Header
          intent={
            intent === Intent.Default || intent === Intent.Hint
              ? Intent.Primary
              : intent
          }
        >
          {header}
        </Header>
      )}
      {children}
    </Box>
  </Box>
);
NonIdealState.displayName = "NonIdealState";
export default NonIdealState;
