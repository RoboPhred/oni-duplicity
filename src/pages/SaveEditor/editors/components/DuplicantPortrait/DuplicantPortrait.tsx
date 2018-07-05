import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import { DuplicantPortraitProps } from "./props";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import SaveStructureLink from "@/components/SaveStructureLink";

import DuplicantPortraitContainer from "./components/DuplicantPortraitContainer";

const H4 = Text.withComponent("h4");
const DivText = Text.withComponent("div");

type Props = DuplicantPortraitProps & StateProps;
class DuplicantPortrait extends React.Component<Props> {
  render() {
    const { path, name, gender, arrivalCycle } = this.props;
    return (
      <DuplicantPortraitContainer>
        <H4 intent={Intent.Primary}>
          {path ? (
            <SaveStructureLink path={path}>{name}</SaveStructureLink>
          ) : (
            "Invalid Object"
          )}
        </H4>
        <DivText intent={Intent.Secondary}>{gender}</DivText>
        <DivText intent={Intent.Secondary}>{arrivalCycle} cycles old</DivText>
      </DuplicantPortraitContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantPortrait);
