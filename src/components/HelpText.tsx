import * as React from "react";

import Text from "@/components/Text";
import { FontSize, Intent } from "@/style";

const HelpText: React.SFC = ({ children }) => (
  <Text.Div intent={Intent.Hint} fontSize={FontSize.Small}>
    {children}
  </Text.Div>
);
HelpText.displayName = "HelpText";
export default HelpText;
