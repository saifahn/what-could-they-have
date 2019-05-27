import React from 'react'
import Game from './components/game/Game'
import Filter from './components/Filter'
import Intro from './components/Intro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { CardModal } from './components/shared/CardModal'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card } from './common/types'
import { setSharedCards } from './actions'
import data from './sets/WAR-card-base.json'

interface ConnectProps {
  setSharedCards: (cards: Card[]) => void
}

interface Props extends ConnectProps {}

interface State {}

class App extends React.Component<Props, State> {
  componentDidMount() {
    this.props.setSharedCards(data)
  }

  render() {
    return (
      <Router>
        <div className="inner-container pt-4 pb-16">
          <Header />
          <CardModal />

          <Switch>
            <Route exact path="/" component={Intro} />
            <Route path="/filter" component={Filter} />
            <Route path="/game" component={Game} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state: any) => {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSharedCards: (cards: Card[]) => dispatch(setSharedCards(cards)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
