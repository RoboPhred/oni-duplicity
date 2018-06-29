import * as React from "react";

import { Intent } from "@/theme";

import Text from "@/components/Text";

const NoSave: React.SFC = () => (
  <Text intent={Intent.Hint}>
    Load a save using the controls on the upper left.
  </Text>
);
NoSave.displayName = "NoSave";
export default NoSave;
