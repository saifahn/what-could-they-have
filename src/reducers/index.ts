import { combineReducers } from 'redux'
import { cardModal, CardModalState } from './cardModal'
import { game, GameState } from './game'
import { shared, SharedState } from './shared'

export const rootReducer = combineReducers({ cardModal, game, shared })

export interface RootState {
  readonly cardModal: CardModalState
  readonly shared: SharedState
  readonly game: GameState
}
