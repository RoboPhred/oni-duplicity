import * as React from "react";

import { Intent } from "@/style";

import { OSType } from "@/runtime-env";

import NonIdealState from "@/components/NonIdealState";
import Text from "@/components/Text";
import Code from "@/components/Code";

const SaveFilePaths: Record<OSType, string | null> = {
  windows: "Documents/Klei/OxygenNotIncluded/save_files",
  mac: null,
  linux: "~/.config/unity3d/Klei/Oxygen Not Included/save_files",
  unknown: null
};

const NoSave: React.SFC = () => (
  <NonIdealState intent={Intent.Hint} header={"No File Loaded"}>
    <Text intent={Intent.Hint}>
      <div>Load a save using the controls on the upper left.</div>
      {SaveFilePaths[OSType] && (
        <div>
          Save files can be found at
          <Code>{SaveFilePaths[OSType]}</Code>
        </div>
      )}
    </Text>
  </NonIdealState>
);
NoSave.displayName = "NoSave";
export default NoSave;
