import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1>What Could They Have? — Ravnica Allegiance</h1>
      <Link to="/" className="mr-4">
        Home
      </Link>
      <Link to="/game">Game</Link>
    </header>
  )
}

export default Header
