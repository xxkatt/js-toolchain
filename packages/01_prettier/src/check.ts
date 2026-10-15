import * as fs from 'node:fs'
import * as path from 'node:path'
import prettier from 'prettier'

const sourcePath = import.meta.dirname
const packagePath = path.resolve(sourcePath, '..')
const configFilePath = path.join(packagePath, '.prettierrc')
const options = JSON.parse(fs.readFileSync(configFilePath, 'utf8'))

fs.readdir(sourcePath, (err, files) => {
  if (err) {
    console.error(err)
    return
  }
  let isFormatted = true
  files.forEach(async (file) => {
    const filePath = path.join(sourcePath, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const res = await prettier.check(fileContent, options)
    if (!res) {
      console.log(`${filePath}没有被格式化`)
      isFormatted = false
    }
  })
  if (isFormatted) {
    console.log('所有文件都已格式化')
  }
})
