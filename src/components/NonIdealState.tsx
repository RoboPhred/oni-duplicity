import * as React from "react";
import { IntentProps, Border, Radius, Intent, Space, Color } from "@/style";

import Box from "@/components/Box";
import Text from "@/components/Text";

export interface NonIdealStatProps extends IntentProps {
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
      intent={intent}
      border={Border.Thick}
      borderRadius={Radius.Medium}
      borderColor={Color.HintIntent}
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
