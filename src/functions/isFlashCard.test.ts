import { isFlashCard } from './isFlashCard'
import { Card } from '../common/types'

const testCards: Card[] = [
  {
    name: 'Animating Faerie // Bring to Life',
    colors: ['U'],
    cmc: 3,
    mana_cost: '{2}{U} // {2}{U}',
    image_uri_normal:
      'https://img.scryfall.com/cards/normal/front/3/2/32158458-42eb-41bc-a15a-11af28463eb0.jpg?1567699081',
    scryfall_uri:
      'https://scryfall.com/card/eld/38/animating-faerie-bring-to-life?utm_source=api',
    type_line: 'Creature — Faerie // Sorcery — Adventure',
    power: '2',
    toughness: '2',
    card_faces: [
      {
        name: 'Animating Faerie',
        mana_cost: '{2}{U}',
        type_line: 'Creature — Faerie',
        oracle_text: 'Flying',
        power: '2',
        toughness: '2',
      },
      {
        name: 'Bring to Life',
        mana_cost: '{2}{U}',
        type_line: 'Sorcery — Adventure',
        oracle_text:
          'Target noncreature artifact you control becomes a 0/0 artifact creature. Put four +1/+1 counters on it.',
      },
    ],
    layout: 'adventure',
    scryfall_id: '32158458-42eb-41bc-a15a-11af28463eb0',
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
  {
    name: 'Bake into a Pie',
    colors: ['B'],
    cmc: 4,
    mana_cost: '{2}{B}{B}',
    image_uri_normal:
      'https://img.scryfall.com/cards/normal/front/4/2/42a4d090-1bb7-4334-ab22-e2527391e79b.jpg?1567699206',
    scryfall_uri:
      'https://scryfall.com/card/eld/76/bake-into-a-pie?utm_source=api',
    type_line: 'Instant',
    layout: 'normal',
    scryfall_id: '42a4d090-1bb7-4334-ab22-e2527391e79b',
    oracle_text:
      'Destroy target creature. Create a Food token. (It\'s an artifact with "{2}, {T}, Sacrifice this artifact: You gain 3 life.")',
  },
]

const animatingFaerieCard = testCards.find((card) =>
  card.name.includes('Animating Faerie'),
) as Card

const ardenvaleTacticianCard = testCards.find((card) =>
  card.name.includes('Ardenvale Tactician'),
) as Card

const bakeIntoPieCard = testCards.find((card) =>
  card.name.includes('Bake into a Pie'),
) as Card

test('isFlashCard returns true with a single-faced instant', () => {
  expect(isFlashCard(bakeIntoPieCard)).toEqual(true)
})

test('isFlashCard returns false with a double-faced sorcery', () => {
  expect(isFlashCard(animatingFaerieCard)).toEqual(false)
})

test('isFlashCard returns true with a double-faced card that has at least one instant', () => {
  expect(isFlashCard(ardenvaleTacticianCard)).toEqual(true)
})
