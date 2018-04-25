/* global require */

const path = require(`path`)

module.exports = {
    mode: `development`,
    entry: {
        index: `./src/index`,
    },
    resolve: {
        alias: {},
        extensions: [`.js`],
    },
    output: {
        path: path.resolve(`./dist`),
        filename: `[name].js`,
        publicPath: `/`,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: [`babel-preset-env`],
                    },
                },
            },
        ],
    },
    plugins: [],
}
