import React from 'react'
import Game from './components/game/Game'
import Filter from './components/Filter'
import Intro from './components/Intro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { CardModal } from './components/shared/CardModal'
import { connect } from 'react-redux'
// import { RootState } from './reducers'
import { selectNewSet } from './actions/selectNewSet'
import { ThunkDispatch } from './store'

interface Props extends ReturnType<typeof mapDispatchToProps> {}

interface State {}

class App extends React.Component<Props, State> {
  componentDidMount() {
    // set first set
    this.props.setUpApp('mid')
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

// const mapStateToProps = (state: RootState) => {}

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  setUpApp: (setName: string) => dispatch(selectNewSet(setName)),
})

export default connect(null, mapDispatchToProps)(App)
