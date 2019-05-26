import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setFeedback, addGuessedCard, resetGuessedCards } from '../../actions'
import { Card } from '../../common/types'

export class GuesserComponent extends React.Component<any> {
  state = {
    guess: '',
  }

  handleGuess = (event: FormEvent) => {
    event.preventDefault()
    let { guess } = this.state
    let {
      cards,
      feedback,
      guessedCards,
      addGuessedCard,
      setFeedback,
    } = this.props
    const hasBeenGuessed = guessedCards.find(
      (card: Card) => card.name.toLowerCase() === guess.toLowerCase(),
    )
    if (hasBeenGuessed) {
      guess = ''
      feedback = 'You have already guessed that one!'
      setFeedback(feedback)
      return this.setState({ guess })
    }

    const foundCard = cards.find((card: Card) => {
      let isCorrectGuess
      if (card.card_faces) {
        isCorrectGuess = card.card_faces.some(
          (face) => face.name.toLowerCase() === guess.toLowerCase(),
        )
      }
      return isCorrectGuess || card.name.toLowerCase() === guess.toLowerCase()
    })

    if (foundCard) {
      addGuessedCard(foundCard)
      feedback =
        this.props.guessedCards.length === cards.length
          ? 'Well done, you got them all!'
          : 'Nice one!'
      guess = ''

      this.setState({ guess })
      setFeedback(feedback)
    } else {
      feedback = "That card doesn't exist, or isn't castable"
      setFeedback(feedback)
    }
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    const guess = event.currentTarget.value
    this.setState({ guess })
  }

  render() {
    const { disabled } = this.props
    const { guess } = this.state

    return (
      <form onSubmit={this.handleGuess} className="flex flex-wrap mt-6">
        <input
          disabled={disabled}
          type="text"
          onChange={this.handleChange}
          value={guess}
          className="appearance-none inline-block bg-grey-lighter border border-grey-lighter text-black text-lg sm:text-xl py-2 px-4 focus:outline-none focus:bg-white focus:border-red-darker flex-shrink"
          placeholder="Type your guess here!"
        />
        <button className="hover:bg-transparent bg-pink-700 hover:bg-pink-800 text-white py-2 px-2 border border-pink-700 hover:border-pink-800">
          ⏎
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state: any) => {
  const { guessedCards, feedback, addGuessedCards } = state.game
  return { guessedCards, feedback, addGuessedCards }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFeedback: (value: string) => dispatch(setFeedback(value)),
  addGuessedCard: (card: Card) => {
    dispatch(addGuessedCard(card))
  },
  resetGuessedCards: () => {
    dispatch(resetGuessedCards())
  },
})

export const Guesser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GuesserComponent)
