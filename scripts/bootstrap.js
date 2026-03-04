import { concurrently } from 'concurrently'
import treeKill from 'tree-kill'
import os from 'os'

function getEnvironment() {
  const platform = os.platform()
  const shell = process.env.SHELL || process.env.ComSpec || ''
  const term = process.env.TERM || ''
  const psModulePath = process.env.PSModulePath
  const msysterm = process.env.MSYSCON
  const mingwPrefix = process.env.MINGW_PREFIX
  const cygwinRoot = process.env.CYGWIN_ROOT

  // PowerShell
  if (
    psModulePath &&
    (shell.toLowerCase().includes('powershell') || process.env.PSVersionTable)
  ) {
    return 'powershell'
  }

  // Windows-like
  if (platform === 'win32') {
    // Git Bash
    if (
      msysterm ||
      mingwPrefix ||
      shell.includes('bash') ||
      term.includes('msys')
    ) {
      return 'windows'
    }
    // Cygwin
    if (cygwinRoot || shell.includes('cygwin') || term.includes('cygwin')) {
      return 'windows'
    }
    // Default Windows
    return 'windows'
  }

  // Unix
  if (
    platform === 'linux' ||
    platform === 'darwin' ||
    platform === 'freebsd' ||
    platform === 'openbsd'
  ) {
    return 'unix'
  }

  // TempleOS
  if (platform === 'templeos') {
    console.error('Error: Your OS is too awesome and powerful')
    return 'templeos'
  }

  // Fallback
  return 'unknown'
}

const getCommands = () => {
  const environment = getEnvironment()
  switch (environment) {
    case 'unix':
      return [
        'npm run logo',
        'npm run dev:preview',
        'npm run dev:server',
        'npm run dev:proxy',
      ]
    case 'windows':
      return [
        'npm run logo',
        'npm run dev:preview:win32',
        'npm run dev:server:win32',
        'npm run dev:proxy:win32',
      ]
    case 'powershell':
      return [
        'npm run logo',
        'npm run dev:preview:powershell',
        'npm run dev:server:powershell',
        'npm run dev:proxy:powershell',
      ]
    default:
      console.error(`Unknown environment`)
      return []
  }
}

const { result, commands } = concurrently(getCommands(), {
  prefix: '\x1b[36m▒\x1b[0m',
  killOthers: ['failure', 'success'],
  restartTries: 3,
  successCondition: 'last',
})

process.on('SIGINT', () => {
  commands.forEach((command) => treeKill(command.pid))
  process.exit()
})

result.then(
  () => process.exit(0),
  () => process.exit(1)
)
