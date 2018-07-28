import platform from "platform";

const OS_WINDOWS = /windows/i;
const OS_MAC = /Mac|iOS|(OS\ X)/;
const OS_LINUX = /linux/i;

export type OSType = "windows" | "mac" | "linux" | "unknown";

const osPlatform = (platform.os && platform.os.family) || "unknown";
export const OSType: OSType = OS_WINDOWS.test(osPlatform)
  ? "windows"
  : OS_MAC.test(osPlatform)
    ? "mac"
    : OS_LINUX.test(osPlatform)
      ? "linux"
      : "unknown";

export const isProd: boolean = process.env.NODE_ENV === "production";
