module.exports = {
    entry: {
		'index': './app/module/index.jsx',
		'user': './app/module/user.jsx',
	},
    output: {
        path: __dirname + '/assets',
        filename: '[name].entry.js'
    },
    module: {
        loaders: [
            {
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			}
        ]
    },
	devtool: 'eval-source-map'
};