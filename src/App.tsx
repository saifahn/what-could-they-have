import React from 'react'
import Game from './components/Game'
import Filter from './components/Filter'
import Intro from './components/Intro'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="container py-2">
        <Header />

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
