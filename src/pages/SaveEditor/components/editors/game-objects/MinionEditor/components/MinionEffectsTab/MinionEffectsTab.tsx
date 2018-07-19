import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";

type Props = StateProps;
class MinionEffectsTab extends React.Component<Props> {
  // TODO: Show ALL known effects in searchable table, checkbox for enabled.
  //  reveal timeRemaining input when enabled.
  render() {
    return <Text intent={Intent.Hint}>TODO effects</Text>;
  }
}
export default connect(mapStateToProps)(MinionEffectsTab);
