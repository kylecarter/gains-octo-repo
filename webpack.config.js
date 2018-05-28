
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
var webpack = require( 'webpack' );
var path = require( 'path' );

var config = {
    mode: process.env.NODE_ENV,
    output: {
        publicPath: path.join(  __dirname, [ 'www', 'js' ].join( '/' ) ),
        path: path.join( __dirname, [ 'www', 'js' ].join( '/' ) ),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: [ /\.jsx*$/ ],
                use: { loader: 'babel-loader' },
                exclude: /(node_modules|bower_components)/
            }, {
                test: [ /\.s[ac]ss$/ ],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [ 'node_modules/', 'src/' ]
                        }
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
          minimize: process.env.NODE_ENV === 'development',
          debug: process.env.NODE_ENV === 'development',
          options: {
              resolveLoader: {
                  modulesDirectories: ['node_modules', 'bower_components']
              }
          }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin( '/www/css/index.css', {
            disable: 'development' === process.env.NODE_ENV,
            filename: 'stylessheet.css',
            allChunks: true
        })
    ]
};

if ( process.env.NODE_ENV === 'development' ) {

    config.devtool = 'inline-source-map';

    config.devServer = {
        hot: false,
        open: true,
        noInfo: true,
        colors: true
    };

}

if ( process.env.NODE_ENV === 'production' ) {

    config.plugins.push(
        new UglifyJsPlugin({
            sourceMap: 'development' === process.env.NODE_ENV,
        })
    );
}

module.exports = config;