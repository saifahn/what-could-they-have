import React, { Component, FormEvent } from 'react'
import { data } from '../RNA-flash-cards.json'
import { Card } from '../common/types'
import canBeCast from '../functions/canBeCast'

interface State {
  cards: Card[]
  cardsToShow: Card[]
  manaFilter: string
}

class Main extends Component {
  // state = {
  //   cards: [],
  //   filters: {
  //     mana: '',
  //     sortBy: [],
  //   },
  //   cardsToShow: [],
  //   isGrid: false,
  //   sets: [],
  // }
  state: State = {
    cards: [],
    cardsToShow: [],
    manaFilter: ''
  }

  componentDidMount() {
    this.setState({ cards: data })
  }

  filterCards = (filter: string): Card[] => {
    const { cards } = this.state
    return cards.filter((card: Card) => canBeCast(card, filter))
  }

  handleManaChange = (event: FormEvent<HTMLInputElement>) => {
    const manaFilter = event.currentTarget.value
    const cardsToShow = this.filterCards(manaFilter)
    this.setState({ manaFilter, cardsToShow })
  }

  render() {
    const { cardsToShow, manaFilter } = this.state
    return (
      <main>
        <input
          type="text"
          value={manaFilter}
          onChange={this.handleManaChange}
        />
        <section>
          <ul>
            {cardsToShow &&
              cardsToShow.map((card) => <li key={card.name}>{card.name}</li>)}
          </ul>
        </section>
      </main>
    )
  }
}

export default Main
