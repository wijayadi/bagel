import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  external: Object.keys(pkg.dependencies).concat('fs', 'path'),
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
      inlineSources: true,
    })
  ]
};
