const { resolve } = require("path");

const root = resolve(__dirname, "..");

module.exports = {
  appPackageJson: resolve(root, "package.json"),
  appSrc: resolve(root, "./src"),
  appDist: resolve(root, "./dist"),
  publicPath: "/oni-duplicity/vnext"
};
