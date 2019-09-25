import { Card } from '../common/types.js'
import { Dispatch } from 'redux'
import { setIntroText, setSharedCards, startNewGame } from './index'
import marked from 'marked'

// sets
import warCards from '../sets/WAR-card-base.json'
const warText = require('../sets/WAR-text.md')
import grnCards from '../sets/GRN-card-base.json'
const grnText = require('../sets/GRN-text.md')
import eldCards from '../sets/eld-flash-cards.json'
const eldText = require('../sets/eld-text.md')

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
    default:
      cards = warCards
      textLink = warText
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
  dispatch(setSharedCards(cards))
  dispatch(startNewGame(cards))
}
