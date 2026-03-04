#!/usr/bin/env node

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
}

const printColoredText = (text, color) => {
  console.log(`${colors[color]}${text}${colors.reset}`)
}

printColoredText(
  '░       ░░  ░░░░░░░░      ░░        ░░      ░░   ░░░  ░        ░░      ░░',
  'cyan'
)
printColoredText(
  '▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒▒▒  ▒▒▒▒  ▒▒▒▒  ▒    ▒▒  ▒▒▒▒  ▒▒▒▒  ▒▒▒▒  ▒',
  'magenta'
)
printColoredText(
  '▓       ▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓  ▓  ▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓▓▓',
  'yellow'
)
printColoredText(
  '█  ███████  ███████        ████  ████  ████  █  ██    ████  ████  ████  █',
  'yellow'
)
printColoredText(
  '█  ███████        █  ████  ████  █████      ██  ███   █        ██      ██\n',
  'yellow'
)

printColoredText(
  '         Astro / Decap Platform using Idealized Best Practices           \n',
  'yellow'
)
