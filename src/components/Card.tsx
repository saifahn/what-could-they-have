import React from 'react'
import { Iconify } from '../functions/Iconify'
import { Card } from '../common/types'
import { createText } from '../functions/formatText'

interface Props {
  card: Card
}

export function BaseCard(props: Props) {
  const { card } = props
  const formattedText = createText(card.oracle_text)
  const manaCost = Iconify(card.mana_cost)
  return (
    <li className="shadow rounded p-4 mt-4">
      <div className="flex justify-between">
        <h3>{card.name}</h3>
        <div>{manaCost}</div>
      </div>
      <p>{card.type_line}</p>
      {formattedText}
    </li>
  )
}

export function SplitCard(props: Props) {
  const { card }: any = props
  return (
    <li className="shadow rounded p-4 mt-4">
      {card.card_faces.map((face: Card, index: number) => {
        const formattedText = createText(face.oracle_text)
        const margin = index != 0 ? ' mt-4' : ''
        const manaCost = Iconify(face.mana_cost)
        return (
          <React.Fragment key={face.name}>
            <div className={`flex justify-between${margin}`}>
              <h3>{face.name}</h3>
              <div>{manaCost}</div>
            </div>
            <p>{face.type_line}</p>
            {formattedText}
          </React.Fragment>
        )
      })}
    </li>
  )
}
