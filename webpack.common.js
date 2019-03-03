const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "js/bundle.js",
        chunkFilename: "js/[name].chunk.js",
        path: path.join(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        // 使缺少导出成为错误，而不是警告
        strictExportPresence: true,
        rules: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, "src"),
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        // 缓存转换的结果, 当webpack再次编译时，将会首先尝试从缓存中读取转换结果
                        // 设置该参数可以让你的loader性能提升2倍.
                        cacheDirectory: true,
                    }
                }
            ]
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }
            ]
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["./dist"], {
            root: __dirname
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            // chunks sort by chunk Id
            chunksSortMode: "auto"
        }),
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        // if you changed the runtimeChunk's name, you need to sync it here
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, "node_modules")
        ]),
        new webpack.DefinePlugin({
            "__NODE_ENV__": JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".mjs", ".json"]
    }
};
