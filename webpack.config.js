//node/webpack
const webpack = require('webpack');
const path = require('path');

//webapck plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//Custom variables
const IS_PROD = (process.env.NODE_ENV === 'production');
const SRC = path.resolve(__dirname, 'src');
const WWWROOT = path.resolve(__dirname, 'wwwroot');

var config = {
    entry: {
        'vendor': './src/vendor.ts',
        'index': './src/main.ts',
    },
    output: {
        path: WWWROOT,
        publicPath: '/',
        filename: (IS_PROD ? 'dist/js/[name].[hash:8].min.js' : 'dist/js/[name].js')
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
        rules: [
            {
                test: /\.ts$/,
                include: SRC,
                use: 'awesome-typescript-loader'
            },
            {
                test: /.html$/,
                include: SRC,
                use: 'html-loader?-minimize'
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
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
        new webpack.optimize.ModuleConcatenationPlugin(), //Feature of webpack 3 https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
        new CleanWebpackPlugin(['./wwwroot/dist']), //Clean/remove files before build
        new webpack.DefinePlugin({ //Set global variables to use in angular app
            '__IS_PROD__': IS_PROD
        }),
        new webpack.optimize.CommonsChunkPlugin({ //Remove common imports/code
            name: 'vendor',
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({ //Extract css and create a file with all styles
            filename: IS_PROD ? 'dist/css/styles.[hash:8].min.css' : 'dist/css/styles.css'
        }),
        new HtmlWebpackPlugin({ //Inject scripts into index.html and copy to wwwroot/assets
            template: './src/index.html',
            inject: true,
            chunks: ['vendor', 'index'],
            filename: 'index.html'
        })
    ]
};

if (IS_PROD) { //PRODUCTION (npm run build)
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            output: { //Remove libs comments
                comments: false,
            },
            compress: { //Remove console.logs and warnings
                warnings: false,
                drop_console: true
            }
        })
    );
} else { //DEBUG (npm start)
    config.devtool = 'eval-cheap-module-source-map';
    config.devServer = {
        contentBase: WWWROOT,
        port: 3000,
        compress: true,
        historyApiFallback: true
    };
}

module.exports = config;