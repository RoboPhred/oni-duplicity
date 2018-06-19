import * as React from "react";

export interface ObjectEditorProps {
  value: any;
}

type Props = ObjectEditorProps;
export default class ObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { value } = this.props;
    return (
      <div>
        <pre>
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      </div>
    );
  }
}
