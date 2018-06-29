import * as React from "react";

import Text from "./Text";
import { Intent } from "@/theme";

export interface InfoTextProps {
  value: any;
  pluralize?: boolean;
}

const InfoText: React.SFC<InfoTextProps> = ({ value, children }) => (
  <div>
    <Text intent={Intent.Secondary}>{value}</Text> <Text>{children}</Text>
  </div>
);
export default InfoText;
