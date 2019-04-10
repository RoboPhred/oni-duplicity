import * as React from "react";

export interface LoadExampleButtonProps {
  onLoadExampleSave(): void;
}
type Props = LoadExampleButtonProps;
const LoadExampleButton: React.SFC<Props> = ({ onLoadExampleSave }) => (
  <button onClick={onLoadExampleSave}>Load Example</button>
);

export default LoadExampleButton;
