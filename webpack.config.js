var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = function () {
	var config = {
		entry: {
			app: ['./src'],
		},
		excludedModules: [
			'client-core',
			'normalize.scss',
		],
		devServer: {
			port: parseInt(process.env.DEV_PORT, 10),
		},
		plugins: [
            new webpack.EnvironmentPlugin({
                FB_APP_ID: process.env.FB_APP_ID,
            }),
		]
	};

	return config;
};
