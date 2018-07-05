import * as React from "react";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

import EditableText, { EditableTextProps } from "@/components/EditableText";

export type ItemEditableTextProps = EditableTextProps & EditorFieldProps;

type Props = ItemEditableTextProps & InjectedProps;
class ItemEditableText extends React.Component<Props> {
  render() {
    const { intent, value, onChange } = this.props;
    return <EditableText intent={intent} value={value} onChange={onChange} />;
  }
}
export default connectEditorField()(ItemEditableText);
