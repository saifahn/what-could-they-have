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
  mode: 'basic' | 'common' | 'uncommon' | 'rare' | 'mythic'
  input: RefObject<any>
}

class App extends Component<{}> {
  state: State = {
    cards: [],
    availableMana: '',
    len: 3,
    coloursToGenerate: 1,
    mode: 'basic',
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
    let len, coloursToGenerate
    switch (mode) {
      case 'basic':
        len = 2
        coloursToGenerate = 1
        break
      case 'common':
        len = 3
        coloursToGenerate = 2
        break
      case 'uncommon':
        len = 4
        coloursToGenerate = 3
        break
      case 'rare':
        len = 5
        coloursToGenerate = 4
        break
      case 'mythic':
        len = 6
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
              <option value="basic">basic</option>
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
