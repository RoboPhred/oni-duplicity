import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps, GroupItem } from "./derived-state";

import { Intent } from "@/style";

import SaveStructureLink from "@/components/SaveStructureLink";
import DataTable, { DataTableColumn } from "@/components/DataTable";

import EditorContainer from "@/pages/SaveEditor/components/editors/components/EditorContainer";

type Props = StateProps;
class GameObjectGroupList extends React.Component<Props> {
  render() {
    const { gameObjectGroups } = this.props;

    const columns: DataTableColumn[] = [
      {
        header: "Game Object Type",
        id: "type",
        property: "name",
        cell: ({ rowData }: { rowData: GroupItem }) => (
          <SaveStructureLink intent={Intent.Primary} path={rowData.path}>
            {rowData.name}
          </SaveStructureLink>
        ),
        sortable: true,
        // sortMethod: (a: GroupItem, b: GroupItem) =>
        //   a.name.localeCompare(b.name) as any,
        filterable: true
      },
      {
        header: "Count",
        property: "count",
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
