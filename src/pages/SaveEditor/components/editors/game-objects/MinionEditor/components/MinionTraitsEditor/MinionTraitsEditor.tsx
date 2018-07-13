import * as React from "react";
import { connect } from "react-redux";

import { AI_TRAIT_IDS } from "oni-save-parser";

import mapStateToProps, { StateProps } from "./derived-state";

import SelectField from "@/pages/SaveEditor/components/fields/SelectField";
import { Option } from "@/components/Select";

import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/Components/DataTable";
import CheckInput from "@/components/CheckInput";
import Text from "@/components/Text";

type Props = StateProps;
class MinionTraitsEditor extends React.Component<Props> {
  render() {
    const { traitsDataPath } = this.props;
    if (!traitsDataPath) {
      return "No Klei.AI.Traits Behavior.";
    }

    // This looks terrible and is difficult to use.
    //  We should use a checkbox table that provides descriptions and effects.
    const options: Option[] = AI_TRAIT_IDS.map(x => ({
      label: x,
      value: x
    }));

    const traits = this.props.traits || [];
    const data = AI_TRAIT_IDS.map(trait => ({
      trait: trait,
      selected: traits.some(x => x === trait)
    }));

    const columns: DataTableColumn[] = [
      {
        id: "selected",
        Cell: (row: DataTableRow) => (
          <CheckInput
            value={traits.some(x => x === row.value.selected)}
            onCommit={this._onTraitChanged.bind(this, row.value.trait)}
          />
        ),
        accessor: x => x,
        sortable: false,
        filterable: false,
        resizable: false,
        width: 30
      },
      {
        Header: "Trait",
        id: "trait_name",
        Cell: (row: DataTableRow) => <Text>{row.value}</Text>,
        accessor: "trait",
        filterable: true
      }
    ];

    return (
      <SelectField
        multi
        joinValues={false}
        simpleValue={false}
        closeOnSelect={false}
        options={options}
        path={[...traitsDataPath, "TraitIds"]}
      />
    );

    // return (
    //   <DataTable
    //     style={{ width: "100%", height: "100%" }}
    //     data={data}
    //     columns={columns}
    //     showFilters
    //     showPagination={false}
    //   />
    // );
  }

  private _onTraitChanged(trait: string, isPresent: boolean) {}
}
export default connect(mapStateToProps)(MinionTraitsEditor);
