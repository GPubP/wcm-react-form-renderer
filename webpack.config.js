const path = require('path');

const RedactionWebpackPlugin = require('@redactie/module-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
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
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: () => [postcssPresetEnv()],
							},
						},
						'sass-loader',
					],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		plugins: [],
		externals: {
			react: 'react',
			'react-dom': 'react-dom',
			'rc-slider': 'rc-slider',
			'@redactie/redactie-core': '@redactie/redactie-core',
		},
		output: {
			filename: 'redactie-form-renderer-module.umd.js',
			path: path.resolve(__dirname, 'dist'),
			libraryTarget: 'umd',
		},
	};

	if (env.analyse) {
		return {
			...defaultConfig,
			plugins: [...defaultConfig.plugins, new BundleAnalyzerPlugin()],
		};
	}

	if (env.prod) {
		return {
			...defaultConfig,
			plugins: [
				...defaultConfig.plugins,
				new RedactionWebpackPlugin({
					moduleName: 'redactie-form-renderer',
				}),
			],
		};
	}

	return defaultConfig;
};
