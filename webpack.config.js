module.exports = {
	context: __dirname,
	entry: './dist/test.js',
	output: {
		path: __dirname + '/dist',
		filename: 'test.bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	target: 'web'
}