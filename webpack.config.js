const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const RedactionWebpackPlugin = require('@redactie/module-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (env) => {
	const defaultConfig = {
		mode: 'production',
		devtool: 'source-map',
		entry: './public/index.tsx',
		performance: {
			hints: false,
		},
		module: {
			rules: [
				{
					test: /\.ts(x)?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [
			// clean dist folder before every build
			new RedactionWebpackPlugin({
				moduleName: 'redactie-form-renderer',
			}),
		],
		externals: {
			'react': 'react',
			'react-dom': 'react-dom',
			'rc-slider': 'rc-slider',
			'@redactie/redactie-core': '@redactie/redactie-core',
		},
		output: {
			filename: 'redactie-form-renderer.umd.js',
			path: path.resolve(__dirname, 'dist'),
			libraryTarget: 'umd',
		},
	};

	if (env.analyse) {
		return {
			...defaultConfig,
			plugins: [
				...defaultConfig.plugins,
				new BundleAnalyzerPlugin(),
			],
		};
	}

	return defaultConfig;
};
