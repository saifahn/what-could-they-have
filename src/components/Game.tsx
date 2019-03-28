import React, { Component, FormEvent, RefObject } from 'react'
import canBeCast from '../functions/canBeCast'
import generateMana from '../functions/generateMana'
import RNA from '../RNA-flash-cards.json'
import { Card } from '../common/types'
import TextInputForm from './TextInputForm'

interface State {
  cards: Card[]
  guessedCards: Card[]
  availableMana: string
  len: number
  coloursToGenerate: number
  mode: 'basic' | 'common' | 'uncommon' | 'rare' | 'mythic'
  input: RefObject<any>
  guess: string
  feedback: string
}

class Game extends Component {
  state: State = {
    cards: [],
    guessedCards: [],
    availableMana: '',
    len: 3,
    coloursToGenerate: 1,
    mode: 'basic',
    input: React.createRef(),
    guess: '',
    feedback: ''
  }

  constructor(props: any) {
    super(props)
  }

  handleGuess = (event: FormEvent) => {
    event.preventDefault()
    let { cards, feedback, guess, guessedCards } = this.state
    const hasBeenGuessed = guessedCards.find(
      (card) => card.name.toLowerCase() === guess.toLowerCase()
    )
    if (hasBeenGuessed) {
      guess = ''
      feedback = 'You have already guessed that one!'
      return this.setState({ feedback, guessedCards, guess })
    }
    const foundCard = cards.find(
      (card) => card.name.toLowerCase() === guess.toLowerCase()
    )
    if (foundCard) {
      guessedCards.push(foundCard)
      feedback =
        guessedCards.length === cards.length
          ? 'Well done, you got them all!'
          : 'Nice one!'
      guess = ''
      this.setState({ feedback, guessedCards, guess })
    } else {
      feedback = "That card doesn't exist :("
      this.setState({ feedback })
    }
  }

  handleGuessChange = (event: FormEvent<HTMLInputElement>) => {
    const guess = event.currentTarget.value
    this.setState({ guess })
  }

  loadCards = () => {
    const { len, coloursToGenerate } = this.state
    const availableMana = generateMana({ len, coloursToGenerate })
    const cards = RNA.data.filter((card: Card) =>
      canBeCast(card, availableMana)
    )
    this.setState({
      availableMana,
      cards
    })
  }

  setDifficulty = (event: FormEvent) => {
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
    }
    this.setState({ mode, len, coloursToGenerate }, () => {
      this.loadCards()
    })
  }

  componentDidMount() {
    this.loadCards()
  }

  render() {
    const {
      availableMana,
      cards,
      mode,
      input,
      feedback,
      guess,
      guessedCards
    } = this.state
    return (
      <div className="App">
        <section className="Info">
          <p>You are playing on {mode} mode</p>
          <h3>Your opponent has {availableMana} available.</h3>
          <p>
            You have guessed <strong>{guessedCards.length}</strong> out of the{' '}
            <strong>{cards.length}</strong> cards that can be cast at instant
            speed.
          </p>
        </section>
        <section className="Actions">
          <button className="Actions__button" onClick={this.loadCards}>
            New Mana
          </button>
          <form onSubmit={this.setDifficulty}>
            <select ref={input}>
              <option value="basic">basic</option>
              <option value="common">common</option>
              <option value="uncommon">uncommon</option>
              <option value="rare">rare</option>
              <option value="mythic">mythic</option>
            </select>
            <button className="Actions__button" type="submit">
              Select Difficulty
            </button>
          </form>
          <TextInputForm
            disabled={guessedCards.length === cards.length}
            onSubmit={this.handleGuess}
            onChange={this.handleGuessChange}
            value={guess}
          />
          {/* <form onSubmit={this.handleGuess}>
            <input
              type="text"
              onChange={this.handleGuessChange}
              value={guess}
            />
            <button>Guess</button>
          </form> */}
        </section>
        <section className="Feedback">
          <p>{feedback}</p>
        </section>
        <section className="GuessedCards">
          <h3 className="mt-8">Cards you have guessed:</h3>
          <ul>
            {guessedCards.map((card) => (
              <li key={card.name}>{card.name}</li>
            ))}
          </ul>
        </section>
      </div>
    )
  }
}

export default Game
