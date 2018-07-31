import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import { GameObjectListProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";

import Portrait from "@/components/Portrait";
import SaveStructureLink from "@/components/SaveStructureLink";
import GameObjectListContent from "./components/GameObjectListContent";

import EditorContainer from "@/pages/SaveEditor/components/editors/components/EditorContainer";

type Props = GameObjectListProps & StateProps;
class GameObjectList extends React.Component<Props> {
  render() {
    const { gameObjectItems } = this.props;
    const portraits = gameObjectItems.map(x => (
      <Portrait key={x.name}>
        <Portrait.Header wordBreak="break-all">
          <SaveStructureLink intent={Intent.Primary} path={x.path}>
            {x.name}
          </SaveStructureLink>
        </Portrait.Header>
      </Portrait>
    ));
    return (
      <EditorContainer header="GameObjects">
        <GameObjectListContent>{portraits}</GameObjectListContent>
      </EditorContainer>
    );
  }
}
export default connect(mapStateToProps)(GameObjectList);
