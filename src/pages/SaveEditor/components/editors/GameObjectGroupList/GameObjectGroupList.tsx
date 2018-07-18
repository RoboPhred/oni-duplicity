import * as React from "react";
import { connect } from "react-redux";

import { Filter } from "react-table";

import mapStateToProps, { StateProps, GroupItem } from "./derived-state";

import { Intent } from "@/theme";

import SaveStructureLink from "@/components/SaveStructureLink";
import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";

import EditorContainer from "@/pages/SaveEditor/components/editors/components/EditorContainer";

type Props = StateProps;
class GameObjectGroupList extends React.Component<Props> {
  render() {
    const { gameObjectGroups } = this.props;

    const columns: DataTableColumn[] = [
      {
        Header: "Game Object Type",
        id: "type",
        accessor: x => x,
        Cell: (row: DataTableRow<GroupItem>) => (
          <SaveStructureLink intent={Intent.Primary} path={row.value.path}>
            {row.value.name}
          </SaveStructureLink>
        ),
        sortable: true,
        sortMethod: (a: GroupItem, b: GroupItem) =>
          a.name.localeCompare(b.name) as any,
        filterable: true,
        // This api is atrocious.
        filterMethod: (filter: Filter, row: any) =>
          (row.type.name as string)
            .toLowerCase()
            .includes((filter.value || "").toLowerCase())
      },
      {
        Header: "Count",
        accessor: "count",
        sortable: true
      }
    ];
    return (
      <EditorContainer header="GameObject Types">
        <DataTable columns={columns} data={gameObjectGroups} />
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(GameObjectGroupList);
