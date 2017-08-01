const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const IS_PROD = (process.env.NODE_ENV === 'production');
const SRC = path.resolve(__dirname, 'src');
const WWWROOT = path.resolve(__dirname, 'wwwroot');
const DIST = path.join(WWWROOT, '/dist');

var config = {
    entry: {
        'vendor': './src/vendor.ts',
        'index': './src/main.ts',
    },
    output: {
        path: WWWROOT,
        publicPath: '/',
        filename: (IS_PROD ? 'dist/js/[name].[hash:8].js' : 'dist/js/[name].js')
    },
    resolve: {
        unsafeCache: true,
        modules: [SRC, 'node_modules'],
        extensions: [
            '.js', '.ts'
        ]
    },
    module: {
        exprContextCritical: false,
        rules: [{
                test: /\.ts$/,
                include: SRC,
                use: 'awesome-typescript-loader'
            },
            {
                test: /.html$/,
                include: SRC,
                use: 'html-loader'
            },
            {
                test: /\.less$/,
                include: SRC,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': process.env.NODE_ENV
            },
            __IS_PROD__: IS_PROD
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['vendor', 'index'],
            filename: 'index.html'
        }),
        new CleanWebpackPlugin([
            DIST,
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new ExtractTextPlugin(
            IS_PROD ? 'dist/css/styles.[hash:8].css' : 'dist/css/styles.css'
        ),
    ]
};

if (!IS_PROD) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            output: {
                comments: false,
            }
        })
    );
} else {
    config.devtool = 'eval-cheap-module-source-map';
    config.devServer = {
        contentBase: WWWROOT,
        compress: true,
        port: 3000,
        historyApiFallback: true
    };
}

module.exports = config;