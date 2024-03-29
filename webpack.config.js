/* eslint-env node */
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    target: ['node'].includes(process.env.BUILD_ENV) ? 'node' : 'web',
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        clean: false,
        filename: `index${process.env.BUILD_ENV || process.env.PACK_TYPE ? `.${process.env.BUILD_ENV || process.env.PACK_TYPE}` : ''}.js`,
        library: {
            name: 'MechaAxios',
            type: !process.env.PACK_TYPE ? 'umd' : process.env.PACK_TYPE,
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
