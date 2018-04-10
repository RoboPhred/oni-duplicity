'use strict';
const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env["NODE_ENV"] === "development";

const paths = require('./paths');

const pkg = require(paths.appPackageJson);

module.exports = {
    mode: isDev ? "development" : "production",

    devtool: "source-map",

    devServer: {
        contentBase: paths.appDist,
        hot: true
    },

    entry: {
        client: [
            path.join(paths.appSrc, "./index.tsx")
        ].filter(x => x)
    },

    output: {
        filename: "[name].bundle.js",
        path: paths.appBuild,
        publicPath: isDev ? "/" : paths.publicPath
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.(jsx?|tsx?)$/,
                loader: "source-map-loader",
                include: [
                    /src\/.+\.tsx?/
                ]
            },

            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            //  Run it through react-hot-loader to rewrite react components for hot loading.
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: true,
                            plugins: ["react-hot-loader/babel"],
                        },
                    },
                    "ts-loader",
                ],
            },

            // Resolve url references in css, then inject css into DOM as style tags.
            { test: /\.css$/, loader: ["style-loader", "css-loader"] },

            // Halfheartedly grabbing stuff that bootstrap wants.
            //  Should probably refine this modules section to use oneOf and
            //  fallback file including as create-react-app does.
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 100000
                }
            },
        ]
    },

    plugins: [
        isDev && new webpack.NamedModulesPlugin(),
        isDev && new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(isDev ? 'development' : 'production')
            }
        }),

        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(paths.appSrc, "index.ejs")
        })
    ].filter(x => x),

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
    }
}
