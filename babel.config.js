module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {},
                // defaults to false.
                useBuiltIns: "usage",
                // 默认commonjs， false表示关闭模块转换功能， 由webpack来处理
                modules: false,
                // 使用更慢，但是更符合规范的转换
                // spec: true,
                // 是否使用宽松模式，默认false, 如果为true,plugins里的插件如果允许，都会采用宽松模式。
                loose: false,
            }
        ]
    ],
    plugins: [
        ["@babel/plugin-transform-react-jsx", {
            "pragma": "vnode"
        }],
    ],
};


