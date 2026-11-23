"use strict";
// Builds the Windows portable exe from the offline HTML (run `npm run build` first).
// Requires Go (https://go.dev). Cross-compiles, so it works from Linux/macOS too.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const { displayVersion } = require("../package.json");
const fileVersion = displayVersion.replace(/\s+/g, "-");

const html = path.join(root, "dist", `Duplicity-${fileVersion}.html`);
if (!fs.existsSync(html)) {
  throw new Error(`${html} not found. Run "npm run build" first.`);
}

const launcher = path.join(root, "launcher");
fs.copyFileSync(html, path.join(launcher, "app.html"));

const out = path.join(root, "dist", `Duplicity-${fileVersion}.exe`);
execFileSync(
  "go",
  [
    "build",
    "-trimpath",
    "-ldflags",
    `-s -w -X "main.version=${displayVersion}"`,
    "-o",
    out,
    ".",
  ],
  {
    cwd: launcher,
    stdio: "inherit",
    env: { ...process.env, GOOS: "windows", GOARCH: "amd64", CGO_ENABLED: "0" },
  }
);

fs.unlinkSync(path.join(launcher, "app.html"));
console.log(
  `Wrote dist/${path.basename(out)} (${(
    fs.statSync(out).size /
    1024 /
    1024
  ).toFixed(2)} MB)`
);
