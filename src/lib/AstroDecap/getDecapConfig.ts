import { existsSync, readFileSync } from 'node:fs'
import { load } from 'js-yaml'

const getDecapConfig = async (): Promise<any> => {
  const yamlPath = 'public/admin/config.yaml'
  const ymlPath = 'public/admin/config.yml'
  const path = existsSync(yamlPath) ? yamlPath : ymlPath

  try {
    const fileContents = readFileSync(path, 'utf8')
    return load(fileContents)
  } catch (error) {
    throw new Error(`Failed to load Decap CMS config: ${error}`)
  }
}

export { getDecapConfig }
