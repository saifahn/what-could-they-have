import { formatText } from './formatText'
import { Card } from '../common/types'

const testCards: Card[] = [
  {
    name: 'Absorb',
    type_line: 'Instant',
    oracle_text: 'Counter target spell. You gain 3 life.'
  },
  {
    name: 'Angel of Grace',
    type_line: 'Creature — Angel',
    oracle_text:
      'Flash\nFlying\nWhen Angel of Grace enters the battlefield, until end of turn, damage that would reduce your life total to less than 1 reduces it to 1 instead.\n{4}{W}{W}, Exile Angel of Grace from your graveyard: Your life total becomes 10.'
  },
  {
    name: 'Applied Biomancy',
    type_line: 'Instant',
    oracle_text:
      "Choose one or both —\n• Target creature gets +1/+1 until end of turn.\n• Return target creature to its owner's hand."
  },
  {
    name: 'Price of Fame',
    type_line: 'Instant',
    oracle_text:
      'This spell costs {2} less to cast if it targets a legendary creature.\nDestroy target creature.\nSurveil 2. (Look at the top two cards of your library, then put any number of them into your graveyard and the rest on top of your library in any order.)'
  },
  {
    name: 'Radical Idea',
    type_line: 'Instant',
    oracle_text:
      'Draw a card.\nJump-start (You may cast this card from your graveyard by discarding a card in addition to paying its other costs. Then exile this card.)'
  },
  {
    name: 'Unbreakable Formation',
    type_line: 'Instant',
    oracle_text:
      'Creatures you control gain indestructible until end of turn.\nAddendum — If you cast this spell during your main phase, put a +1/+1 counter on each of those creatures and they gain vigilance until end of turn.'
  },
  {
    name: 'Warrant // Warden',
    mana_cost: '{W/U}{W/U} // {3}{W}{U}',
    type_line: 'Instant // Sorcery',
    card_faces: [
      {
        name: 'Warrant',
        mana_cost: '{W/U}{W/U}',
        type_line: 'Instant',
        oracle_text:
          "Put target attacking or blocking creature on top of its owner's library."
      },
      {
        name: 'Warden',
        mana_cost: '{3}{W}{U}',
        type_line: 'Sorcery',
        oracle_text:
          'Create a 4/4 white and blue Sphinx creature token with flying and vigilance.'
      }
    ]
  }
]

const absorb = testCards.find((card) => card.name === 'Absorb') as Card

const appliedBiomancy = testCards.find(
  (card) => card.name === 'Applied Biomancy'
) as Card

const priceOfFame = testCards.find(
  (card) => card.name === 'Price of Fame'
) as Card

const radicalIdea = testCards.find(
  (card) => card.name === 'Radical Idea'
) as Card

const unbreakableFormation = testCards.find(
  (card) => card.name === 'Unbreakable Formation'
) as Card

it('italicizes text with reminder text', () => {
  const original = priceOfFame.oracle_text as string
  const result = formatText(original).__html
  expect(result).not.toEqual(original)
  expect(result).toContain('<em>')
})

it("doesn't italicize text without reminder text", () => {
  const original = absorb.oracle_text as string
  const result = formatText(original).__html
  expect(result).toEqual(original)
})

it("doesn't add line breaks when not appropriate", () => {
  const original = absorb.oracle_text as string
  const result = formatText(original).__html
  expect(result).not.toContain('<br>')
})

it('adds line breaks as appropriate', () => {
  const original = priceOfFame.oracle_text as string
  const result = formatText(original).__html
  expect(result).toContain('<br>')
})

it('italicizes ability keywords', () => {
  const original = unbreakableFormation.oracle_text as string
  const result = formatText(original).__html
  expect(result).toContain('<em>')
})

it("doesn't italicize non-ability keywords before an em-dash", () => {
  const original = appliedBiomancy.oracle_text as string
  const result = formatText(original).__html
  expect(result).not.toContain('<em>')
})

it('returns falsy value given no text', () => {
  const result = formatText(undefined).__html
  expect(result).toBeFalsy()
})

// it('formats modal spells correctly')
