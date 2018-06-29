import * as React from "react";

import { Intent } from "@/theme";

import Text from "@/components/Text";

const Loading: React.SFC = () => <Text intent={Intent.Primary}>Loading</Text>;
Loading.displayName = "Loading";
export default Loading;
