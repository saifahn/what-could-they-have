import React from 'react'
import { Card } from '../common/types'
import { SplitCard, BaseCard } from './Card'

interface Props {
  selectedCard: Card | undefined
  cardModalOpen: boolean
  closeModal: () => void
}

export class CardModal extends React.Component<Props> {
  render() {
    const { closeModal, cardModalOpen, selectedCard } = this.props
    return (
      cardModalOpen &&
      selectedCard && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-smoke-800 flex p-4"
          onClick={closeModal}
        >
          <div
            className="relative p-4 bg-white m-auto flex-col flex"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <CardInfo card={selectedCard} />
            <button
              className="mt-4 py-3 bg-pink-700 text-white"
              onClick={closeModal}
            >
              Close Modal
            </button>
          </div>
        </div>
      )
    )
  }
}

function CardInfo({ card }: { card: Card }) {
  return (
    <div>
      {card.card_faces ? <SplitCard card={card} /> : <BaseCard card={card} />}
    </div>
  )
}
