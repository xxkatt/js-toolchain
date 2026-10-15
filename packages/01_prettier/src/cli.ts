#!/usr/bin/env node

// 第一行是Shebang，
// 类Unix系统下支持的一种特性 用于告诉系统如何执行后面的脚本
// 用于指定Node.js解释器的路径

import * as fs from 'node:fs'
import * as path from 'node:path'
import prettier from 'prettier'

// 获取命令行参数
const args = process.argv.slice(2)
// --write src/index.ts

const sourcePath = import.meta.dirname
const packagePath = path.resolve(sourcePath, '..')

const sourceFilePath = path.join(sourcePath, 'index.ts')
const configFilePath = path.join(packagePath, '.prettierrc')

const source = fs.readFileSync(sourceFilePath, 'utf8')
const options = JSON.parse(fs.readFileSync(configFilePath, 'utf8'))

if (args.length === 0) {
  console.error('请提供要格式化的文件路径')
  process.exit(1)
}

const input = args[0]
if (input === '--write' || input === '-w') {
  prettier.format(source, options).then((res) => fs.writeFileSync(sourceFilePath, res))
  console.log('格式化完成')
}
