import * as React from "react";
import { connect } from "react-redux";

import { AI_TRAIT_IDS } from "oni-save-parser";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import Table from "@/components/Table";
import NonIdealState from "@/components/NonIdealState";
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

    // const data = AI_TRAIT_IDS.map(trait => ({
    //   trait: trait,
    //   selected: traits.some(x => x === trait)
    // }));

    // const columns: DataTableColumn[] = [
    //   {
    //     Header: "Has Trait",
    //     id: "selected",
    //     Cell: (row: DataTableRow<typeof data[0]>) => (
    //       <Flex
    //         direction="row"
    //         width="100%"
    //         height="100%"
    //         justifyContent="center"
    //       >
    //         <CheckInput
    //           value={row.value.selected}
    //           onCommit={onSetTrait.bind(null, row.value.trait)}
    //         />
    //       </Flex>
    //     ),
    //     accessor: x => x,
    //     resizable: false,
    //     width: 70,
    //     sortable: true,
    //     sortMethod: (a: typeof data[0], b: typeof data[0]) =>
    //       a.selected != b.selected ? (a.selected ? -1 : 1) : 0
    //   },
    //   {
    //     Header: "Trait",
    //     id: "trait_name",
    //     Cell: (row: DataTableRow) => <Text>{row.value}</Text>,
    //     accessor: "trait",
    //     filterable: true,
    //     sortable: true
    //   }
    // ];

    // return (
    //   <DataTable
    //     height="100%"
    //     data={data}
    //     columns={columns}
    //     showFilters
    //     showPagination={false}
    //   />
    // );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionTraitsTab);
