import React, { FormEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setFeedback, addGuessedCard, resetGuessedCards } from '../../actions'
import { Card } from '../../common/types'

export class GuesserComponent extends React.Component<any> {
  public state = {
    guess: '',
  }

  private handleGuess = (event: FormEvent): void => {
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

    const foundCard = cards.find(
      (card: Card): boolean => {
        let isCorrectGuess
        if (card.card_faces) {
          isCorrectGuess = card.card_faces.some(
            (face): boolean => face.name.toLowerCase() === guess.toLowerCase(),
          )
        }
        return isCorrectGuess || card.name.toLowerCase() === guess.toLowerCase()
      },
    )

    if (foundCard) {
      feedback =
        // dispatching the action is asynchronous, so do it this way
        guessedCards.length === cards.length - 1
          ? 'Well done, you got them all!'
          : 'Nice one!'
      addGuessedCard(foundCard)
      guess = ''
      this.setState({ guess })
      setFeedback(feedback)
    } else {
      feedback = "That card doesn't exist, or isn't castable"
      setFeedback(feedback)
    }
  }

  private handleChange = (event: FormEvent<HTMLInputElement>): void => {
    const guess = event.currentTarget.value
    this.setState({ guess })
  }

  public render(): JSX.Element {
    const { disabled } = this.props
    const { guess } = this.state

    return (
      <form onSubmit={this.handleGuess} className="flex flex-wrap mt-6">
        <input
          disabled={disabled}
          type="text"
          onChange={this.handleChange}
          value={guess}
          className="appearance-none inline-block bg-gray-200 border border-gray-200 text-black text-lg sm:text-xl py-2 px-4 focus:outline-none focus:bg-white focus:border-blue-500 flex-shrink"
          placeholder="Type your guess here!"
        />
        <button className="hover:bg-transparent bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 border border-blue-500 hover:border-blue-600">
          ⏎
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state: any): {} => {
  const { guessedCards, feedback, addGuessedCards } = state.game
  return { guessedCards, feedback, addGuessedCards }
}

const mapDispatchToProps = (dispatch: Dispatch): {} => ({
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
