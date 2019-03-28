import React from 'react'
import { Card } from '../common/types'
import { formatText } from '../functions/formatText'

interface Props {
  card: Card
}

export function BaseCard(props: Props) {
  const { card } = props
  const formattedText = formatText(card.oracle_text)
  return (
    <li className="Card">
      <div className="flex justify-between">
        <h3>{card.name}</h3>
        <h4>{card.mana_cost}</h4>
      </div>
      <p>{card.type_line}</p>
      <p dangerouslySetInnerHTML={formattedText} />
    </li>
  )
}

export function SplitCard(props: Props) {
  const { card }: any = props
  return (
    <li className="Card">
      {card.card_faces.map((face: Card) => {
        const formattedText = formatText(face.oracle_text)
        return (
          <>
            <div className="flex justify-between">
              <h3>{face.name}</h3>
              <h4>{face.mana_cost}</h4>
            </div>
            <p>{face.type_line}</p>
            <p dangerouslySetInnerHTML={formattedText} />
          </>
        )
      })}
    </li>
  )
}