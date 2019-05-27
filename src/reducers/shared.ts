import { Card } from '../common/types'
import { SET_SHARED_CARDS } from '../constants'
import { AnyAction } from 'redux'

export interface SharedState {
  cards: Card[]
}

const INITIAL_STATE: SharedState = {
  cards: [],
}

export function shared(state = INITIAL_STATE, action: AnyAction): SharedState {
  switch (action.type) {
    case SET_SHARED_CARDS:
      return { ...state, cards: action.value }
  }
  return state
}
