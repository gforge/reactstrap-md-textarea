import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import pkg from './package.json';

const shared = {
  input: `compiled/index.js`,
  external: ['react', 'tslib', 'reactstrap'],
};


const nodeResolver = nodeResolve({
  jsnext: true,
  main: true
});

const commonJsResolver = commonjs({
  // non-CommonJS modules will be ignored, but you can also
  // specifically include/exclude files
  include: 'node_modules/**',  // Default: undefined
  // these values can also be regular expressions
  // include: /node_modules/

  // search for files other than .js files (must already
  // be transpiled by a previous plugin!)
  extensions: ['.js', '.coffee', '.json'],  // Default: [ '.js' ]

  // if true then uses of `global` won't be dealt with by this plugin
  ignoreGlobal: true,  // Default: false

  // if false then skip sourceMap generation for CommonJS modules
  sourceMap: true,  // Default: true
});

const sharedPlugins = [
  json(),
  builtins(),
  commonJsResolver,
  nodeResolver,
]

export default [
  Object.assign({}, shared, {
    output: {
      name: 'reactstrap-md-textarea',
      format: 'umd',
      sourcemap: process.env.NODE_ENV !== 'production',
      file:
        process.env.NODE_ENV === 'production'
          ? './dist/textarea.umd.min.js'
          : './dist/textarea.umd.js',
      exports: 'named',
      globals: {
        react: 'React',
        tslib: 'tslib',
        reactstrap: 'reactstrap',
      },
    },

    plugins: [
      ...sharedPlugins,
      replace({
        exclude: 'node_modules/**',
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
      }),
      sourceMaps(),
      process.env.NODE_ENV === 'production' && filesize(),
      process.env.NODE_ENV === 'production' &&
        terser({
          output: { comments: false },
          compress: {
            keep_infinity: true,
            pure_getters: true,
          },
          warnings: true,
          ecma: 6,
          toplevel: false,
        }),
    ],
  }),

  Object.assign({}, shared, {
    external: shared.external.concat(Object.keys(pkg.dependencies)),
    output: [
      {
        name: 'reactstrap-md-textarea',
        file: 'dist/textarea.es6.js',
        format: 'es',
        sourcemap: true,
      },
      {
        name: 'reactstrap-md-textarea',
        file: 'dist/textarea.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      ...sharedPlugins,
      sourceMaps(),
      process.env.NODE_ENV === 'production' && filesize(),
    ],
  }),
];