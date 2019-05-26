import React, { FormEvent } from 'react'

export class Guesser extends React.Component<any> {
  state = {
    guess: '',
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    const guess = event.currentTarget.value
    this.setState({ guess })
  }

  render() {
    const { disabled, onGuess } = this.props
    const { guess } = this.state

    return (
      <form onSubmit={onGuess} className="flex flex-wrap mt-6">
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
