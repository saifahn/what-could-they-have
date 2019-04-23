import React, { Component, FormEvent } from 'react'
// import { data } from '../RNA-flash-cards.json'
import data from '../sets/GRN-card-base.json'
import CardList from './CardList'
import { Card } from '../common/types'
import canBeCast from '../functions/canBeCast'

interface State {
  cards: Card[]
  cardsToShow: Card[]
  manaFilter: string
}

class Filter extends Component {
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
    manaFilter: '',
  }

  componentDidMount() {
    const cards = data
    const cardsToShow = data
    this.setState({ cards, cardsToShow })
  }

  filterCards = (filter: string): Card[] => {
    const { cards } = this.state
    if (!filter) {
      return cards
    }
    return cards.filter((card: Card) => canBeCast(card, filter))
  }

  formatManaCost = (mana: string) => {
    const re = /(\w(\/\w)?)/g
    return mana.replace(re, '{$1}')
  }

  handleManaChange = (event: FormEvent<HTMLInputElement>) => {
    const manaFilter = event.currentTarget.value
    const formattedMana = this.formatManaCost(manaFilter)
    const cardsToShow = this.filterCards(formattedMana)
    this.setState({ manaFilter, cardsToShow })
  }

  render() {
    const { cardsToShow, manaFilter } = this.state
    return (
      <main>
        <section>
          <h3 className="mt-4">Filter cards by mana cost</h3>
          <input
            className="appearance-none border bg-grey-lighter border-grey-lighter text-black text-lg text-center w-full max-w-sm sm:text-xl shadow py-2 px-4 mt-6 focus:outline-none focus:bg-white focus:border-red-darker"
            type="text"
            value={manaFilter}
            onChange={this.handleManaChange}
            placeholder="type a mana cost e.g. WWBBB"
          />
        </section>
        <section>
          <CardList cardsToShow={cardsToShow} />
        </section>
      </main>
    )
  }
}

export default Filter
