import * as React from "react";

import "typeface-roboto";
import "./style.css";

import SaveStatus from "@/components/SaveStatus";
import LoadButton from "@/components/LoadButton";

class App extends React.Component {
  render() {
    return (
      <div>
        <SaveStatus />
        <LoadButton />
      </div>
    );
  }
}

export default App;
