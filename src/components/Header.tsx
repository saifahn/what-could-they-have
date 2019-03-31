import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1>What Could They Have? — Ravnica Allegiance</h1>
      <Link to="/">Home</Link>
      <Link to="/filter" className="ml-4">
        Filter
      </Link>
      <Link to="/game" className="ml-4">
        Game
      </Link>
    </header>
  )
}

export default Header
