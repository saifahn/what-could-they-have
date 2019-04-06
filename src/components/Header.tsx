import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/filter" className="ml-4">
        Filter
      </Link>
      <Link to="/game" className="ml-4">
        Game
      </Link>
      <h1 className="text-2xl sm:text-3xl mt-2">
        What Could They Have? — Ravnica Allegiance
      </h1>
    </header>
  )
}

export default Header
