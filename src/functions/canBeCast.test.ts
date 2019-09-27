import canBeCast, { formatMana } from './canBeCast'
import generateMana from './generateMana'
import { Card } from '../common/types'

const testCards: Card[] = [
  {
    name: 'Absorb',
    mana_cost: '{W}{U}{U}',
    cmc: 3,
    type_line: 'Instant',
  },
  {
    name: 'Applied Biomancy',
    mana_cost: '{G}{U}',
    cmc: 2,
    type_line: 'Instant',
  },
  {
    name: 'Angel of Grace',
    mana_cost: '{3}{W}{W}',
    cmc: 5,
    type_line: 'Creature — Angel',
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
        type_line: 'Instant',
      },
      {
        name: 'Colossus',
        mana_cost: '{R}{G}',
        type_line: 'Instant',
      },
    ],
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
        type_line: 'Sorcery',
      },
      {
        name: 'Incongruity',
        mana_cost: '{1}{G}{U}',
        type_line: 'Instant',
      },
    ],
  },
  {
    name: "Lawmage's Binding",
    mana_cost: '{1}{W}{U}',
    cmc: 3,
    type_line: 'Enchantment — Aura',
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
        type_line: 'Instant',
      },
      {
        name: 'Warden',
        mana_cost: '{3}{W}{U}',
        type_line: 'Sorcery',
      },
    ],
  },
  {
    name: 'Ardenvale Tactician // Dizzying Swoop',
    colors: ['W'],
    cmc: 3,
    mana_cost: '{1}{W}{W} // {1}{W}',
    image_uri_normal:
      'https://img.scryfall.com/cards/normal/front/c/7/c7d5e394-8e41-442e-ae97-a478a61e1b9d.jpg?1568302736',
    scryfall_uri:
      'https://scryfall.com/card/eld/5/ardenvale-tactician-dizzying-swoop?utm_source=api',
    type_line: 'Creature — Human Knight // Instant — Adventure',
    power: '2',
    toughness: '3',
    card_faces: [
      {
        object: 'card_face',
        name: 'Ardenvale Tactician',
        mana_cost: '{1}{W}{W}',
        type_line: 'Creature — Human Knight',
        oracle_text: 'Flying',
        power: '2',
        toughness: '3',
        flavor_text:
          'In a castle that prizes loyalty above all, the bond between knight and griffin is unmatched.',
        artist: 'Jason Rainville',
        artist_id: '6ed7e669-579b-443d-b223-e5cbcb2a7483',
        illustration_id: '627d6163-08a5-40b8-938c-264d01ec29bb',
      },
      {
        object: 'card_face',
        name: 'Dizzying Swoop',
        mana_cost: '{1}{W}',
        type_line: 'Instant — Adventure',
        oracle_text:
          'Tap up to two target creatures. (Then exile this card. You may cast the creature later from exile.)',
        artist: 'Jason Rainville',
        artist_id: '6ed7e669-579b-443d-b223-e5cbcb2a7483',
      },
    ],
    layout: 'adventure',
    scryfall_id: 'c7d5e394-8e41-442e-ae97-a478a61e1b9d',
  },
]

const absorbCard = testCards.find((card) => card.name === 'Absorb') as Card

const incubationIncongruityCard = testCards.find(
  (card) => card.name === 'Incubation // Incongruity',
) as Card

const warrantWardenCard = testCards.find(
  (card) => card.name === 'Warrant // Warden',
) as Card

const ardenvaleTacticianCard = testCards.find((card) =>
  card.name.includes('Ardenvale Tactician'),
) as Card

describe('formatMana function returns a usable manaObject', () => {
  it('returns an appropriate object based on the cost', () => {
    const cost = '{2}{W}{U}'
    const expected = {
      generic: 2,
      W: 1,
      U: 1,
      cmc: 4,
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

  test('is case-insensitive', () => {
    const testCost = '{u}{w}'
    const result = canBeCast(warrantWardenCard, testCost)
    expect(result).toEqual(true)
  })

  test('it returns the correct result for adventure cards', () => {
    const testCost = '{W}{W}{G}'
    const result = canBeCast(ardenvaleTacticianCard, testCost)
    expect(result).toEqual(true)
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

describe('integration? and other tests', () => {
  test('filtering using canBeCast gives the correct cards', () => {
    const testCost = '{W}{W}{U}{U}'
    const result = testCards.filter((card) => canBeCast(card, testCost))
    expect(result.length).toEqual(4)
  })

  test('generateMana can be used with canBeCast', () => {
    const testCost = generateMana({ lengthToGenerate: 4, coloursToGenerate: 4 })
    const result = testCards.filter((card) => canBeCast(card, testCost))
    expect(result.length).toBeGreaterThan(0)
  })
})
