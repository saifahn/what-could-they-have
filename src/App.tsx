import React, { Component, FormEvent, RefObject } from 'react'
import canBeCast from './functions/canBeCast'
import generateMana from './functions/generateMana'
import RNA from './RNA-flash-cards.json'
import { Card } from './common/types'
import './App.css'

interface State {
  cards: Card[]
  availableMana: string
  len: number
  coloursToGenerate: number
  mode: 'common' | 'uncommon' | 'rare' | 'mythic'
  input: RefObject<any>
}

class App extends Component<{}> {
  state: State = {
    cards: [],
    availableMana: '',
    len: 4,
    coloursToGenerate: 1,
    mode: 'common',
    input: React.createRef()
  }

  constructor(props: any) {
    super(props)
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
    this.setState({ mode })
  }

  componentDidMount() {
    this.loadCards()
  }

  render() {
    const { availableMana, cards, mode, input } = this.state
    return (
      <div className="App container-lg mx-auto">
        <section className="Info">
          <h1>You are playing on {mode} mode</h1>
          <p>Your opponent has {availableMana} available.</p>
          <p>
            There are {cards.length} cards they could cast at instant speed.
          </p>
          <p>The cards names are:</p>
          <ul>
            {cards.map((card) => {
              return <li key={card.name}>{card.name}</li>
            })}
          </ul>
        </section>
        <section className="Settings">
          <button className="Settings__button" onClick={this.loadCards}>
            New Mana
          </button>
          <form onSubmit={this.setDifficulty}>
            <select ref={input}>
              <option value="common">common</option>
              <option value="uncommon">uncommon</option>
              <option value="rare">rare</option>
              <option value="mythic">mythic</option>
            </select>
            <button className="Settings__button" type="submit">
              Select Difficulty
            </button>
          </form>
        </section>
      </div>
    )
  }
}

export default App
