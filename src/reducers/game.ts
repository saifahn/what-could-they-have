import { Card } from '../common/types'
import { AnyAction } from 'redux'
import {
  ADD_GUESSED_CARD,
  RESET_GUESSED_CARDS,
  SET_FEEDBACK,
} from '../constants'

export interface GameState {
  guessedCards: Card[]
  feedback: string
}

const INITIAL_STATE: GameState = {
  guessedCards: [],
  feedback: '',
}

export function game(state = INITIAL_STATE, action: AnyAction): GameState {
  switch (action.type) {
    case ADD_GUESSED_CARD:
      // const { guessedCards } = state
      // guessedCards.push(action.value)
      return { ...state, guessedCards: [...state.guessedCards, action.value] }
    case RESET_GUESSED_CARDS:
      return { ...state, guessedCards: [] }
    case SET_FEEDBACK:
      return { ...state, feedback: action.value }
  }
  return state
}
