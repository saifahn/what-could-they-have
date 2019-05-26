import React from 'react'
import Game from './components/game/Game'
import Filter from './components/Filter'
import Intro from './components/Intro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { CardModal } from './components/shared/CardModal'

function App() {
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

export default App
