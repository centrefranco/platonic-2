import { execSync, spawn } from 'child_process'

const SESSION_NAME = 'platonic_session'
const COMMANDS = [
  'npm run dev:proxy', // Bottom Panel
  'npm run logo && npm run dev', // Top Panel
  'npm run dev:preview', // Middle Panel
]

const args = process.argv.slice(2)
const splitDirection = args.includes('-h') ? '-h' : '-v' // Default vertical split

try {
  execSync('tmux -V', { stdio: 'ignore' })
} catch (error) {
  console.error('Error: tmux is not installed.')
  process.exit(1)
}

if (!process.stdout.isTTY) {
  console.error('Error: this script must be run in a terminal.')
  process.exit(1)
}

process.env.TERM = process.env.TERM || 'xterm'

try {
  execSync(`tmux has-session -t ${SESSION_NAME}`)
  execSync(`tmux kill-session -t ${SESSION_NAME}`)
} catch (e) {}

try {
  execSync(`tmux new-session -d -s ${SESSION_NAME}`)
  execSync(`tmux split-window ${splitDirection}`)
  execSync(`tmux select-pane -t 0`)
  execSync(`tmux split-window ${splitDirection}`)

  COMMANDS.forEach((cmd, index) => {
    execSync(`tmux select-pane -t ${index}`)
    execSync(`tmux send-keys "${cmd}" C-m`)
  })

  const attach = spawn('tmux', ['attach-session', '-t', SESSION_NAME], {
    stdio: 'inherit',
    env: { ...process.env, TERM: 'xterm' },
  })

  attach.on('error', (error) => {
    console.error('Error attaching to tmux session:', error.message)
  })

  attach.on('close', (code) => {
    if (code !== 0)
      console.error(`tmux attach-session exited with code ${code}`)
    try {
      execSync(`tmux kill-session -t ${SESSION_NAME}`, { stdio: 'ignore' })
    } catch (error) {}
  })
} catch (error) {
  console.error('Error setting up tmux:', error.message)

  try {
    execSync(`tmux kill-session -t ${SESSION_NAME}`, { stdio: 'ignore' })
  } catch (error) {}
  process.exit(1)
}
