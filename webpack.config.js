/* eslint-env node */
require('dotenv').config();

const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './main.ts',
    },
    output: {
        clean: false,
        filename: `index.${process.env.WEBPACK_OUTPUT_TYPE}${process.env.BUILD_ENV ? `.${process.env.BUILD_ENV}` : ''}.js`,
        path: path.resolve(process.cwd(), './lib'),
        library: {
            type: process.env.WEBPACK_OUTPUT_TYPE,
        },
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
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
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ], 
    },
    plugins: [
        new ProgressBarPlugin(), // 处理过程变为进度条
    ]
};