import * as React from "react";
import { IntentCssProps, Border, Radii } from "@/theme";

import Box from "@/components/Box";
import Text from "@/components/Text";

export interface NonIdealStatProps extends IntentCssProps {
  header?: React.ReactNode;
}
const NonIdealState: React.SFC<NonIdealStatProps> = ({
  intent,
  header,
  children
}) => (
  <Box width="100%" height="100%">
    <Box
      border={Border.Thick}
      borderColor={intent}
      borderRadius={Radii.Medium}
      m="auto"
    >
      {header && <Text.H4>{header}</Text.H4>}
      {children}
    </Box>
  </Box>
);
NonIdealState.displayName = "NonIdealState";
export default NonIdealState;
