const webpack = require("webpack");
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const IS_PROD = (process.env.NODE_ENV === 'production');

var config = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, './wwwroot/'),
        publicPath: '/',
        filename: "assets/js/index.js"
    },
    resolve: {
        unsafeCache: true,
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [
            '.js', '.ts'
        ]
    },
    module: {
        exprContextCritical: false,
        rules: [{
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                use: 'awesome-typescript-loader'
            },
            {
                test: /.html$/,
                include: path.resolve(__dirname, "src"),
                use: 'html-loader'
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, "src"),
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            filename: 'index.html'
        }),
        new ExtractTextPlugin("assets/css/styles.css")
    ]
};

if (IS_PROD) {

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    );
    config.plugins.push(
        new CleanWebpackPlugin([
            './wwwroot/assets/js',
            './wwwroot/assets/css'
        ])
    );

} else {
    config.devtool = "eval-cheap-module-source-map"
    config.devServer = {
        contentBase: './wwwroot',
        compress: true,
        port: 3000,
        historyApiFallback: true
    }
}

module.exports = config;