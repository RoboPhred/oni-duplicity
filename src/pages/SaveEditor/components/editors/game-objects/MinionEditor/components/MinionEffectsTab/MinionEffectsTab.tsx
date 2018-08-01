import * as React from "react";
import { connect } from "react-redux";

import { AI_EFFECT_IDS } from "oni-save-parser";

import { compare } from "@/math";
import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, { DataTableColumn } from "@/components/DataTable";
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
        header: "Effect",
        sortable: true,
        filterable: true,
        property: "effectId"
      },
      {
        header: "Time Remaining",
        sortable: true,
        filterable: false,
        property: "timeRemaining",
        cell: ({ rowData }: { rowData: typeof data[0] }) => (
          <NullableInput
            value={rowData.timeRemaining}
            onCommit={onSetEffectData.bind(
              null,
              rowData.effectId,
              rowData.effectIndex
            )}
            defaultValue={15000}
            renderInput={props => (
              <NumericInput precision="single" minValue={0} {...props} />
            )}
          />
        ),
        sortMethod: (data, column, sortAscending) => {
          return data.sort((a, b) => compare(a, b, sortAscending));
        }
      }
    ];

    return <DataTable columns={columns} data={data} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionEffectsTab);
