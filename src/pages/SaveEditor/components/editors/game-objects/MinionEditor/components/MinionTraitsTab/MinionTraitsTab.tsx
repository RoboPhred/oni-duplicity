import * as React from "react";
import { connect } from "react-redux";

import { AI_TRAIT_IDS } from "oni-save-parser";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
import CheckInput from "@/components/CheckInput";
import Text from "@/components/Text";
import Flex from "@/components/Flex";

type Props = StateProps & DispatchProps;
class MinionTraitsTab extends React.Component<Props> {
  render() {
    const { traits, onSetTrait } = this.props;

    if (traits == null) {
      return "No Trait Data";
    }

    const data = AI_TRAIT_IDS.map(trait => ({
      trait: trait,
      selected: traits.some(x => x === trait)
    }));

    const columns: DataTableColumn[] = [
      {
        Header: "Has Trait",
        id: "selected",
        Cell: (row: DataTableRow<typeof data[0]>) => (
          <Flex
            direction="row"
            width="100%"
            height="100%"
            justifyContent="center"
          >
            <CheckInput
              value={row.value.selected}
              onCommit={onSetTrait.bind(null, row.value.trait)}
            />
          </Flex>
        ),
        accessor: x => x,
        resizable: false,
        width: 70
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
      <DataTable
        data={data}
        columns={columns}
        showFilters
        showPagination={false}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionTraitsTab);
