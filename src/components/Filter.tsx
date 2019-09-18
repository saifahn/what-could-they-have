import React, { Component, FormEvent } from 'react'

import CardList from './CardList'
import { Card } from '../common/types'
import canBeCast from '../functions/canBeCast'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface ConnectProps {
  cards: Card[]
}

interface Props extends ConnectProps {}

interface State {
  cardsToShow: Card[]
  manaFilter: string
}

class Filter extends Component<Props, State> {
  state = {
    cardsToShow: [],
    manaFilter: '',
  }

  componentDidMount() {
    const cardsToShow = this.props.cards
    this.setState(() => ({ cardsToShow }))
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.cards !== this.props.cards) {
      // if the cards supplied to the component are changed, show the new cards
      // reset the mana filter to show all cards initially
      this.setState({ cardsToShow: this.props.cards, manaFilter: '' })
    }
  }

  private filterCards = (filter: string) => {
    const { cards } = this.props
    if (!filter) {
      return cards
    }
    return cards.filter((card: Card) => canBeCast(card, filter))
  }

  private formatManaCost = (mana: string) => {
    const re = /(\w(\/\w)?)/g
    return mana.replace(re, '{$1}')
  }

  private handleManaChange = (event: FormEvent<HTMLInputElement>) => {
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
          <h3 className="font-semibold text-lg mt-4">
            Filter cards by mana cost
          </h3>
          <input
            className="appearance-none bg-gray-100 border-gray-100 text-black text-lg text-center w-full max-w-md sm:text-xl shadow py-2 px-4 mt-6 border-dashed border focus:outline-none focus:bg-white focus:border-blue-600"
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

const mapStateToProps = (state: any) => {
  const { cards } = state.shared
  return { cards }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter)
