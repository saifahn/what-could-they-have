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

  formatManaCost = (mana: string) => {
    const re = /(\w(\/\w)?)/g
    // return match
    return mana.replace(re, '{$1}')
  }

  handleManaChange = (event: FormEvent<HTMLInputElement>) => {
    // first only handle any character gets converted into a
    const manaFilter = event.currentTarget.value
    // format this
    const formattedMana = this.formatManaCost(manaFilter)
    const cardsToShow = this.filterCards(formattedMana)
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
