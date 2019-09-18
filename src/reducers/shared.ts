import { Card } from '../common/types'
import { SET_SHARED_CARDS, SET_INTRO_TEXT } from '../constants'
import { AnyAction } from 'redux'

export interface SharedState {
  cards: Card[]
  introText: string
}

const INITIAL_STATE: SharedState = {
  cards: [],
  introText: '',
}

export function shared(state = INITIAL_STATE, action: AnyAction): SharedState {
  switch (action.type) {
    case SET_SHARED_CARDS:
      return { ...state, cards: action.value }
    case SET_INTRO_TEXT:
      return { ...state, introText: action.value }
  }
  return state
}
