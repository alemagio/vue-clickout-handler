import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'

export default {
  input: [
    'index.js'
  ],
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    copy({
      targets: [
        { src: 'LICENSE', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'package.json', dest: 'dist' }
      ]
    })
  ]
}
