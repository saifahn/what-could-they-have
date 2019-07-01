import { Card } from '../common/types'
import { Action } from '../actions'
import { SET_CARD_MODAL_STATE, SET_SELECTED_CARD } from '../constants'
import { AnyAction } from 'redux'

export interface CardModalState {
  selectedCard: Card | undefined
  cardModalOpen: boolean
}

const INITIAL_STATE: CardModalState = {
  selectedCard: undefined,
  cardModalOpen: false,
}

export function cardModal(
  state = INITIAL_STATE,
  action: AnyAction,
): CardModalState {
  switch (action.type) {
    case SET_CARD_MODAL_STATE:
      return { ...state, cardModalOpen: action.value as boolean }
    case SET_SELECTED_CARD:
      return { ...state, selectedCard: action.value as Card }
  }
  return state
}
