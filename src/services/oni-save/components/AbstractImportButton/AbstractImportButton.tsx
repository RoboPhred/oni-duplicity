import * as React from "react";
import { connect } from "react-redux";

import { AbstractImportButtonProps } from "./props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractImportButtonProps & DispatchProps;
const AbstractImportButton: React.SFC<Props> = ({
  onImport,
  onComplete,
  children
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Click handler for parent button.
  //  Opens the choose file dialog.
  const onClick = React.useCallback(
    () => inputRef.current && inputRef.current.click(),
    [inputRef]
  );

  // Change event for file input.
  //  Takes the selected file and processes it for import.
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    onImport(file);
    onComplete();
  };

  return (
    <React.Fragment>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept=".json"
        onChange={onFileChange}
      />
      {React.Children.only(children({ onClick }))}
    </React.Fragment>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(AbstractImportButton);
