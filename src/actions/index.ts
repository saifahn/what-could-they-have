import { Card } from '../common/types'
import { SET_SELECTED_CARD, SET_CARD_MODAL_STATE } from '../constants'

export interface SetCardModalState {
  type: string
  value: boolean
}

export interface SetSelectedCard {
  type: string
  value: Card
}

export type Action = SetCardModalState | SetSelectedCard

export const setCardModalState = (value: boolean): SetCardModalState => ({
  type: SET_CARD_MODAL_STATE,
  value,
})

export const setSelectedCard = (value: Card): SetSelectedCard => ({
  type: SET_SELECTED_CARD,
  value,
})
