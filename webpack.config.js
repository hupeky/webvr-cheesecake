var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');


const VENDOR_LIBS = [
	{vendorKey1:["lodash"]}
];



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
				use: [ 'style-loader', 'css-loader' ]  
			  }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		  title: 'My App',
		  template: './src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor1','manifest']
		}), //  removes dependancies that  have been both required, and built
	  ]
}