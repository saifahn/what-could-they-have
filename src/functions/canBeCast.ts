import { Card } from '../common/types'

export function formatMana(cost: string) {
  const manaRE = /\{([\dWUBRG/]+)\}/g
  const manaObject: any = { cmc: 0 }
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

function assignNumToColour(symbol: string): number {
  const value = symbol.length === 1 ? symbol : 'other'
  let number
  switch (value) {
    case 'W':
      number = 1
      break
    case 'U':
      number = 2
      break
    case 'B':
      number = 3
      break
    case 'R':
      number = 4
      break
    case 'G':
      number = 5
      break
    case 'other':
      number = 6
      break
    default:
      return 7
  }
  return number
}

function canBeCast(card: Card, cost: string): boolean {
  /*
    takes a card and a mana cost
    returns true if the card can be cast
  */
  if (!card.mana_cost) {
    // console.log(`the card is ${card.name} and it doesn't have a cost`)
    return false
  }
  const availableMana = formatMana(cost)
  const cardMana = formatMana(card.mana_cost)

  if (card.card_faces) {
    const firstFace = card.card_faces[0]
    const secondFace = card.card_faces[1]
    // stop evaluating a face if it isn't instant
    const firstFaceCastable =
      firstFace.type_line == 'Instant' ? canBeCast(firstFace, cost) : false
    const secondFaceCastable =
      secondFace.type_line == 'Instant' ? canBeCast(secondFace, cost) : false
    // if one face is castable, then the whole card is valid
    // console.log(firstFaceCastable)
    // console.log(secondFaceCastable)
    // console.log('this passed here')
    return firstFaceCastable || secondFaceCastable
  }

  if (availableMana.cmc < cardMana.cmc) {
    // console.log(`the card is ${card.name} and it has too high a cost`)
    return false
  }

  const cardEntries = Object.entries(cardMana)
  cardEntries.sort((a, b) => {
    const aColour = assignNumToColour(a[0])
    const bColour = assignNumToColour(b[0])
    return aColour - bColour
  })
  // go through each cardEntry
  for (let i = 0; i < cardEntries.length; i++) {
    const symbol = cardEntries[i][0]
    if (symbol == 'cmc' || symbol == 'generic') {
      continue
    }

    let amount: any = cardEntries[i][1]
    // if hybrid
    const hybridRE = /([WUBRG2])\/([WUBRGCP])/
    const hybridMatch = symbol.match(hybridRE)
    if (hybridMatch) {
      const firstSymbol = hybridMatch[1]
      const secondSymbol = hybridMatch[2]
      // console.log(availableMana, hybridMatch[1], hybridMatch[2])
      while (amount > 0) {
        if (
          availableMana.hasOwnProperty(firstSymbol) &&
          availableMana[firstSymbol] > 0
        ) {
          availableMana[firstSymbol]--
          amount--
        } else if (
          availableMana.hasOwnProperty(secondSymbol) &&
          availableMana[secondSymbol] > 0
        ) {
          availableMana[secondSymbol]--
          amount--
        } else {
          amount--
          return false
        }
      }
    }
    // while there is more than 0 as the amount of that mana
    while (amount > 0) {
      // look in availableMana for that one, take 1 away
      // console.log(card.name, cost, symbol, availableMana[symbol])
      availableMana[symbol]--
      if (availableMana[symbol] < 0 || isNaN(availableMana[symbol])) {
        return false
      }
      amount--
    }
  }
  return true
}

export default canBeCast
