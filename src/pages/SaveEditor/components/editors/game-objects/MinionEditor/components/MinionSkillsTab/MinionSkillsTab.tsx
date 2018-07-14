import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
import NumericInput from "@/components/NumericInput";

type Props = StateProps & DispatchProps;
class MinionSkillsTab extends React.Component<Props> {
  render() {
    const { skills, setSkillLevel, setSkillExperience } = this.props;

    if (!skills) {
      return "No Skills Data.";
    }

    const data = skills.map((x, i) => ({
      ...x,
      index: i
    }));

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
        id: "level",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof data[0]>) => (
          <NumericInput
            precision="int32"
            minValue={0}
            value={row.value.level}
            onCommit={setSkillLevel.bind(null, row.value.index)}
          />
        )
      },
      {
        Header: "Experience",
        sortable: true,
        filterable: false,
        id: "experience",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof data[0]>) => (
          <NumericInput
            precision="single"
            value={row.value.experience}
            onCommit={setSkillExperience.bind(null, row.value.index)}
          />
        )
      }
    ];

    return (
      <DataTable
        height="100%"
        columns={columns}
        showPagination={false}
        data={data}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionSkillsTab);
