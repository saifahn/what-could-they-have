import { Card } from '../common/types'
import { AnyAction } from 'redux'
import {
  ADD_GUESSED_CARD,
  RESET_GUESSED_CARDS,
  SET_FEEDBACK,
  SET_DIFFICULTY,
  START_NEW_GAME,
} from '../constants'
import generateMana, { GenerateManaParams } from '../functions/generateMana'
import canBeCast from '../functions/canBeCast'

export interface GameState {
  availableMana: string
  currentGameCards: Card[]
  guessedCards: Card[]
  feedback: string
  difficulty: string
  coloursToGenerate: number
  lengthToGenerate: number
}

const INITIAL_STATE: GameState = {
  availableMana: '',
  currentGameCards: [],
  guessedCards: [],
  feedback: '',
  difficulty: '',
  coloursToGenerate: 1,
  lengthToGenerate: 3,
}

export function generateGameVariables(difficulty: string): GenerateManaParams {
  let coloursToGenerate, lengthToGenerate
  switch (difficulty) {
    case 'basic':
      coloursToGenerate = 1
      lengthToGenerate = 3
      break
    case 'common':
      coloursToGenerate = 2
      lengthToGenerate = 4
      break
    case 'uncommon':
      coloursToGenerate = 3
      lengthToGenerate = 5
      break
    case 'rare':
      coloursToGenerate = 4
      lengthToGenerate = 6
      break
    case 'mythic':
      coloursToGenerate = 5
      lengthToGenerate = 7
      break
    default:
      coloursToGenerate = 1
      lengthToGenerate = 3
      break
  }
  return { coloursToGenerate, lengthToGenerate }
}

export function game(state = INITIAL_STATE, action: AnyAction): GameState {
  switch (action.type) {
    case ADD_GUESSED_CARD:
      return { ...state, guessedCards: [...state.guessedCards, action.value] }
    case RESET_GUESSED_CARDS:
      return { ...state, guessedCards: [] }
    case SET_FEEDBACK:
      return { ...state, feedback: action.value }
    case SET_DIFFICULTY:
      var { coloursToGenerate, lengthToGenerate } = generateGameVariables(
        action.value,
      )
      return {
        ...state,
        difficulty: action.value,
        coloursToGenerate,
        lengthToGenerate,
      }
    case START_NEW_GAME:
      var feedback = ''
      var guessedCards: Card[] = []
      var { coloursToGenerate, lengthToGenerate } = state
      var availableMana = generateMana({
        coloursToGenerate,
        lengthToGenerate,
      })
      var currentGameCards = action.value.filter(
        (card: Card): boolean => canBeCast(card, availableMana),
      )
      return {
        ...state,
        feedback,
        guessedCards,
        availableMana,
        currentGameCards,
      }
  }
  return state
}
