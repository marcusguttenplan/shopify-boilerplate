const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3000/',
            './src/assets/js/main.js'
        ]
    },

    target: "web",

    output: {
        filename: 'js/[name].js',
        sourceMapFilename: '[name].js.map',
        path: path.resolve(__dirname, 'dist')
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            // {
            //     test: /\.html?$/,
            //     loader: "file-loader?name=[name].[ext]"
            // },
            // {
            //     test: /\.(jpg|png|svg)$/,
            //     use: [{
            //         loader: "url-loader",
            //         options: {
            //             limit: 8000,
            //             name: "img/[name].[ext]"
            //         }
            //     }]
            // },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/application.css",
            chunkFilename: "assets/[id].css"
        }),
        new CopyWebpackPlugin([
            {
                context: './src',
                from: '**/*.html',
            },
            {
                context: './src',
                from: '**/*.liquid',
            },
            {
                context: './src',
                from: 'assets/img/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: 'assets/fonts/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: 'assets/js/vendor/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: 'assets/css/vendor/**',
                toType: 'dir'
            },
            {
                context: './src',
                from: '**/*.xml',
                toType: 'dir'
            },
            {
                context: './src',
                from: '**/*.yml',
                toType: 'dir'
            },
            {
                context: './src',
                from: '**/*.txt',
                toType: 'dir'
            },
            {
                context: './src',
                from: '**/*.json',
            }
        ]),
        // new HtmlWebpackPlugin({
        //     inject: false,
        //     hash: true,
        //     template: './src/index.html',
        //     filename: 'index.html'
        // })
    ]
}
