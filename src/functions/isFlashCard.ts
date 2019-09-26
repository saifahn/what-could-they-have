import { Card } from '../common/types'

/**
 * Takes a card and returns true if the card can be cast at instant speed
 * @param card a Card object to validate instant-speed
 */
export function isFlashCard(card: Card) {
  return (
    card.type_line === 'Instant' ||
    (card.oracle_text && card.oracle_text.includes('Flash'))
  )
}
