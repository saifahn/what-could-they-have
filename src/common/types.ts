export interface Card {
  name: string
  mana_cost?: string
  cmc?: number
  type_line: string
  power?: string
  toughness?: string
  layout?: string
  card_faces?: Card[]
  oracle_text?: string
}

// maybe change card face to its own thing
