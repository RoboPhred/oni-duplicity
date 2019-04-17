import * as React from "react";

export interface AbstractLoadButtonProps {
  disabled: boolean;
  onLoadSave(file: File): void;
  children(props: AbstractLoadButtonRenderProps): React.ReactChild;
}
export interface AbstractLoadButtonRenderProps {
  disabled: boolean;
  onClick(): void;
}

type Props = AbstractLoadButtonProps;
const AbstractLoadButton: React.FC<Props> = ({
  disabled,
  onLoadSave,
  children
}) => {
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
    <>
      {children({ disabled, onClick })}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept=".sav"
        onChange={onFileChange}
      />
    </>
  );
};

export default AbstractLoadButton;
