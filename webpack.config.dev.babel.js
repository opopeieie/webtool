import path from 'path';
import WebpackBaseConfig from './webpack.config.base';
import webpack from 'webpack'
class WebpackDevelopConfig extends WebpackBaseConfig {
    constructor() {
        super();
        this.output = {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].bundle.js'
        };
        this.devtool = 'inline-source-map';
        this.devServer = {
            port: 8999,
            proxy: {
                
            }
        };
        this.plugins.push(new webpack.DefinePlugin({
            IS_PRODUCTION: false
        }))
    }
}

export default new WebpackDevelopConfig();