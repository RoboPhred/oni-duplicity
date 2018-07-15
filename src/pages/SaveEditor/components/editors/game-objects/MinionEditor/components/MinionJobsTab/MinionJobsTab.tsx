import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
import NumericInput from "@/components/NumericInput";
import CheckInput from "@/components/CheckInput";

type Props = StateProps & DispatchProps;
class MinionJobsTab extends React.Component<Props> {
  render() {
    const { jobs, setExperience, setMastery } = this.props;

    if (!jobs) {
      return "No Jobs Data.";
    }

    const columns: DataTableColumn[] = [
      {
        Header: "Job",
        sortable: true,
        filterable: true,
        accessor: "id"
      },
      {
        Header: "Experience",
        sortable: true,
        filterable: false,
        id: "experience",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof jobs[0]>) => (
          <NumericInput
            precision="single"
            minValue={0}
            value={row.value.experience}
            onCommit={setExperience.bind(null, row.value.experienceIndex)}
          />
        )
      },
      {
        Header: "Mastery",
        sortable: true,
        filterable: false,
        id: "mastery",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof jobs[0]>) => (
          <CheckInput
            value={row.value.mastery}
            onCommit={setMastery.bind(null, row.value.masteryIndex)}
          />
        )
      }
    ];

    return (
      <DataTable
        height="100%"
        columns={columns}
        showPagination={false}
        data={jobs}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionJobsTab);
