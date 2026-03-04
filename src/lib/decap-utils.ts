export const hasOnlyRootElement = (content: Record<string, any>) => {
  if (!content || typeof content !== 'object') return false

  const keys = Object.keys(content)

  if (keys.length !== 1) return false

  return keys[0]
}
