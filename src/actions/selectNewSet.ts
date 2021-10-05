import { Card } from '../common/types.js'
import { Dispatch } from 'redux'
import { setIntroText, setFlashCards, startNewGame, setAllCards } from './index'
import marked from 'marked'
import { isFlashCard } from '../functions/isFlashCard'

// sets
import warCards from '../sets/WAR-card-base.json'
const warText = require('../sets/WAR-text.md')
import grnCards from '../sets/GRN-card-base.json'
const grnText = require('../sets/GRN-text.md')
import eldCards from '../sets/eld-all-cards.json'
const eldText = require('../sets/eld-text.md')
import m21Cards from '../sets/m21-card-base.json'
const m21Text = require('../sets/m21-text.md')
import midCards from '../sets/MID-card-base.json'
const midText = require('../sets/mid-text.md')

export const selectNewSet = (setName: string = 'eld') => async (
  dispatch: Dispatch,
) => {
  let cards = [] as Card[]
  let textLink
  switch (setName) {
    case 'war':
      cards = warCards
      textLink = warText
      break
    case 'grn':
      cards = grnCards
      textLink = grnText
      break
    case 'eld':
      cards = eldCards
      textLink = eldText
      break
    case 'm21':
      cards = m21Cards
      textLink = m21Text
      break
    case 'mid':
      cards = midCards
      textLink = midText
    default:
      cards = midCards
      textLink = midText
      break
  }
  let introText = ''
  await fetch(textLink)
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      introText = marked(text)
    })
  dispatch(setIntroText(introText))
  dispatch(setAllCards(cards))
  const flashCards = cards.filter((card) => isFlashCard(card))
  dispatch(setFlashCards(flashCards))
  dispatch(startNewGame(flashCards))
}
