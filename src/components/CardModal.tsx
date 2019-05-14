import React from 'react'
import { Card } from '../common/types'

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
          className="fixed inset-0 z-50 overflow-auto bg-grey-darker flex p-4"
          onClick={closeModal}
        >
          <div
            className="relative p-8 bg-white m-auto flex-col flex"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <h3>The selected card is {selectedCard.name}</h3>
            <button
              className="mt-4 py-3 bg-blue text-white"
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
