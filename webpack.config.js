var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var CopyWebpackPlugin = require('copy-webpack-plugin');

const VENDOR_LIBS = [
	{vendorKey1:["lodash"]}
];

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const plugin = new ExtractTextPlugin({
    // `allChunks` is needed with CommonsChunkPlugin to extract
    // from extracted chunks as well.
    allChunks: true,
    filename: "[name].css",
  });

module.exports = {
    devServer: {
        hot: true,        //Live-reload
        port: 3000,        //Port Number
        host: 'localhost',  //Change to '0.0.0.0' for external facing server
		publicPath: '/'
	},
	entry: {
		vendor1: VENDOR_LIBS[0].vendorKey1,
		'app': [
			'babel-polyfill',
			'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
			'react-hot-loader/patch',
			'./src/index'
		  ]
	},
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'dist'),
		filename: '[name].js' // dynamic file name based on entry obkect key
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.jsx?$/,
				exclude: /node_modules/
			},
			{ //  
				test: /\.css$/,
				loader: ['style-loader', 'css-loader', 'sass-loader' ]
			},
			{
			test: /\.(png|jpg|jpeg|svg)$/,
			use: {
				loader: "url-loader",
				options: {
					limit: 1500000,
					name: "[path][name].[ext]",
				}
			}
			}
		]
	},
	plugins: [
		new InterpolateHtmlPlugin({
			PUBLIC_URL: '.'
			// You can pass any key-value pairs, this was just an example.
			// WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
		  }),
		new HtmlWebpackPlugin({
			inject:true,
			title: 'My App',
			template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor1','manifest']
		}), //  removes dependancies that  have been both required, and built
		new CopyWebpackPlugin([{from:'src/favicon.ico',to:'favicon.ico'}], {copyUnmodified:false}),
		new webpack.NamedModulesPlugin(),
		plugin
	  ]
}