import React from 'react'

export function formatText(text: string = '') {
  let newText = text
  newText = newText.replace('(', '<em>(')
  newText = newText.replace(')', ')</em>')
  const abilityKeywordRE = /(\w*)( — .)/
  newText = newText.replace(abilityKeywordRE, '<em>$1</em>$2')
  return { __html: newText }
}

export function createText(text: string = '') {
  let splitText = text.split('\n')
  let textElements = splitText.map((text) => {
    const formattedText = formatText(text)
    return <p dangerouslySetInnerHTML={formattedText} />
  })
  return textElements
}
