// import { TypeInfo, SerializationTypeCode, getTypeCode } from "oni-save-parser";

// export function getFieldElementClass(typeInfo: TypeInfo): React.ComponentClass {
//   const code = getTypeCode(typeInfo.info);
//   switch (code) {
//     case SerializationTypeCode.Array:
//     case SerializationTypeCode.Boolean:
//     case SerializationTypeCode.Byte:
//     case SerializationTypeCode.Colour:
//     case SerializationTypeCode.Dictionary:
//     case SerializationTypeCode.Double:
//     case SerializationTypeCode.Enumeration:
//     case SerializationTypeCode.HashSet:
//     case SerializationTypeCode.Int16:
//     case SerializationTypeCode.Int32:
//     case SerializationTypeCode.Int64:
//     case SerializationTypeCode.List:
//     case SerializationTypeCode.Pair:
//     case SerializationTypeCode.SByte:
//     case SerializationTypeCode.Single:
//     case SerializationTypeCode.String:
//     case SerializationTypeCode.UInt16:
//     case SerializationTypeCode.UInt32:
//     case SerializationTypeCode.UInt64:
//     case SerializationTypeCode.UserDefined:
//     case SerializationTypeCode.Vector2:
//     case SerializationTypeCode.Vector2I:
//     case SerializationTypeCode.Vector3:
//       break;
//     default:
//       handleUnknownType(code);
//   }
// }

// function handleUnknownType(type: never): never {
//   throw new Error(`Type code "${type}" is unknown.`);
// }
