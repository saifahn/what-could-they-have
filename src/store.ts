import { createStore, applyMiddleware, AnyAction } from 'redux'
import { rootReducer, RootState } from './reducers'
import thunk, { ThunkDispatch as OriginalThunkDispatch } from 'redux-thunk'

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type ThunkDispatch = OriginalThunkDispatch<RootState, any, AnyAction>
