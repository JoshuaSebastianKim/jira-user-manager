require('dotenv').config();
const webpack = require('webpack');

module.exports = {
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
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			USERNAME: JSON.stringify(process.env.USER_EMAIL),
			APITOKEN: JSON.stringify(process.env.API_TOKEN)
		})
	]
};

