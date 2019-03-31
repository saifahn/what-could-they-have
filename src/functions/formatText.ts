export function formatText(text: string | undefined) {
  let newText = text
  if (newText) {
    newText = newText.replace('(', '<em>(')
    newText = newText.replace(')', ')</em>')
    newText = newText.replace(/\n/g, '<br>')
    const abilityKeywordRE = /(\w*)( — .)/
    newText = newText.replace(abilityKeywordRE, '<em>$1</em>$2')
  }
  return { __html: newText || '' }
}
