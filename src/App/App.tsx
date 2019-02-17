import * as React from "react";

import AbstractSaveStatus from "@/services/oni-save/components/AbstractSaveStatus";
import AbstractLoadButton from "@/services/oni-save/components/AbstractLoadButton";

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          Status:{" "}
          <AbstractSaveStatus>
            {({ loadingStatus }) => loadingStatus}
          </AbstractSaveStatus>
        </div>
        <AbstractLoadButton>
          {({ disabled, onClick }) => (
            <button disabled={disabled} onClick={onClick}>
              Load
            </button>
          )}
        </AbstractLoadButton>
      </div>
    );
  }
}

export default App;
