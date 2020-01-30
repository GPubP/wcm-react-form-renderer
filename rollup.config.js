import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import * as react from 'react';
import * as formik from 'formik';
import * as scheduler from 'scheduler';

import pkg from './package.json';

export default {
	input: 'public/index.tsx',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: 'es',
			exports: 'named',
			sourcemap: true,
		},
	],
	plugins: [
		external(),
		resolve({
			browser: true,
		}),
		typescript({
			rollupCommonJSResolveHack: true,
			exclude: '**/__tests__/**',
			clean: true,
		}),
		commonjs({
			// namedExports: {
			// 	react: Object.keys(react),
			// 	'node_modules/scheduler/index.js' : ['unstable_runWithPriority', 'LowPriority'],
			// },
		}),
	],
};
