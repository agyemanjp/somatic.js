const path = require('path')

module.exports = {
	entry: './src/tests/manual/preview.tsx',
	output: {
		path: path.resolve(__dirname, 'dist/tests/manual'),
		filename: 'preview.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'ts-loader', // You need to have ts-loader or babel-loader configured
			},
		],
	},
}
