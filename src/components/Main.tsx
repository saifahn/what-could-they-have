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
          <ul className="CardList mx-auto">
            {cardsToShow &&
              cardsToShow.map((card, index) => (
                <li
                  className={'Card' + (index != 0 ? ' mt-10' : '')}
                  key={card.name}
                >
                  <div className="flex justify-between">
                    <h3>{card.name}</h3>
                    <h4>{card.mana_cost}</h4>
                  </div>
                  <p>{card.type_line}</p>
                  <p>{card.oracle_text}</p>
                </li>
              ))}
          </ul>
        </section>
      </main>
    )
  }
}

export default Main
