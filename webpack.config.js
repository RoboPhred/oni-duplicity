"use strict";
const path = require("path");

const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env["NODE_ENV"] === "development";

const root = path.resolve(__dirname);

const PATHS = {
  appPackageJson: path.resolve(root, "package.json"),
  appSrc: path.resolve(root, "./src"),
  appDist: path.resolve(root, "./dist"),
  nodeModules: path.resolve(root, "./node_modules"),
  changelog: path.resolve(root, "./CHANGELOG.md")
};

const { displayVersion } = require(PATHS.appPackageJson);

console.log(
  "Webpack build",
  isDev ? "[development]" : "[production]",
  displayVersion
);

// Offline build: everything (JS, worker, fonts, images) ends up inside one
// index.html. The inlining of the script tag itself is done afterwards by
// scripts/inline-html.js.
module.exports = {
  mode: isDev ? "development" : "production",

  devtool: isDev ? "source-map" : false,

  devServer: {
    contentBase: PATHS.appDist,
    hot: isDev,
    historyApiFallback: true
  },

  entry: {
    client: [path.join(PATHS.appSrc, "./index.tsx")]
  },

  output: {
    filename: "[name].bundle.js",
    path: PATHS.appDist,
    // Relative paths so the build works when opened straight from disk (file://)
    publicPath: isDev ? "/" : "",

    // Fix hot-reload interfering with worker-loader
    globalObject: "this"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "@": PATHS.appSrc,
      "@changelog": PATHS.changelog
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },

      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },

      // Inline every font/image as a data URI so no extra files are needed.
      {
        test: /\.(woff|woff2|ttf|eot|svg|png)$/,
        loader: "url-loader"
      },

      {
        test: /\.(txt|md)$/,
        loader: "raw-loader"
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(isDev ? "development" : "production")
      },
      __APP_VERSION__: JSON.stringify(displayVersion)
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(PATHS.appSrc, "index.ejs"),
      appVersion: displayVersion
    })
  ],

  // One bundle only: no code splitting, so there is a single script to inline.
  optimization: {
    splitChunks: false,
    runtimeChunk: false
  }
};
