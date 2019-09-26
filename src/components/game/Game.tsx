import React, { Component, RefObject, SyntheticEvent } from 'react'
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
import { RootState } from '../../reducers'

interface State {
  input: RefObject<any>
  showAllCards: boolean
}

interface Props
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps> {}

class Game extends Component<Props, State> {
  public state: State = {
    input: React.createRef(),
    showAllCards: false,
  }

  public constructor(props: Props) {
    super(props)
  }

  private getUnguessedCards = (): Card[] => {
    const { currentGameCards, guessedCards } = this.props
    const guessedCardsSet = new Set(guessedCards)
    return currentGameCards.filter((card) => !guessedCardsSet.has(card))
  }

  private showCards = (): void => {
    this.setState({ showAllCards: true })
  }

  private newGame = (): void => {
    const { startNewGame } = this.props
    startNewGame(this.props.flashCards)
    this.setState({ showAllCards: false })
  }

  private openCard = (cardName: string): void => {
    const { setCardModalState, setSelectedCard, currentGameCards } = this.props
    const card = currentGameCards.find((card) => card.name === cardName)
    if (card) {
      setSelectedCard(card)
    }
    setCardModalState(true)
  }

  private setDifficulty = (event: SyntheticEvent): void => {
    event.preventDefault()
    const { setDifficulty } = this.props
    const mode = this.state.input.current.value
    setDifficulty(mode)
    this.newGame()
  }

  public render(): JSX.Element {
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
          <p className="mt-4 font-medium">
            Your opponent has <span>{formattedMana}</span> available.
          </p>
          <Guesser disabled={isGameOver} cards={currentGameCards} />
          <section className="Feedback">
            <p className="text-red-500">{feedback}</p>
          </section>
          <p>
            You have guessed{' '}
            <span className="font-semibold">{guessedCards.length}</span> out of
            the <span className="font-semibold">{currentGameCards.length}</span>{' '}
            cards that can be cast at instant speed.
          </p>
        </section>
        <section className="mt-4">
          <div className="flex flex-wrap justify-start">
            <button
              onClick={this.newGame}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mr-4"
            >
              New Game
            </button>
            <button
              onClick={this.showCards}
              className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent"
            >
              Give Up
            </button>
          </div>
        </section>
        <section className="GuessedCards">
          <p className="font-medium mt-8">Cards you have guessed:</p>
          <ul className="mt-4">
            {guessedCards.map(
              (card): JSX.Element => (
                <li key={card.name} className="leading-normal">
                  <CardLink onPress={this.openCard}>{card.name}</CardLink>
                </li>
              ),
            )}
          </ul>
        </section>
        {showAllCards && (
          <section className="AllCards mt-6">
            <p className="font-semibold">All Castable Cards</p>
            <ul className="mt-4">
              {this.getUnguessedCards().map(
                (card): JSX.Element => (
                  <li key={card.name} className="leading-normal">
                    <CardLink onPress={this.openCard}>{card.name}</CardLink>
                  </li>
                ),
              )}
            </ul>
          </section>
        )}
      </main>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { flashCards } = state.shared
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
    flashCards,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedCard: (card: Card): void => {
    dispatch(setSelectedCard(card))
  },
  setCardModalState: (value: boolean): void => {
    dispatch(setCardModalState(value))
  },
  setDifficulty: (difficulty: string): void => {
    dispatch(setDifficulty(difficulty))
  },
  startNewGame: (cards: Card[]): void => {
    dispatch(startNewGame(cards))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
