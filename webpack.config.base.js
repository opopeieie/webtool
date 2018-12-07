import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import path from 'path'
import webpack from 'webpack'
const extractLess = new ExtractTextWebpackPlugin({
    filename: '[name]-[contenthash].css',
    allChunks: true
});

export default class WebPackConfig {
    constructor() {
        this.entry = ['babel-polyfill','./src/index.js'];
        this.module = {
            rules: [
                {test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/},
                {test: /\.(css||scss|sass)$/, use: extractLess.extract({
                    use:['css-loader','sass-loader'],fallback:[{loader:'style-loader'}]
                })},
                {test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, use: {loader: 'url-loader', options: {limit: 10000}}},
                {//html-loader
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader', //
                        options: {
                            minimize: true
                        }
                    }]
                }

                ]
        };
        this.plugins = [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            extractLess
        ];
    }
}
