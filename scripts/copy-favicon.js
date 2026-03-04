import fs from 'fs'
import path from 'path'

const srcDir = path.join(process.cwd(), 'src/images')
const destDir = path.join(process.cwd(), 'public/images')

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

fs.readdirSync(srcDir).forEach((file) => {
  if (file.startsWith('favicon')) {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    fs.copyFileSync(srcFile, destFile)
  }
})

console.log('Favicon images copied from src/images to public/images')
