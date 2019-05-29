import React, { Component, RefObject, SyntheticEvent } from 'react'
import data from '../../sets/WAR-card-base.json'
import { Card } from '../../common/types'
import { iconify } from '../../functions/iconify'
import { CardLink } from '../CardLink'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  setSelectedCard,
  setCardModalState,
  setDifficulty,
  startNewGame,
} from '../../actions'
import { DifficultySelector } from './DifficultySelector'
import { Guesser } from './Guesser'

interface State {
  input: RefObject<any>
  showAllCards: boolean
}

interface ConnectProps {
  availableMana: string
  difficulty: string
  selectedCard: Card | undefined
  cardModalOpen: boolean
  feedback: string
  currentGameCards: Card[]
  guessedCards: Card[]
  coloursToGenerate: number
  lengthToGenerate: number
  startNewGame: (cards: Card[]) => void
  setSelectedCard: (card: Card) => void
  setCardModalState: (value: boolean) => void
  addGuessedCard: (card: Card) => void
  resetGuessedCards: () => void
  setDifficulty: (difficulty: string) => void
}

interface Props extends ConnectProps {}

class Game extends Component<Props, State> {
  state: State = {
    input: React.createRef(),
    showAllCards: false,
  }

  constructor(props: any) {
    super(props)
  }

  getUnguessedCards = () => {
    const { currentGameCards, guessedCards } = this.props
    const guessedCardsSet = new Set(guessedCards)
    return currentGameCards.filter((card) => !guessedCardsSet.has(card))
  }

  showCards = () => {
    this.setState({ showAllCards: true })
  }

  newGame = () => {
    const { startNewGame } = this.props
    startNewGame(data as Card[])
    this.setState({ showAllCards: false })
  }

  openCard = (cardName: string) => {
    const { setCardModalState, setSelectedCard, currentGameCards } = this.props
    const card = currentGameCards.find((card) => card.name === cardName)
    if (card) {
      setSelectedCard(card)
    }
    setCardModalState(true)
  }

  setDifficulty = (event: SyntheticEvent) => {
    event.preventDefault()
    const { setDifficulty } = this.props
    const mode = this.state.input.current.value
    setDifficulty(mode)
    this.newGame()
  }

  render() {
    const { input, showAllCards } = this.state
    const {
      currentGameCards,
      availableMana,
      guessedCards,
      feedback,
    } = this.props
    const formattedMana = iconify(availableMana)
    const isGameOver =
      showAllCards || guessedCards.length === currentGameCards.length

    return (
      <main>
        <section>
          <DifficultySelector
            reference={input}
            setDifficulty={this.setDifficulty}
          />
          <p className="mt-4 font-semibold">
            Your opponent has <span>{formattedMana}</span> available.
          </p>
          <Guesser disabled={isGameOver} cards={currentGameCards} />
          <section className="Feedback">
            <p className="text-red-500">{feedback}</p>
          </section>
          <p>
            You have guessed <strong>{guessedCards.length}</strong> out of the{' '}
            <strong>{currentGameCards.length}</strong> cards that can be cast at
            instant speed.
          </p>
        </section>
        <section className="mt-4">
          <div className="flex flex-wrap justify-start">
            <button
              onClick={this.newGame}
              className="bg-pink-700 hover:bg-pink-800 text-white py-2 px-4 mr-4"
            >
              New Game
            </button>
            <button
              onClick={this.showCards}
              className="bg-transparent hover:bg-pink-700 text-pink-700 hover:text-white py-2 px-4 border border-pink-700 hover:border-transparent"
            >
              Give Up
            </button>
          </div>
        </section>
        <section className="GuessedCards">
          <p className="font-semibold mt-8">Cards you have guessed:</p>
          <ul className="mt-4">
            {guessedCards.map((card) => (
              <li key={card.name} className="leading-normal">
                <CardLink onPress={this.openCard}>{card.name}</CardLink>
              </li>
            ))}
          </ul>
        </section>
        {showAllCards && (
          <section className="AllCards mt-6">
            <p className="font-semibold">All Castable Cards</p>
            <ul className="mt-4">
              {this.getUnguessedCards().map((card) => (
                <li key={card.name} className="leading-normal">
                  <CardLink onPress={this.openCard}>{card.name}</CardLink>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { selectedCard, cardModalOpen } = state.cardModal
  const {
    availableMana,
    currentGameCards,
    guessedCards,
    feedback,
    difficulty,
    coloursToGenerate,
    lengthToGenerate,
  } = state.game
  return {
    availableMana,
    selectedCard,
    cardModalOpen,
    currentGameCards,
    guessedCards,
    feedback,
    difficulty,
    coloursToGenerate,
    lengthToGenerate,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedCard: (card: Card) => {
    dispatch(setSelectedCard(card))
  },
  setCardModalState: (value: boolean) => {
    dispatch(setCardModalState(value))
  },
  setDifficulty: (difficulty: string) => {
    dispatch(setDifficulty(difficulty))
  },
  startNewGame: (cards: Card[]) => {
    dispatch(startNewGame(cards))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
