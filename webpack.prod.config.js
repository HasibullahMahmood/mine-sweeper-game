const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[contenthash].js',
	},
	mode: 'development',
	devServer: {
		port: '80',
		devMiddleware: {
			writeToDisk: true,
		},
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
				],
			},
			{
				test: /\.(jpg|png)$/,
				// type: 'asset/resource', // bundles as file
				// type: 'asset/inline', // bundles with js as base64 -> good for small sized files like svg's
				type: 'asset', // combination of above two, webpack decides in which one to use based on the file size of 8KB,
				// parser: {
				// 	dataUrlCondition: {
				// 		maxSize: 3 * 1024, // changing the default 8KB to 3KB
				// 	},
				// },
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(ts)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	plugins: [
		new TerserWebpackPlugin(), // used to minify bundle.js file
		new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve('public', 'index.html'),
			minify: true,
		}),
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /a\.js|node_modules/,
			// include specific files based on a RegExp
			include: /src/,
			// add errors to webpack instead of warnings
			failOnError: true,
			// allow import cycles that include an async import,
			// e.g. via import(/* webpackMode: "weak" */ './file.js')
			allowAsyncCycles: false,
			// set the current working directory for displaying module paths
			cwd: process.cwd(),
		}),
	],
}
