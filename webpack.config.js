module.exports = {
    entry: './app/module/index.jsx',
    output: {
        path: __dirname + '/assets',
        filename: 'bundle.js'
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