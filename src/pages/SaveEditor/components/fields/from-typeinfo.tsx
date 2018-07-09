import * as React from "react";

import { TypeInfo, SerializationTypeCode, getTypeCode } from "oni-save-parser";

import { Intent } from "@/theme";

import Text from "@/components/Text";
import SaveStructureLink from "@/components/SaveStructureLink";

import { EditorFieldProps } from "./connect-field";

import BooleanField from "./BooleanField";
import EnumerationField from "./EnumerationField";
import NumericField from "./NumericField";
import TextField from "./TextField";
import Vector2Field from "./Vector2Field";
import Vector2IField from "./Vector2IField";
import Vector3Field from "./Vector3Field";

export default function getFieldElementClass(
  typeInfo: TypeInfo
): React.ComponentType<EditorFieldProps> {
  const code = getTypeCode(typeInfo.info);
  switch (code) {
    case SerializationTypeCode.Array:
      return () => <Text intent={Intent.Dangerous}>TODO Array</Text>;
    case SerializationTypeCode.Boolean:
      return (props: EditorFieldProps) => <BooleanField {...props} />;
    case SerializationTypeCode.Byte:
      return (props: EditorFieldProps) => (
        <NumericField {...props} minValue={0} maxValue={0xff} />
      );
    case SerializationTypeCode.Colour:
      return () => <Text intent={Intent.Dangerous}>TODO Colour</Text>;
    case SerializationTypeCode.Dictionary:
      return () => <Text intent={Intent.Dangerous}>TODO Dictionary</Text>;
    case SerializationTypeCode.Double:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="double" />
      );
    case SerializationTypeCode.Enumeration:
      return (props: EditorFieldProps) => (
        <EnumerationField {...props} enumerationName={typeInfo.templateName!} />
      );
    case SerializationTypeCode.HashSet:
      return () => <Text intent={Intent.Dangerous}>TODO HashSet</Text>;
    case SerializationTypeCode.Int16:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="int16" />
      );
    case SerializationTypeCode.Int32:
      return (props: EditorFieldProps) => (
        <NumericField {...props} precision="int32" />
      );
    case SerializationTypeCode.Int64:
      return () => <Text intent={Intent.Dangerous}>TODO Int64</Text>;
    case SerializationTypeCode.List:
      return () => <Text intent={Intent.Dangerous}>TODO List</Text>;
    case SerializationTypeCode.Pair:
      return () => <Text intent={Intent.Dangerous}>TODO Pair</Text>;
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
      return () => <Text intent={Intent.Dangerous}>TODO UInt64</Text>;
    case SerializationTypeCode.UserDefined:
      return (props: EditorFieldProps) => (
        <SaveStructureLink intent={Intent.Primary} path={props.path}>
          [{typeInfo.templateName || "Edit"}]
        </SaveStructureLink>
      );
    case SerializationTypeCode.Vector2:
      return Vector2Field;
    case SerializationTypeCode.Vector2I:
      return Vector2IField;
    case SerializationTypeCode.Vector3:
      return Vector3Field;
    default:
      return handleUnknownType(code);
  }
}

function handleUnknownType(type: never): never {
  throw new Error(`Type code "${type}" is unknown.`);
}
