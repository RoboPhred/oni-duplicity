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
        filename: "[name].[hash].bundle.js",
        path: paths.appBuild,
        publicPath: isDev ? "/" : paths.publicPath,

        // Fix hot-reload interfering with worker-loader
        globalObject: 'this'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // Process source maps in input sources
            //  All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.(jsx?|tsx?)$/,
                loader: "source-map-loader",
                include: [
                    /src\/.+\.tsx?/
                ]
            },

            //  Run typescript through react-hot-loader to rewrite react components for hot loading.
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
                exclude: [
                    /\.worker\.ts$/
                ]
            },

            {
                test: /\.worker\.ts$/,
                use: "ts-loader"
            },

            // Doesn't seem to take with typescript.  Probably an ordering issue.
            //  Using prefix form for now, as it plays better with typescript.
            // {
            //     test: /\.worker.\.(t|j)s$/,
            //     use: [
            //         {
            //             loader: "worker-loader"
            //         }
            //     ]
            // },


            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"]
            },

            // blueprintjs uses sass for color data, and we want
            //  to pull that out for use in our own css.
            {
                test: /\.scss$/,
                loader: ["style-loader", "css-loader", "sass-loader"]
            },

            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                        limit: 5000,
                        mimetype: 'application/font-woff'
                    }
                }
            }, {
                test: /\.(ttf|eot|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[hash].[ext]'
                    }
                }
            },

            {
                test: /\.(txt|md)$/,
                loader: "raw-loader"
            }
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
