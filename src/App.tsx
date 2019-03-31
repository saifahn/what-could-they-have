import React from 'react'
import Game from './components/Game'
import Main from './components/Main'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="container-lg mx-auto">
        <Header />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/game" component={Game} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
