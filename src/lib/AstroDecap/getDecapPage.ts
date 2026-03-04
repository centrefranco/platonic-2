import { getDecapConfig } from '@lib/AstroDecap/getDecapConfig.ts'
import { existsSync, readFileSync } from 'node:fs'
import { load } from 'js-yaml'

const getDecapPage = async (pageName: string) => {
  const decapConfig = await getDecapConfig()
  const filePath = getFilePath(decapConfig, pageName)

  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }

  try {
    const fileContents = readFileSync(filePath, 'utf8')
    const yamlData = load(fileContents)
    return yamlData
  } catch (error) {
    throw new Error(`Failed to load YAML content from ${filePath}: ${error}`)
  }
}

const getFilePath = (decapConfig: unknown, pageName: string) => {
  const filePath = decapConfig?.collections
    ?.find((collection) => collection.name === 'pages')
    ?.files?.find((file) => file.name === pageName)?.file

  if (!filePath) throw new Error('File path not found')

  return filePath
}

export { getDecapPage }
