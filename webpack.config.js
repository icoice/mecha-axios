/* eslint-env node */
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

console.log(process.env.BUILD_ENV);

module.exports = {
    target: 'node',
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        clean: false,
        filename: 'index.js',
        library: {
            type: 'commonjs2',
        },
    },
    externalsPresets: { node: true },
    optimization: {
        emitOnErrors: false,
        minimize: false, // 压缩JS
    },
    module: {
        rules: [
            // es语法解析
            {
                test: /\.m?js$/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                    ]
                }
                }
            },
        ], 
    },
    plugins: [
        new ProgressBarPlugin(), // 处理过程变为进度条
    ]
};
