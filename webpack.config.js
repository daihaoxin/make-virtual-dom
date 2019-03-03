const common = require("./webpack.common");
const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-source-map",
    output: {
        pathinfo: true,
        devtoolModuleFilenameTemplate: (info) => {
            return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
        }
    },
    devServer: {
        watchOptions: {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,
            
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000,
        },
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        host: "0.0.0.0",
        historyApiFallback: true,
        // Enable gzip compression of generated files.
        compress: true,
    },
    module: {
        rules: []
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
