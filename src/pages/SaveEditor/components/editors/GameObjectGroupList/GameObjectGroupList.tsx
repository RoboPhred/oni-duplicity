import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import { Intent } from "@/theme";

import Text from "@/components/Text";
import Portrait from "@/components/Portrait";
import SaveStructureLink from "@/components/SaveStructureLink";

import EditorContainer from "@/pages/SaveEditor/components/editors/components/EditorContainer";
import EditorHeader from "@/pages/SaveEditor/components/editors/components/EditorHeader";

import GameObjectGroupListContent from "./components/GameObjectGroupListContent";

type Props = StateProps;
class GameObjectGroupList extends React.Component<Props> {
  render() {
    const { gameObjectGroups } = this.props;
    const portraits = gameObjectGroups.map(x => (
      <Portrait key={x.name}>
        <Portrait.Header wordBreak="break-all">
          <SaveStructureLink intent={Intent.Primary} path={x.path}>
            {x.name}
          </SaveStructureLink>
        </Portrait.Header>
        <Portrait.Footer>
          <Text intent={Intent.Secondary}>{x.count} items</Text>
        </Portrait.Footer>
      </Portrait>
    ));
    return (
      <EditorContainer>
        <EditorHeader>GameObject Types</EditorHeader>
        <GameObjectGroupListContent>{portraits}</GameObjectGroupListContent>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(GameObjectGroupList);
