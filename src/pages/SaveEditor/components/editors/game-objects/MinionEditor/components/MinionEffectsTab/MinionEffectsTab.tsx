import * as React from "react";
import { connect } from "react-redux";

import { AI_EFFECT_IDS } from "oni-save-parser";

import { compare } from "@/math";
import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
import NullableInput from "@/components/NullableInput";
import NumericInput from "@/components/NumericInput";

type Props = StateProps & DispatchProps;
class MinionEffectsTab extends React.Component<Props> {
  render() {
    const { effects, onSetEffectData } = this.props;

    if (!effects) {
      return (
        <NonIdealState intent={Intent.Dangerous} header="No Data">
          No effects data could be found on this duplicant.
        </NonIdealState>
      );
    }

    const data = AI_EFFECT_IDS.map(effectId => {
      const effectIndex = effects.findIndex(x => x.id === effectId);
      const effect = effectIndex > -1 ? effects[effectIndex] : null;
      return {
        effectId,
        effectIndex,
        timeRemaining: effect ? effect.timeRemaining : null
      };
    });

    const columns: DataTableColumn[] = [
      {
        Header: "Effect",
        sortable: true,
        filterable: true,
        accessor: "effectId"
      },
      {
        Header: "Time Remaining",
        sortable: true,
        filterable: false,
        id: "level",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof data[0]>) => (
          <NullableInput
            value={row.value.timeRemaining}
            onCommit={onSetEffectData.bind(
              null,
              row.value.effectId,
              row.value.effectIndex
            )}
            defaultValue={15000}
            renderInput={props => (
              <NumericInput precision="single" minValue={0} {...props} />
            )}
          />
        ),
        sortMethod: (a: typeof data[0], b: typeof data[0]) =>
          compare(a.timeRemaining || 0, b.timeRemaining || 0)
      }
    ];

    return <DataTable height="100%" columns={columns} data={data} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionEffectsTab);
