import React from 'react'
import { Card } from '../../common/types'
import { SplitCard, BaseCard } from '../Card'
import { connect } from 'react-redux'
import { StoreState } from '../../reducers'
import { Dispatch } from 'redux'
import { setCardModalState } from '../../actions'

interface Props {
  selectedCard: Card | undefined
  cardModalOpen: boolean
  closeModal: () => void
}

export const CardModalComponent: React.SFC<Props> = ({
  selectedCard,
  cardModalOpen,
  closeModal,
}) =>
  (cardModalOpen && selectedCard && (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-smoke-800 flex p-4"
      onClick={closeModal}
    >
      <div
        className="relative p-6 bg-white max-w-md m-auto flex-col flex"
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
  )) ||
  null

function CardInfo({ card }: { card: Card }) {
  return (
    <div>
      {card.card_faces ? <SplitCard card={card} /> : <BaseCard card={card} />}
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  const { selectedCard, cardModalOpen } = state
  return { selectedCard, cardModalOpen }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeModal: () => dispatch(setCardModalState(false)),
})

export const CardModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardModalComponent)
