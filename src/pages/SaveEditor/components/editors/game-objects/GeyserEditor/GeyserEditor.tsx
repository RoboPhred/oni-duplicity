import * as React from "react";

import EditorContainer from "../../components/EditorContainer";

import GameObjectHeader from "../components/GameObjectHeader";

export default class GeyserEditor extends React.Component {
  render() {
    return (
      <EditorContainer
        header={<GameObjectHeader>Header goes here</GameObjectHeader>}
      >
        Test test
      </EditorContainer>
    );
  }
}
