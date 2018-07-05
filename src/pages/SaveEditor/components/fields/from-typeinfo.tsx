import * as React from "react";

import { TypeInfo, SerializationTypeCode, getTypeCode } from "oni-save-parser";

import { Intent } from "@/theme";

import Text from "@/components/Text";

import { EditorFieldProps } from "./connect-field";

import BooleanField from "./BooleanField";
import NumericField from "./NumericField";
import TextField from "./TextField";

export default function getFieldElementClass(
  typeInfo: TypeInfo
): React.ComponentType<EditorFieldProps> {
  const code = getTypeCode(typeInfo.info);
  switch (code) {
    case SerializationTypeCode.Array:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Boolean:
      return (props: EditorFieldProps) => <BooleanField {...props} />;
    case SerializationTypeCode.Byte:
      return (props: EditorFieldProps) => (
        <NumericField {...props} minValue={0} maxValue={0xff} />
      );
    case SerializationTypeCode.Colour:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Dictionary:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Double:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="double" />
      );
    case SerializationTypeCode.Enumeration:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.HashSet:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Int16:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="int16" />
      );
    case SerializationTypeCode.Int32:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="int32" />
      );
    case SerializationTypeCode.Int64:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.List:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Pair:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.SByte:
      return (props: EditorFieldProps) => (
        <NumericField {...props} minValue={-128} maxValue={127} />
      );
    case SerializationTypeCode.Single:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="single" />
      );
    case SerializationTypeCode.String:
      return (props: EditorFieldProps) => <TextField {...props} />;
    case SerializationTypeCode.UInt16:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="uint16" />
      );
    case SerializationTypeCode.UInt32:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="uint32" />
      );
    case SerializationTypeCode.UInt64:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.UserDefined:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Vector2:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Vector2I:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    case SerializationTypeCode.Vector3:
      return () => <Text intent={Intent.Dangerous}>TODO {code}</Text>;
    default:
      return handleUnknownType(code);
  }
}

function handleUnknownType(type: never): never {
  throw new Error(`Type code "${type}" is unknown.`);
}
