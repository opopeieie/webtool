import path from 'path'
import webpack from 'webpack';
import WebpackBaseConfig from './webpack.config.base';
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

class WebpackDevelopConfig extends WebpackBaseConfig {
    constructor() {
        super();
        this.output = {
            path: path.resolve(__dirname, 'BarrageDM-client-new'),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].bundle.js'
        };
        // this.devtool = 'source-map';
        this.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            IS_PRODUCTION: true
        }), new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        }), /* new BundleAnalyzerPlugin() */);
    }
}

export default new WebpackDevelopConfig();
