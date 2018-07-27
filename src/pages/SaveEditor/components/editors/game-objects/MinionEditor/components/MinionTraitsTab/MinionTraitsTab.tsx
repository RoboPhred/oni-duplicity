import * as React from "react";
import { connect } from "react-redux";

import { AI_TRAIT_IDS } from "oni-save-parser";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import Table from "@/components/Table";
import NonIdealState from "@/components/NonIdealState";
import CheckInput from "@/components/CheckInput";

type Props = StateProps & DispatchProps;
class MinionTraitsTab extends React.Component<Props> {
  render() {
    const { traits, onSetTrait } = this.props;

    if (traits == null || traits.length === 0) {
      return (
        <NonIdealState intent={Intent.Dangerous} header="No Data">
          No traits could be found on this duplicant.
        </NonIdealState>
      );
    }

    const rows = AI_TRAIT_IDS.filter(x => x !== "None").map(trait => (
      <Table.TR key={trait}>
        <Table.TD>
          <CheckInput
            value={traits.some(x => x === trait)}
            onCommit={onSetTrait.bind(null, trait)}
          />
        </Table.TD>
        <Table.TD>{trait}</Table.TD>
      </Table.TR>
    ));

    return (
      <Table>
        <Table.THead>
          <Table.TR>
            <Table.TH />
            <Table.TH>Trait</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>{rows}</Table.TBody>
      </Table>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionTraitsTab);
