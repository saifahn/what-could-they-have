import { Card } from '../common/types'

/**
 * Takes a card and returns true if the card can be cast at instant speed
 * @param card a Card object to validate instant-speed
 */
export function isFlashCard(card: Card) {
  // return false instead of undefined if falsy
  return !!(
    card.type_line.includes('Instant') ||
    (card.oracle_text &&
      card.oracle_text.includes('Flash') &&
      !card.oracle_text.includes('Flashback'))
  )
}
