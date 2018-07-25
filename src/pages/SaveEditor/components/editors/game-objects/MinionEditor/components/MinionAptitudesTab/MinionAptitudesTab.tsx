import * as React from "react";
import { connect } from "react-redux";

import { compare } from "@/math";
import { Intent } from "@/style";

import mapStateToProps, { StateProps, AptitudeData } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
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
        Header: "Role",
        sortable: true,
        filterable: true,
        accessor: "roleId"
      },
      {
        Header: "Aptitude",
        sortable: true,
        filterable: false,
        id: "aptitude",
        accessor: x => x,
        Cell: (row: DataTableRow<AptitudeData>) => (
          <NumericInput
            precision="single"
            minValue={0}
            value={row.value.aptitude}
            onCommit={setAptitude.bind(null, row.value.index)}
          />
        ),
        sortMethod: (a: AptitudeData, b: AptitudeData) =>
          compare(a.aptitude, b.aptitude)
      }
    ];

    return (
      <DataTable
        height="100%"
        columns={columns}
        showPagination={false}
        data={aptitudes}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionAptitudesTab);
