import React from 'react'
import { Card } from '../common/types'

interface Props {
  card: Card
}

export function BaseCard(props: Props) {
  const { card } = props
  return (
    <li className="Card">
      <div className="flex justify-between">
        <h3>{card.name}</h3>
        <h4>{card.mana_cost}</h4>
      </div>
      <p>{card.type_line}</p>
      <p>{card.oracle_text}</p>
    </li>
  )
}

export function SplitCard(props: Props) {
  const { card }: any = props
  return (
    <li className="Card">
      {card.card_faces.map((face: Card) => {
        return (
          <>
            <div className="flex justify-between">
              <h3>{face.name}</h3>
              <h4>{face.mana_cost}</h4>
            </div>
            <p>{face.type_line}</p>
            <p>{face.oracle_text}</p>
          </>
        )
      })}
    </li>
  )
}
