import React, { Component, RefObject, SyntheticEvent } from 'react'
import canBeCast from '../../functions/canBeCast'
import generateMana from '../../functions/generateMana'
import data from '../../sets/WAR-card-base.json'
import { Card } from '../../common/types'
import { iconify } from '../../functions/iconify'
import { CardLink } from '../CardLink'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setSelectedCard, setCardModalState } from '../../actions'
import { DifficultySelector } from './DifficultySelector'
import { Guesser } from './Guesser'

interface State {
  cards: Card[]
  availableMana: string
  len: number
  coloursToGenerate: number
  // TODO: convert to enum in a different file
  mode: 'basic' | 'common' | 'uncommon' | 'rare' | 'mythic'
  input: RefObject<any>
  showAllCards: boolean
}

interface ConnectProps {
  selectedCard: Card | undefined
  cardModalOpen: boolean
  feedback: string
  guessedCards: Card[]
  setSelectedCard: (card: Card) => void
  setCardModalState: (value: boolean) => void
  addGuessedCard: (card: Card) => void
  resetGuessedCards: () => void
}

interface Props extends ConnectProps {}

class Game extends Component<Props, State> {
  state: State = {
    cards: [],
    availableMana: '',
    len: 3,
    coloursToGenerate: 1,
    mode: 'basic',
    input: React.createRef(),
    showAllCards: false,
  }

  constructor(props: any) {
    super(props)
  }

  getUnguessedCards = () => {
    const { cards } = this.state
    const guessedCardsSet = new Set(this.props.guessedCards)
    return cards.filter((card) => !guessedCardsSet.has(card))
  }

  showCards = () => {
    this.setState({ showAllCards: true })
  }

  newGame = () => {
    const { len, coloursToGenerate } = this.state
    const availableMana = generateMana({ len, coloursToGenerate })
    const cards = data.filter((card: Card) => canBeCast(card, availableMana))
    this.setState({
      availableMana,
      cards,
      showAllCards: false,
    })
  }

  openCard = (cardName: string) => {
    const { setCardModalState, setSelectedCard } = this.props
    // find the selectedCard, set it
    const card = this.state.cards.find((card) => card.name === cardName)
    if (card) {
      setSelectedCard(card)
    }
    // open the modal
    setCardModalState(true)
  }

  setDifficulty = (event: SyntheticEvent) => {
    event.preventDefault()
    const mode = this.state.input.current.value
    let len, coloursToGenerate
    switch (mode) {
      case 'basic':
        len = 3
        coloursToGenerate = 1
        break
      case 'common':
        len = 4
        coloursToGenerate = 2
        break
      case 'uncommon':
        len = 5
        coloursToGenerate = 3
        break
      case 'rare':
        len = 6
        coloursToGenerate = 4
        break
      case 'mythic':
        len = 7
        coloursToGenerate = 5
        break
      default:
        len = 3
        coloursToGenerate = 1
        break
    }
    this.setState({ mode, len, coloursToGenerate }, () => {
      this.newGame()
    })
  }

  componentDidMount() {
    this.newGame()
  }

  render() {
    const { availableMana, cards, input, showAllCards } = this.state
    const { guessedCards, feedback } = this.props
    const formattedMana = iconify(availableMana)
    const isGameOver = showAllCards || guessedCards.length === cards.length

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
          <Guesser disabled={isGameOver} cards={cards} />
          <section className="Feedback">
            <p className="text-red-500">{feedback}</p>
          </section>
          <p>
            You have guessed <strong>{guessedCards.length}</strong> out of the{' '}
            <strong>{cards.length}</strong> cards that can be cast at instant
            speed.
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
  const { guessedCards, feedback } = state.game
  return { selectedCard, cardModalOpen, guessedCards, feedback }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSelectedCard: (card: Card) => {
      dispatch(setSelectedCard(card))
    },
    setCardModalState: (value: boolean) => {
      dispatch(setCardModalState(value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game)
