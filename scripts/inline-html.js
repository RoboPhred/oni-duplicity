"use strict";
// Post-build step: turns dist/index.html + dist/*.bundle.js into ONE
// self-contained HTML file that works 100% offline (double-click to open).
const fs = require("fs");
const path = require("path");

const dist = path.resolve(__dirname, "..", "dist");
const { displayVersion } = require("../package.json");

let html = fs.readFileSync(path.join(dist, "index.html"), "utf8");

html = html.replace(
  /<script type="text\/javascript" src="([^"]+)"><\/script>/g,
  (_, src) => {
    const js = fs.readFileSync(path.join(dist, src), "utf8");
    // Prevent an inner "</script>" from closing the tag early.
    const safe = js.replace(/<\/script/gi, "<\\/script");
    return `<script type="text/javascript">${safe}</script>`;
  }
);

if (/<script[^>]+src=/.test(html)) {
  throw new Error("Some scripts were not inlined.");
}

const outName = `Duplicity-${displayVersion.replace(/\s+/g, "-")}.html`;
fs.writeFileSync(path.join(dist, outName), html);
fs.writeFileSync(path.join(dist, "index.html"), html);

console.log(
  `Wrote dist/${outName} (${(html.length / 1024 / 1024).toFixed(2)} MB)`
);
