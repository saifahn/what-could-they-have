import React, { Component, FormEvent, RefObject, SyntheticEvent } from 'react'
import canBeCast from '../functions/canBeCast'
import generateMana from '../functions/generateMana'
import RNA from '../RNA-flash-cards.json'
import { Card } from '../common/types'

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
  showAllCards: boolean
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
    feedback: '',
    showAllCards: false,
  }

  constructor(props: any) {
    super(props)
  }

  getUnguessedCards = () => {
    const { cards, guessedCards } = this.state
    const guessedCardsSet = new Set(guessedCards)
    return cards.filter((card) => !guessedCardsSet.has(card))
  }

  handleGuess = (event: FormEvent) => {
    event.preventDefault()
    let { cards, feedback, guess, guessedCards } = this.state
    const hasBeenGuessed = guessedCards.find(
      (card) => card.name.toLowerCase() === guess.toLowerCase(),
    )
    if (hasBeenGuessed) {
      guess = ''
      feedback = 'You have already guessed that one!'
      return this.setState({ feedback, guessedCards, guess })
    }
    const foundCard = cards.find(
      (card) => card.name.toLowerCase() === guess.toLowerCase(),
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
      feedback = "That card isn't castable"
      this.setState({ feedback })
    }
  }

  handleGuessChange = (event: FormEvent<HTMLInputElement>) => {
    const guess = event.currentTarget.value
    this.setState({ guess })
  }

  showCards = () => {
    this.setState({ showAllCards: true })
  }

  newGame = () => {
    const { len, coloursToGenerate } = this.state
    const availableMana = generateMana({ len, coloursToGenerate })
    const cards = RNA.data.filter((card: Card) =>
      canBeCast(card, availableMana),
    )
    this.setState({
      availableMana,
      cards,
      feedback: '',
      guessedCards: [],
      showAllCards: false,
    })
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
    }
    this.setState({ mode, len, coloursToGenerate }, () => {
      this.newGame()
    })
  }

  componentDidMount() {
    this.newGame()
  }

  render() {
    const {
      availableMana,
      cards,
      mode,
      input,
      feedback,
      guess,
      guessedCards,
      showAllCards,
    } = this.state
    return (
      <main>
        <section>
          <form className="mt-2">
            You are playing on{' '}
            <select
              ref={input}
              className="appearance-none font-semibold bg-white border-b-2 border-dashed rounded-none border-blue-darker text-md sm:text-xl text-center py-1 focus:outline-none focus:bg-blue-lighter focus:border-blue mx-2 select-center"
              onChange={this.setDifficulty}
            >
              <option value="basic">basic</option>
              <option value="common">common</option>
              <option value="uncommon">uncommon</option>
              <option value="rare">rare</option>
              <option value="mythic">mythic</option>
            </select>{' '}
            mode
          </form>
          <h3 className="mt-4">Your opponent has {availableMana} available.</h3>
          <form onSubmit={this.handleGuess} className="flex flex-wrap mt-6">
            <input
              disabled={showAllCards || guessedCards.length === cards.length}
              type="text"
              onChange={this.handleGuessChange}
              value={guess}
              className="appearance-none inline-block bg-grey-lighter border border-grey-lighter text-black text-xl py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-grey mr-4"
              placeholder="Type your guess here!"
            />
            <button className="bg-transparent hover:bg-red-darker text-red-darker hover:text-white py-2 px-4 border border-red-darker hover:border-transparent rounded">
              Guess
            </button>
          </form>
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
              className="bg-blue hover:bg-blue-dark text-white py-2 px-4 mr-4 rounded"
            >
              New Game
            </button>
            <button
              onClick={this.showCards}
              className="bg-transparent hover:bg-blue text-blue hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded"
            >
              Give Up
            </button>
          </div>
        </section>
        <section className="Feedback">
          <p>{feedback}</p>
        </section>
        <section className="GuessedCards">
          <h3 className="mt-8">Cards you have guessed:</h3>
          <ul className="mt-4">
            {guessedCards.map((card) => (
              <li key={card.name}>{card.name}</li>
            ))}
          </ul>
        </section>
        {showAllCards && (
          <section className="AllCards mt-6">
            <h3>All Castable Cards</h3>
            <ul className="mt-4">
              {this.getUnguessedCards().map((card) => (
                <li key={card.name}>{card.name}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    )
  }
}

export default Game
