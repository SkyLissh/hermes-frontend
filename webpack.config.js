const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "prod";

const config = {
	mode: isProd ? "production" : "development",
	entry: {
		index: "./src/index.jsx"
	},
	output: {
		path: resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			inject: "body"
		})
	]
};

if (isProd) {
	config.optimization = {
		minimizer: [new TerserWebpackPlugin()]
	};
} else {
	config.devServer = {
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		stats: "errors-only",
		overlay: true
	};
}

module.exports = config;
