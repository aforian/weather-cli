import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import minify from 'rollup-plugin-babel-minify';
import shebang from 'rollup-plugin-preserve-shebang';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'build',
    format: 'cjs',
    globals: {
      axios: 'axios',
      chalk: 'chalk',
      commander: 'commander',
      moment: 'moment',
    },
  },
  external: ['axios', 'chalk', 'commander'],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    json(),
    minify(),
    terser(),
    shebang(),
  ],
};

export default config;
