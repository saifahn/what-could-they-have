import { Card } from '../common/types'

export function formatMana(cost: string) {
  const manaRE = /\{([\dWUBRG/]+)\}/g
  const manaObject = { cmc: 0 }
  const manaArray = cost.match(manaRE) || []
  manaArray.forEach((symbol) => {
    const newSymbol = symbol.replace(manaRE, '$1')
    if (isNaN(Number(newSymbol))) {
      if (manaObject.hasOwnProperty(newSymbol)) {
        manaObject[newSymbol] += 1
      } else {
        manaObject[newSymbol] = 1
      }
      manaObject['cmc'] += 1
    } else {
      const generic = Number(newSymbol)
      manaObject['generic'] = generic
      manaObject['cmc'] += generic
    }
  })
  return manaObject
}

function canBeCast(card: Card, cost: string): boolean {
  /*
    takes a card and a mana cost
    returns true if the card can be cast
  */
  if (!card.mana_cost) {
    return false
  }
  const availableMana = formatMana(cost)
  const cardMana = formatMana(card.mana_cost)
  // get the cmc of the card from the mana cost
  // get the cmc of the available mana
  // return false if cmc is too much
  if (availableMana.cmc < cardMana.cmc) {
    return false
  }
  // look at coloured symbols
  const cardKeys = Object.keys(cardMana)
  const availableKeys = Object.keys(availableMana)
  // count each one from the costs
  return cardKeys.every(
    (key) =>
      availableKeys.indexOf(key) > -1 && availableMana[key] >= cardMana[key]
  )
  // return false if too much of one kind
  // look at hybrid symbols
  // return false if not able
  // return true
  // return formatMana(card.mana_cost) == cost
  // return true
}

export default canBeCast
