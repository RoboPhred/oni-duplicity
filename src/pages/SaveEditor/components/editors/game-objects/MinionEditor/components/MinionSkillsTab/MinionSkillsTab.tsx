import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";

type Props = StateProps;
class MinionSkillsTab extends React.Component<Props> {
  render() {
    const { skills } = this.props;

    if (!skills) {
      return "No Skills Data.";
    }

    const columns: DataTableColumn[] = [
      {
        Header: "Skill",
        sortable: true,
        filterable: true,
        accessor: "attributeId"
      },
      {
        Header: "Level",
        sortable: true,
        filterable: false,
        accessor: "experience"
      },
      {
        Header: "Experience",
        sortable: true,
        filterable: false,
        accessor: "level"
      }
    ];

    return (
      <DataTable
        width="100%"
        height="100%"
        columns={columns}
        showPagination={false}
        data={skills}
      />
    );
  }
}
export default connect(mapStateToProps)(MinionSkillsTab);
