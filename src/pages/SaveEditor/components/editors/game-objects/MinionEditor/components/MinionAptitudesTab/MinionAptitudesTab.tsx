import * as React from "react";
import { connect } from "react-redux";

import { compare } from "@/math";
import { Intent } from "@/style";

import mapStateToProps, { StateProps, AptitudeData } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, { DataTableColumn } from "@/components/DataTable";
import NumericInput from "@/components/NumericInput";

type Props = StateProps & DispatchProps;
class MinionAptitudesTab extends React.Component<Props> {
  render() {
    const { aptitudes, setAptitude } = this.props;

    if (!aptitudes || aptitudes.length === 0) {
      return (
        <NonIdealState intent={Intent.Dangerous} header="No Data">
          No aptitude data could be found on this duplicant.
        </NonIdealState>
      );
    }

    const columns: DataTableColumn[] = [
      {
        header: "Role",
        sortable: true,
        filterable: true,
        property: "roleId"
      },
      {
        header: "Aptitude",
        sortable: true,
        filterable: false,
        property: "aptitude",
        cell: ({ value, rowData }) => (
          <NumericInput
            precision="single"
            minValue={0}
            value={value}
            onCommit={setAptitude.bind(null, rowData.index)}
          />
        ),
        sortMethod: (data, column, sortAscending) => {
          return data.sort((a, b) => compare(a, b, sortAscending));
        }
      }
    ];

    return <DataTable columns={columns} data={aptitudes} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionAptitudesTab);
