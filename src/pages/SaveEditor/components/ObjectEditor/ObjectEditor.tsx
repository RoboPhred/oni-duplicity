import * as React from "react";

export interface ObjectEditorProps {
  path: string[];
  value: any;
}

type Props = ObjectEditorProps;
export default class ObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { path, value } = this.props;
    return (
      <div>
        <h3>{path.join(".")}</h3>
        <pre>
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      </div>
    );
  }
}
