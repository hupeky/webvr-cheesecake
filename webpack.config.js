var webpack = require( 'webpack' )
var path = require( 'path' )

const autoprefixer = require( 'autoprefixer' )
var HtmlWebpackPlugin = require( 'html-webpack-plugin' )
var InterpolateHtmlPlugin = require( 'react-dev-utils/InterpolateHtmlPlugin' )

var CopyWebpackPlugin = require( 'copy-webpack-plugin' )

const VENDOR_LIBS = [
    {vendorKey1: ['lodash']}
]

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const paths = {
    pathSrc: path.join( __dirname, 'src' )
}

module.exports = {
    devtool: 'source-map',
    devServer: {
        port: 3000, // Port Number
        host: 'localhost', // Change to '0.0.0.0' for external facing server
        publicPath: '/',
        hot: true
    },
    entry: {
        vendor1: VENDOR_LIBS[0].vendorKey1,
        'app': [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
            './src/index'
        ]
    },
    output: {
        publicPath: '/',
        path: path.join( __dirname, 'dist' ),
        filename: '[name].js' // dynamic file name based on entry obkect key
    },
    module: {
        rules: [
            {
                test: /\.(dae)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {name: '[path][name].[ext]'}
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                include: paths.pathSrc,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve( 'style-loader' ),
                    {
                        loader: require.resolve( 'css-loader' ),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: require.resolve( 'postcss-loader' ),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require( 'postcss-flexbugs-fixes' ),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9' // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1500000,
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '.'
            // You can pass any key-value pairs, this was just an example.
            // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor1', 'manifest']
        }), //  removes dependancies that  have been both required, and built
        new CopyWebpackPlugin( [
            {from: 'src/aframe/Component/**/**/*.dae', to: 'static/aframe/Component/**/**/*.dae'}
        ], {
            ignore: ['*.blend', '*.blend1', '*.7z', '*.RAR', '*.lwo', '*.lws', '*.ms3d'],
            copyUnmodified: true
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'src/index.html',
            filename: 'index.html'
        })
    ]
}
