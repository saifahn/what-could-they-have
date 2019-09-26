import React from 'react'
import { RootState } from '../reducers'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setSelectedCard, setCardModalState } from '../actions'
import { Card } from '../common/types'

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

class Intro extends React.Component<Props> {
  state = {
    introText: '',
  }

  openCard = (cardName: string) => {
    const { setCardModalState, setSelectedCard, allCards } = this.props
    const card = allCards.find((card) => card.name === cardName)
    if (card) {
      setSelectedCard(card)
    }
    setCardModalState(true)
  }

  // @TODO find a better alternative to this
  // it doesn't seem like the best way to do this in React
  // just used this solution as I'm trying to release before the prerelease
  // we aren't using the CardLink component, which may be a mistake?
  replaceCardsWithLinks() {
    const cardNames = document.querySelectorAll('code')
    cardNames.forEach((card) => {
      const button = document.createElement('button')
      button.innerText = card.innerText
      button.className =
        'text-lg border-pink-400 underline hover:text-pink-400 px-1'
      button.addEventListener('click', () => this.openCard(card.innerText))
      card.replaceWith(button)
    })
  }

  componentDidMount() {
    this.replaceCardsWithLinks()
  }

  componentDidUpdate() {
    this.replaceCardsWithLinks()
  }

  render() {
    const markdown = { __html: this.props.introText }
    const intro = (
      <>
        <p>
          In Limited Magic, your opponent will oftentimes do something that
          doesn&#39;t make sense according to what&#39;s on the board. When your
          opponent attacks their 2/2 into your 3/3 they&#39;re up to something.
          Assuming that your opponent is not bluffing, there are limited
          possibilities to what could be going on.
        </p>
        <p>
          This website is intended to help you learn the instants in the set,
          practice that knowledge or potentially as a tool to figure out what
          your opponent has during a game.
        </p>
      </>
    )
    return (
      <main className="Intro mt-4">
        {intro}
        <div className="SetSpecificPart" dangerouslySetInnerHTML={markdown} />
      </main>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { introText, allCards } = state.shared
  return { introText, allCards }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSelectedCard: (card: Card): void => {
    dispatch(setSelectedCard(card))
  },
  setCardModalState: (value: boolean): void => {
    dispatch(setCardModalState(value))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro)
