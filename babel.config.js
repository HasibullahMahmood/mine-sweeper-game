module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
		'@babel/preset-react',
	],
	plugins: [
		[
			'babel-plugin-root-import',
			{
				rootPathSuffix: './src',
				rootPathPrefix: '@/',
			},
		],
	],
}
