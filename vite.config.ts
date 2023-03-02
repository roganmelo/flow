import path from 'path'

import { defineConfig } from 'vite'

import packageJson from './package.json'

const packageName = packageJson.name.replace('@', '').replace('/', '-')

const getPackageNameCamelCase = () => {
  try {
    return packageName.replace(/-./g, char => char[1].toUpperCase())
  } catch (err) {
    throw new Error('Name property in package.json is missing.')
  }
}

const fileName = {
  es: `${packageName}.mjs`,
  cjs: `${packageName}.cjs`,
  iife: `${packageName}.iife.js`
}

const formats = Object.keys(fileName) as Array<keyof typeof fileName>

module.exports = defineConfig({
  base: './',
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: getPackageNameCamelCase(),
      formats,
      fileName: format => {
        const extension = format as 'es' | 'cjs' | 'iife'

        return fileName[extension]
      }
    }
  }
})
