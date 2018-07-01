import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import SaveStructureLink from "@/components/SaveStructureLink";

import DuplicantsListContainer from "./components/DuplicantsListContainer";
import DuplicantsListContent from "./components/DuplicantsListContent";
import DuplicantPortrait from "./components/DuplicantPortrait";

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
        <Text intent={Intent.Primary}>
          <SaveStructureLink path={duplicantsSetPath}>
            Duplicants
          </SaveStructureLink>
        </Text>
        <DuplicantsListContent>{duplicantPortraits}</DuplicantsListContent>
      </DuplicantsListContainer>
    );
  }
}
export default connect(mapStateToProps)(DuplicantsList);
