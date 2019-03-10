import canBeCast, { formatMana } from './canBeCast'
import { Card } from '../common/types'

const testCards = [
  {
    name: 'Absorb',
    mana_cost: '{W}{U}{U}',
    cmc: 3,
    type_line: 'Instant'
  }
]

test('returns false with uncastable card', () => {
  const testCost = formatMana('RRGG')
  const result = canBeCast(testCards[0], testCost)
  expect(result).toEqual(false)
})

test('returns true with castable card', () => {
  const testCost = formatMana('UUW')
  const result = canBeCast(testCards[0], testCost)
  expect(result).toEqual(true)
})
