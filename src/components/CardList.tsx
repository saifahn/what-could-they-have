import React from 'react'
import { Card } from '../common/types'
import { BaseCard, SplitCard } from './Card'

interface Props {
  cardsToShow: Card[]
}

export default function CardList(props: Props) {
  const { cardsToShow } = props
  return (
    <ul className="CardList mx-auto">
      {cardsToShow &&
        cardsToShow.map((card) => {
          return card.card_faces ? (
            <SplitCard card={card} key={card.name} />
          ) : (
            <BaseCard card={card} key={card.name} />
          )
        })}
    </ul>
  )
}
