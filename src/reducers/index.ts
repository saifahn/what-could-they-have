import { combineReducers } from 'redux'
import { cardModal } from './cardModal'
import { game } from './game'

export const rootReducer = combineReducers({ cardModal, game })
