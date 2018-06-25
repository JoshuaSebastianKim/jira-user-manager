require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		index: [
			'./src/client.js'
		]
	},
	output: {
		filename: 'js/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{ test: /\.pug$/, loader: 'pug-loader' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/views/index.pug'
		})
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true
	}
};

