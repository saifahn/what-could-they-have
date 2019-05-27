import { combineReducers } from 'redux'
import { cardModal } from './cardModal'
import { game } from './game'
import { shared } from './shared'

export const rootReducer = combineReducers({ cardModal, game, shared })
