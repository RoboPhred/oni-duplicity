import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import NonIdealState from "@/components/NonIdealState";
import DataTable, { DataTableColumn } from "@/components/DataTable";
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
        header: "Skill",
        property: "attributeId"
      },
      {
        header: "Level",
        property: "level",
        cell: ({ value, rowData }) => (
          <NumericInput
            precision="int32"
            minValue={0}
            value={value}
            onCommit={setSkillLevel.bind(null, rowData.index)}
          />
        )
      },
      {
        header: "Experience",
        property: "experience",
        cell: ({ value, rowData }) => (
          <NumericInput
            precision="single"
            value={value}
            onCommit={setSkillExperience.bind(null, rowData.index)}
          />
        )
      }
    ];

    return <DataTable columns={columns} data={data} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionSkillsTab);
