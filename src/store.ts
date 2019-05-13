import { createStore } from 'redux'
import { cardModalReducer } from './reducers'

export const store = createStore(cardModalReducer)
