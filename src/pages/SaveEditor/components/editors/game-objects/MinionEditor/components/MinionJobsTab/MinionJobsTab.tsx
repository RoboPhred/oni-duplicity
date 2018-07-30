import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, { DataTableColumn } from "@/components/DataTable";
import NumericInput from "@/components/NumericInput";
import CheckInput from "@/components/CheckInput";

type Props = StateProps & DispatchProps;
class MinionJobsTab extends React.Component<Props> {
  render() {
    const { jobs, setExperience, setMastery } = this.props;

    if (!jobs || jobs.length === 0) {
      return (
        <NonIdealState intent={Intent.Dangerous} header="No Data">
          No jobs could be found on this duplicant.
        </NonIdealState>
      );
    }

    const columns: DataTableColumn[] = [
      {
        header: "Job",
        property: "id",
        sortable: true,
        filterable: true
      },
      {
        header: "Experience",
        sortable: true,
        filterable: false,
        property: "experience",
        cell: ({ value, rowData }) => (
          <NumericInput
            precision="single"
            minValue={0}
            value={value}
            onCommit={setExperience.bind(null, rowData.experienceIndex)}
          />
        )
      },
      {
        header: "Mastery",
        sortable: true,
        filterable: false,
        property: "mastery",
        cell: ({ value, rowData }) => (
          <CheckInput
            value={value}
            onCommit={setMastery.bind(null, rowData.masteryIndex)}
          />
        )
      }
    ];

    return <DataTable columns={columns} data={jobs} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionJobsTab);
