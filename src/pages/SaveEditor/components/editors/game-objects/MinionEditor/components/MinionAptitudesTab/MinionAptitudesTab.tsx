import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme/theme";

import mapStateToProps, { StateProps, AptitudeData } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
import NumericInput from "@/components/NumericInput";
import Text from "@/components/Text";

type Props = StateProps & DispatchProps;
class MinionAptitudesTab extends React.Component<Props> {
  render() {
    const { aptitudes, setAptitude } = this.props;

    if (!aptitudes) {
      return "No Aptitude Data.";
    }

    if (aptitudes.length === 0) {
      return <Text intent={Intent.Dangerous}>No Role Groups Recognized.</Text>;
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
        )
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
