import * as fs from 'node:fs'
import * as path from 'node:path'
import prettier from 'prettier'

const sourcePath = import.meta.dirname
const packagePath = path.resolve(sourcePath, '..')

const sourceFilePath = path.join(sourcePath, 'index.ts')
const configFilePath = path.join(packagePath, '.prettierrc')

const source = fs.readFileSync(sourceFilePath, 'utf8')
const options = JSON.parse(fs.readFileSync(configFilePath, 'utf8'))

prettier.format(source, options).then((res) => fs.writeFileSync(sourceFilePath, res))
