import canBeCast, { formatMana } from './canBeCast'
import { Card } from '../common/types'

const testCards: Card[] = [
  {
    name: 'Absorb',
    mana_cost: '{W}{U}{U}',
    cmc: 3,
    type_line: 'Instant'
  },
  {
    name: 'Applied Biomancy',
    mana_cost: '{G}{U}',
    cmc: 2,
    type_line: 'Instant'
  },
  {
    name: 'Angel of Grace',
    mana_cost: '{3}{W}{W}',
    cmc: 5,
    type_line: 'Creature — Angel'
  },
  {
    name: 'Collision // Colossus',
    mana_cost: '1{R/G} // {R}{G}',
    cmc: 4,
    type_line: 'Instant // Instant',
    layout: 'split',
    card_faces: [
      {
        name: 'Collision',
        mana_cost: '1{R/G}',
        type_line: 'Instant'
      },
      {
        name: 'Colossus',
        mana_cost: '{R}{G}',
        type_line: 'Instant'
      }
    ]
  },
  {
    name: 'Incubation // Incongruity',
    mana_cost: '{G/U} // {1}{G}{U}',
    cmc: 4,
    type_line: 'Sorcery // Instant',
    layout: 'split',
    card_faces: [
      {
        name: 'Incubation',
        mana_cost: '{G/U}',
        type_line: 'Sorcery'
      },
      {
        name: 'Incongruity',
        mana_cost: '{1}{G}{U}',
        type_line: 'Instant'
      }
    ]
  },
  {
    name: "Lawmage's Binding",
    mana_cost: '{1}{W}{U}',
    cmc: 3,
    type_line: 'Enchantment — Aura'
  },
  {
    name: 'Warrant // Warden',
    mana_cost: '{W/U}{W/U} // {3}{W}{U}',
    cmc: 7,
    type_line: 'Instant // Sorcery',
    layout: 'split',
    card_faces: [
      {
        name: 'Warrant',
        mana_cost: '{W/U}{W/U}',
        type_line: 'Instant'
      },
      {
        name: 'Warden',
        mana_cost: '{3}{W}{U}',
        type_line: 'Sorcery'
      }
    ]
  }
]

const absorbCard = testCards.find((card) => card.name === 'Absorb') as Card

const incubationIncongruityCard = testCards.find(
  (card) => card.name === 'Incubation // Incongruity'
) as Card

const warrantWardenCard = testCards.find(
  (card) => card.name === 'Warrant // Warden'
) as Card

describe('formatMana function returns a usable manaObject', () => {
  it('returns an appropriate object based on the cost', () => {
    const cost = '{2}{W}{U}'
    const expected = {
      generic: 2,
      W: 1,
      U: 1,
      cmc: 4
    }
    const actual = formatMana(cost)
    expect(actual).toMatchObject(expected)
  })
})

describe('canBeCast determines if card is castable', () => {
  test('returns false with uncastable card by cmc', () => {
    const testCost = '{R}{G}'
    const result = canBeCast(absorbCard, testCost)
    expect(result).toEqual(false)
  })

  test('returns false with uncastable card by colour', () => {
    const testCost = '{R}{R}{W}{W}'
    const result = canBeCast(absorbCard, testCost)
    expect(result).toEqual(false)
  })

  test('returns true with exactly castable card', () => {
    const testCost = '{U}{U}{W}'
    const result = canBeCast(absorbCard, testCost)
    expect(result).toEqual(true)
  })

  test('returns true with non-exact castable card', () => {
    const testCost = '{6}{U}{U}{U}{W}'
    const result = canBeCast(absorbCard, testCost)
    expect(result).toEqual(true)
  })

  test('returns true with castable split card', () => {
    const testCost = '{G}{G}{U}{U}'
    const result = canBeCast(incubationIncongruityCard, testCost)
    expect(result).toEqual(true)
  })

  test('returns false with uncastable split card', () => {
    const testCost = '{R}{R}{W}{W}'
    const result = canBeCast(incubationIncongruityCard, testCost)
    expect(result).toEqual(false)
  })

  test('returns false with uncastable instant hybrid card', () => {
    const testCost = '{R}{B}'
    const result = canBeCast(warrantWardenCard, testCost)
    expect(result).toEqual(false)
  })

  test('returns true with castable instant hybrid card', () => {
    const testCost = '{U}{W}'
    const result = canBeCast(warrantWardenCard, testCost)
    expect(result).toEqual(true)
  })

  test('returns false if a sorcery face of a split card is castable, but not the instant face', () => {
    const testCost = '{G}'
    const result = canBeCast(incubationIncongruityCard, testCost)
    expect(result).toEqual(false)
  })

  // test('calculates with high generic mana', () => {
  //   // works with a hypothetical spell of {10}{R}{W}
  // })

  // test('works with mana in the wrong order')
  // maybe it's fine to assume that the number will always come first?

  // test ('works with mana that is a combination of hybrid and non')
  // this doesn't happen too much in magic at the moment so it's fine for now I think

  // tests should have different var names
})
