import * as React from "react";
import { connect } from "react-redux";

import { Intent, Space } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import Box from "@/components/Box";

type Props = StateProps;
const Loading: React.SFC<Props> = ({
  loadingState,
  loadingProgressMessageSelector
}) => (
  <Box p={Space.Large}>
    <Text intent={Intent.Primary}>
      {loadingState === "loading" ? "Loading" : "Saving"}
    </Text>
    <br />
    <Text intent={Intent.Secondary}>{loadingProgressMessageSelector}</Text>
  </Box>
);
Loading.displayName = "Loading";
export default connect(mapStateToProps)(Loading);
