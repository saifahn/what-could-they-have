import { Card } from '../common/types'

export function formatMana(cost: string): string {
  return cost
    .replace(/[{}]/g, '')
    .split('')
    .sort()
    .join('')
}

function canBeCast(card: Card, cost: string): boolean {
  /*
    takes a card and a mana cost
    returns true if the card can be cast
  */
  // take the card's mana cost
  // format it
  // take the cost
  // format it
  // compare the two
  if (!card.mana_cost) {
    return false
  }
  return formatMana(card.mana_cost) == cost
}

export default canBeCast
