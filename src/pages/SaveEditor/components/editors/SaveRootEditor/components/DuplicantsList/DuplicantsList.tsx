import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";

import SaveStructureLink from "@/components/SaveStructureLink";

import DuplicantPortrait from "./components/DuplicantPortrait";
import DuplicantsListContainer from "./components/DuplicantsListContainer";
import DuplicantsListContent from "./components/DuplicantsListContent";

type Props = StateProps;
class DuplicantsList extends React.Component<Props> {
  render() {
    const { duplicantsSetPath, duplicantIndexes } = this.props;
    if (!duplicantsSetPath || !duplicantIndexes) {
      return "Malformed Data";
    }

    const duplicantPortraits = duplicantIndexes.map(x => (
      <DuplicantPortrait key={x} gameObjectIndex={x} />
    ));

    return (
      <DuplicantsListContainer>
        <SaveStructureLink intent={Intent.Primary} path={duplicantsSetPath}>
          Duplicants
        </SaveStructureLink>
        <DuplicantsListContent>{duplicantPortraits}</DuplicantsListContent>
      </DuplicantsListContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantsList);
