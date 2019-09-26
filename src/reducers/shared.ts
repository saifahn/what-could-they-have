import { Card } from '../common/types'
import { SET_FLASH_CARDS, SET_INTRO_TEXT, SET_ALL_CARDS } from '../constants'
import { AnyAction } from 'redux'

export interface SharedState {
  allCards: Card[]
  flashCards: Card[]
  introText: string
}

const INITIAL_STATE: SharedState = {
  allCards: [],
  flashCards: [],
  introText: '',
}

export function shared(state = INITIAL_STATE, action: AnyAction): SharedState {
  switch (action.type) {
    case SET_ALL_CARDS:
      return { ...state, allCards: action.value }
    case SET_FLASH_CARDS:
      return { ...state, flashCards: action.value }
    case SET_INTRO_TEXT:
      return { ...state, introText: action.value }
  }
  return state
}
