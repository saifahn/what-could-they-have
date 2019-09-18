import { Card } from '../common/types'
import {
  ADD_GUESSED_CARD,
  SET_SELECTED_CARD,
  SET_CARD_MODAL_STATE,
  RESET_GUESSED_CARDS,
  SET_FEEDBACK,
  SET_SHARED_CARDS,
  SET_DIFFICULTY,
  START_NEW_GAME,
  SET_INTRO_TEXT,
} from '../constants'

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

export const addGuessedCard = (value: Card) => ({
  type: ADD_GUESSED_CARD,
  value,
})

export const resetGuessedCards = () => ({
  type: RESET_GUESSED_CARDS,
})

export const setFeedback = (value: string) => ({
  type: SET_FEEDBACK,
  value,
})

export const setSharedCards = (value: Card[]) => ({
  type: SET_SHARED_CARDS,
  value,
})

export const setIntroText = (value: string) => ({
  type: SET_INTRO_TEXT,
  value,
})

export const setDifficulty = (value: string) => ({
  type: SET_DIFFICULTY,
  value,
})

export const startNewGame = (value: Card[]) => ({ type: START_NEW_GAME, value })
