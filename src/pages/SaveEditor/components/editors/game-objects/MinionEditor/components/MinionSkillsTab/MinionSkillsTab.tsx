import * as React from "react";
import { connect } from "react-redux";

import { compare } from "@/math";
import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, {
  DataTableColumn,
  DataTableRow
} from "@/components/DataTable";
import NumericInput from "@/components/NumericInput";

type Props = StateProps & DispatchProps;
class MinionSkillsTab extends React.Component<Props> {
  render() {
    const { skills, setSkillLevel, setSkillExperience } = this.props;

    if (!skills || skills.length === 0) {
      return (
        <NonIdealState intent={Intent.Dangerous} header="No Data">
          No skills could be found on this duplicant.
        </NonIdealState>
      );
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
        id: "level",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof data[0]>) => (
          <NumericInput
            precision="int32"
            minValue={0}
            value={row.value.level}
            onCommit={setSkillLevel.bind(null, row.value.index)}
          />
        ),
        sortable: true,
        sortMethod: (a: typeof data[0], b: typeof data[0]) =>
          compare(a.level, b.level)
      },
      {
        Header: "Experience",
        id: "experience",
        accessor: x => x,
        Cell: (row: DataTableRow<typeof data[0]>) => (
          <NumericInput
            precision="single"
            value={row.value.experience}
            onCommit={setSkillExperience.bind(null, row.value.index)}
          />
        ),
        sortable: true,
        sortMethod: (a: typeof data[0], b: typeof data[0]) =>
          compare(a.experience, b.experience)
      }
    ];

    return <DataTable height="100%" columns={columns} data={data} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionSkillsTab);
