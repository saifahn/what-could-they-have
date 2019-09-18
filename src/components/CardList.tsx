import React from 'react'
import { Card } from '../common/types'
import { BaseCard, SplitCard } from './Card'

interface Props {
  cardsToShow: Card[]
}

export default function CardList(props: Props) {
  const { cardsToShow } = props
  return (
    <ul className="max-w-md">
      {cardsToShow &&
        cardsToShow.map((card) => (
          <li className="border p-4 mt-4 rounded" key={card.name}>
            {card.card_faces ? (
              <SplitCard card={card} />
            ) : (
              <BaseCard card={card} />
            )}
          </li>
        ))}
    </ul>
  )
}
