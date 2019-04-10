import * as React from "react";

import { Trans } from "react-i18next";

export interface LoadButtonProps {
  disabled: boolean;
  onLoadSave(file: File): void;
}

type Props = LoadButtonProps;
const LoadButton: React.SFC<Props> = ({ disabled, onLoadSave }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, [inputRef]);

  const onFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0];

      onLoadSave(file);
    },
    [onLoadSave]
  );

  return (
    <button disabled={disabled} onClick={onClick}>
      <Trans i18nKey="save-file.verbs.load_titlecase">Load</Trans>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept=".sav"
        onChange={onFileChange}
      />
    </button>
  );
};

export default LoadButton;
